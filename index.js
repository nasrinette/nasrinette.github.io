document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".frame-carousel");

  carousels.forEach((carousel) => {
    const strip = carousel.querySelector(".carousel-strip");
    const frames = carousel.querySelectorAll(".frame-item");
    const prevBtn = carousel.querySelector(".carousel-nav-prev");
    const nextBtn = carousel.querySelector(".carousel-nav-next");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");

    let currentPosition = 0;
    const totalFrames = frames.length; // 9 frames
    const framesToShow = 3; // Number of visible frames

    // Create indicators (one for each frame)
    for (let i = 0; i < totalFrames; i++) {
      const indicator = document.createElement("button");
      indicator.classList.add("carousel-indicator");
      if (i === 0) indicator.classList.add("active");
      indicator.setAttribute("aria-label", `Go to frame ${i + 1}`);
      indicator.addEventListener("click", () => scrollToFrame(i));
      indicatorsContainer.appendChild(indicator);
    }

    const indicators = indicatorsContainer.querySelectorAll(
      ".carousel-indicator"
    );

    function getFrameWidth() {
      return frames[0].offsetWidth;
    }

    function getGap() {
      const style = window.getComputedStyle(strip);
      return parseFloat(style.gap) || 20;
    }

    function updateCarousel() {
      const frameWidth = getFrameWidth();
      const gap = getGap();
      const offset = currentPosition * (frameWidth + gap);
      strip.style.transform = `translateX(-${offset}px)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentPosition);
      });
    }

    function scrollToFrame(index) {
      currentPosition = Math.max(
        0,
        Math.min(index, totalFrames - framesToShow)
      );
      updateCarousel();
    }

    function scrollNext() {
      if (currentPosition < totalFrames - framesToShow) {
        currentPosition++;
      } else {
        currentPosition = 0; // Loop back
      }
      updateCarousel();
    }

    function scrollPrev() {
      if (currentPosition > 0) {
        currentPosition--;
      } else {
        currentPosition = totalFrames - framesToShow; // Loop to end
      }
      updateCarousel();
    }

    prevBtn.addEventListener("click", scrollPrev);
    nextBtn.addEventListener("click", scrollNext);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCarousel, 100);
    });

    // Initialize
    updateCarousel();
  });
});

// Image Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".image-slider");

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slider-slide");
    const prevBtn = slider.querySelector(".slider-btn-prev");
    const nextBtn = slider.querySelector(".slider-btn-next");
    const dotsContainer = slider.querySelector(".slider-dots");

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides; // Loop back to 0
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop to last slide
      updateSlider();
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Initialize
    updateSlider();
  });
});
