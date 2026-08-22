import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CatAvatar from "./CatAvatar";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/* — ConfirmDialog — the app's own voice for "are you sure?", replacing the
   browser's native confirm(), which speaks as "localhost says" in system
   chrome no theme can reach. Escape and the backdrop both cancel; focus
   starts on Cancel so Enter can't destroy anything by default. ———————————— */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  // portaled to <body>: an ancestor holding a transform (the Reveal entrance
  // animation fills forward) would otherwise become the containing block for
  // position: fixed and trap the overlay inside its own box
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 bg-[var(--scrim)] backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="animate-pop-in relative w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--border)]/60 bg-[var(--surface)] p-5 shadow-[var(--shadow-lift)]"
      >
        <div className="flex items-start gap-3">
          <CatAvatar size={48} variant="sitting" />
          <div className="min-w-0 flex-1">
            <h2 id="confirm-dialog-title" className="font-[var(--font-display)] text-lg font-bold text-[var(--text)]">
              {title}
            </h2>
            <p id="confirm-dialog-message" className="mt-1 text-base leading-relaxed text-[var(--text-secondary)]">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="focus-ring rounded-full border border-[var(--border)]/70 px-4 py-1.5 font-[var(--font-display)] text-base font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--hover-fill)] hover:text-[var(--text-emphasis)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-pastel focus-ring px-4 py-1.5 font-[var(--font-display)] text-base font-semibold"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
