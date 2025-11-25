import { useState } from 'react';

export function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto my-8">
      <div className="slider-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, i) => (
            <div key={i} className="slider-slide">
              <img src={image.src} alt={image.alt} className="slider-image" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-[70px] z-10 bg-burgundy text-cream border-none rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:bg-brown hover:scale-110"
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-cream">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-[70px] z-10 bg-burgundy text-cream border-none rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:bg-brown hover:scale-110"
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-cream">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>

      <div className="flex justify-center items-center gap-2 mt-6 p-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 p-0 hover:bg-burgundy/50 hover:scale-125 ${
              i === currentIndex
                ? 'bg-burgundy w-8 rounded'
                : 'bg-burgundy/20'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
}
