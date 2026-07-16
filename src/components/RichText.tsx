import { Fragment } from "react";

const ITALIC = /(\*[^*]+\*)/g;
/** **bold** (which may wrap *italic*), or *italic* on its own. */
const EMPHASIS = /(\*\*.+?\*\*|\*[^*]+\*)/g;

const isWrapped = (s: string, mark: string) =>
  s.startsWith(mark) && s.endsWith(mark) && s.length > mark.length * 2;

function renderItalics(text: string, keyPrefix: string) {
  return text
    .split(ITALIC)
    .filter(Boolean)
    .map((part, i) =>
      isWrapped(part, "*") ? (
        <em key={`${keyPrefix}-i${i}`}>{part.slice(1, -1)}</em>
      ) : (
        <Fragment key={`${keyPrefix}-i${i}`}>{part}</Fragment>
      )
    );
}

function renderInline(line: string, keyPrefix: string) {
  const parts = line.split(EMPHASIS).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    // bold recurses, so a stressed word inside a bold lead still reads as one
    if (isWrapped(part, "**")) {
      return (
        <strong key={key} className="font-semibold text-[var(--color-rose-dark)]">
          {renderItalics(part.slice(2, -2), key)}
        </strong>
      );
    }
    if (isWrapped(part, "*")) return <em key={key}>{part.slice(1, -1)}</em>;
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export default function RichText({ text }: { text: string }) {
  const blocks = text.split("\n\n").filter((b) => b.trim().length > 0);

  return (
    <div className="space-y-2.5">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        const isList = lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));

        if (isList) {
          return (
            <ul key={bi} className="list-disc space-y-1 pl-5 marker:text-[var(--color-rose)]">
              {lines.map((l, li) => (
                <li key={li} className="leading-snug">
                  {renderInline(l.trim().slice(2), `${bi}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={bi} className="leading-relaxed break-words">
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(l, `${bi}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
