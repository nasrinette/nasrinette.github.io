import { Fragment, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { useMediaQuery } from "../hooks/useMediaQuery";

const ITALIC = /(\*[^*]+\*)/g;
/** **bold** (which may wrap *italic*), or *italic* on its own. */
const EMPHASIS = /(\*\*.+?\*\*|\*[^*]+\*)/g;
/** Split on whitespace but keep the separators, so spacing survives. */
const WORDS = /(\s+)/;
const SPACE = /^\s+$/;

/** ms between words as prose streams in — a brisk token cadence. Kept short so
    long paragraphs finish quickly and never feel like the page is lagging. */
const STEP = 11;

/** A per-render cursor that hands each word its place in the stream, so words
    fade in left-to-right like tokens off an AI. Null when not streaming. */
interface StreamCtx {
  n: number;
}

const isWrapped = (s: string, mark: string) =>
  s.startsWith(mark) && s.endsWith(mark) && s.length > mark.length * 2;

/** Plain text -> the string itself, or one delayed <span> per word when
    streaming, so the paragraph appears to type itself out. */
function emit(str: string, key: string, ctx: StreamCtx | null): ReactNode {
  if (!ctx) return str;
  return str.split(WORDS).map((chunk, i) => {
    if (!chunk) return null;
    if (SPACE.test(chunk)) return <Fragment key={`${key}-s${i}`}>{chunk}</Fragment>;
    const delay = ctx.n++ * STEP;
    return (
      <span key={`${key}-t${i}`} className="tok" style={{ animationDelay: `${delay}ms` }}>
        {chunk}
      </span>
    );
  });
}

function renderItalics(text: string, keyPrefix: string, ctx: StreamCtx | null) {
  return text
    .split(ITALIC)
    .filter(Boolean)
    .map((part, i) => {
      const key = `${keyPrefix}-i${i}`;
      return isWrapped(part, "*") ? (
        <em key={key}>{emit(part.slice(1, -1), key, ctx)}</em>
      ) : (
        <Fragment key={key}>{emit(part, key, ctx)}</Fragment>
      );
    });
}

function renderInline(line: string, keyPrefix: string, ctx: StreamCtx | null) {
  const parts = line.split(EMPHASIS).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    // bold recurses, so a stressed word inside a bold lead still reads as one
    if (isWrapped(part, "**")) {
      return (
        <strong key={key} className="font-semibold text-[var(--text-emphasis)]">
          {renderItalics(part.slice(2, -2), key, ctx)}
        </strong>
      );
    }
    if (isWrapped(part, "*")) return <em key={key}>{emit(part.slice(1, -1), key, ctx)}</em>;
    return <Fragment key={key}>{emit(part, key, ctx)}</Fragment>;
  });
}

/** Shared block renderer for RichText and StreamingText. `ctx` non-null streams. */
function renderBlocks(text: string, ctx: StreamCtx | null) {
  const blocks = text.split("\n\n").filter((b) => b.trim().length > 0);

  return blocks.map((block, bi) => {
    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    const isList = lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));

    if (isList) {
      return (
        <ul key={bi} className="list-disc space-y-1 pl-5 marker:text-[var(--primary)]">
          {lines.map((l, li) => (
            <li key={li} className="leading-snug">
              {renderInline(l.trim().slice(2), `${bi}-${li}`, ctx)}
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
            {renderInline(l, `${bi}-${li}`, ctx)}
          </Fragment>
        ))}
      </p>
    );
  });
}

export default function RichText({ text }: { text: string }) {
  return <div className="space-y-2.5">{renderBlocks(text, null)}</div>;
}

/**
 * The same copy as RichText, but its words fade in one after another once it
 * scrolls into view — Lola's answer streaming out token by token. Falls back to
 * plain RichText under prefers-reduced-motion.
 */
export function StreamingText({ text }: { text: string }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [ref, inView] = useInView<HTMLDivElement>();

  if (reduced) return <RichText text={text} />;

  // a fresh cursor each render; blocks render top-to-bottom so word order holds
  const body = renderBlocks(text, { n: 0 });
  return (
    <div ref={ref} className={`space-y-2.5 ${inView ? "streaming" : "pre-stream"}`}>
      {body}
    </div>
  );
}
