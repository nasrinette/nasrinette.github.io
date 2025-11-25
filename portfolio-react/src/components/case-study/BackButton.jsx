import { Link } from 'react-router-dom';

export function BackButton() {
  return (
    <Link
      to="/#projects"
      className="fixed top-[95px] md:top-[120px] left-4 md:left-16 w-10 h-10 md:w-12 md:h-12 bg-burgundy text-cream border-none rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-[999] shadow-lg hover:bg-brown hover:-translate-x-1"
      aria-label="Back to Portfolio"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-cream">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    </Link>
  );
}
