interface CatAvatarProps {
  size?: number;
  typing?: boolean;
  className?: string;
}

export default function CatAvatar({ size = 40, typing = false, className = "" }: CatAvatarProps) {
  return (
    <div
      className={`relative shrink-0 text-[var(--color-ink)] ${typing ? "animate-pulse-soft" : ""} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Lola the cat, portfolio assistant"
    >
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ears */}
        <path d="M9 15 L12 5 L18 13.5 Z" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.55" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10.5 13 L12.5 7.5 L15.7 12.3 Z" fill="var(--color-lily)" opacity="0.85" />
        <path d="M31 15 L28 5 L22 13.5 Z" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.55" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M29.5 13 L27.5 7.5 L24.3 12.3 Z" fill="var(--color-lily)" opacity="0.85" />

        {/* head */}
        <circle cx="20" cy="22.5" r="12.5" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.55" strokeWidth="1.2" />

        {/* eyes */}
        <g className="animate-blink" style={{ transformOrigin: "15px 21px" }}>
          <circle cx="15" cy="21" r="1.4" fill="var(--color-cat-line)" stroke="none" />
        </g>
        <g className="animate-blink" style={{ transformOrigin: "25px 21px" }}>
          <circle cx="25" cy="21" r="1.4" fill="var(--color-cat-line)" stroke="none" />
        </g>

        {/* nose */}
        <path d="M18.7 25.5 L21.3 25.5 L20 27.2 Z" fill="var(--color-lily-deep)" stroke="none" />

        {/* whiskers */}
        <path d="M12 25 L6.5 24" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M12 27 L6.5 28" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M28 25 L33.5 24" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M28 27 L33.5 28" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}
