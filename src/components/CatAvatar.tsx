interface CatAvatarProps {
  size?: number;
  typing?: boolean;
  className?: string;
}

export default function CatAvatar({ size = 40, typing = false, className = "" }: CatAvatarProps) {
  return (
    <div
      className={`relative shrink-0 ${typing ? "animate-float" : ""} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Latte the cat, portfolio assistant"
    >
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* ears */}
        <path d="M20 32 L30 6 L45 30 Z" fill="#fff" stroke="#f0d9d2" strokeWidth="2" />
        <path d="M80 32 L70 6 L55 30 Z" fill="#fff" stroke="#f0d9d2" strokeWidth="2" />
        <path d="M25 27 L31 14 L39 27 Z" fill="#f3c9c9" />
        <path d="M75 27 L69 14 L61 27 Z" fill="#f3c9c9" />

        {/* head */}
        <circle cx="50" cy="55" r="34" fill="#ffffff" stroke="#f0d9d2" strokeWidth="2" />

        {/* blush */}
        <ellipse cx="27" cy="62" rx="6" ry="4" fill="#f6c9c2" opacity="0.8" />
        <ellipse cx="73" cy="62" rx="6" ry="4" fill="#f6c9c2" opacity="0.8" />

        {/* eyes */}
        <g className="animate-blink" style={{ transformOrigin: "38px 52px" }}>
          <ellipse cx="38" cy="52" rx="3.2" ry="4.2" fill="#4a2c2a" />
        </g>
        <g className="animate-blink" style={{ transformOrigin: "62px 52px" }}>
          <ellipse cx="62" cy="52" rx="3.2" ry="4.2" fill="#4a2c2a" />
        </g>

        {/* nose + mouth */}
        <path d="M47 60 L53 60 L50 64 Z" fill="#c48a95" />
        <path
          d="M50 64 Q50 68 45 68 M50 64 Q50 68 55 68"
          stroke="#4a2c2a"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* whiskers */}
        <line x1="8" y1="55" x2="24" y2="53" stroke="#e6c9a0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="63" x2="24" y2="63" stroke="#e6c9a0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="92" y1="55" x2="76" y2="53" stroke="#e6c9a0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="92" y1="63" x2="76" y2="63" stroke="#e6c9a0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
