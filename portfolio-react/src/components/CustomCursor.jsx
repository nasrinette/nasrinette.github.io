import { useCursor } from '../hooks/useCursor';

export function CustomCursor() {
  const { position, scale, enabled } = useCursor();

  if (!enabled) return null;

  return (
    <div
      className="cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    />
  );
}
