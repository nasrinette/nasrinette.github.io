interface CatAvatarProps {
  size?: number;
  typing?: boolean;
  className?: string;
}

export default function CatAvatar({ size = 40, typing = false, className = "" }: CatAvatarProps) {
  return (
    <div
      className={`relative shrink-0 text-[var(--color-rose-dark)] ${typing ? "animate-pulse-soft" : ""} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Latte the cat, portfolio assistant"
    >
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
      >
        {/* ears */}
        <path d="M9 15 L12 5 L18 13.5" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M31 15 L28 5 L22 13.5" strokeWidth="1.6" strokeLinejoin="round" />

        {/* head */}
        <circle cx="20" cy="22.5" r="12.5" strokeWidth="1.6" />

        {/* eyes */}
        <g className="animate-blink" style={{ transformOrigin: "15px 21px" }}>
          <circle cx="15" cy="21" r="1.3" fill="currentColor" stroke="none" />
        </g>
        <g className="animate-blink" style={{ transformOrigin: "25px 21px" }}>
          <circle cx="25" cy="21" r="1.3" fill="currentColor" stroke="none" />
        </g>

        {/* nose */}
        <path d="M18.7 25.5 L21.3 25.5 L20 27.2 Z" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
