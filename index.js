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
      indicator.setAttribute("type", "button");
      if (i === 0) {
        indicator.classList.add("active");
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.setAttribute("aria-current", "false");
      }
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
        const isActive = index === currentPosition;
        indicator.classList.toggle("active", isActive);
        indicator.setAttribute("aria-current", isActive ? "true" : "false");
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

    if (prevBtn) {
      prevBtn.setAttribute("type", "button");
      prevBtn.addEventListener("click", scrollPrev);
    }
    if (nextBtn) {
      nextBtn.setAttribute("type", "button");
      nextBtn.addEventListener("click", scrollNext);
    }

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
      dot.setAttribute("type", "button");
      if (i === 0) {
        dot.classList.add("active");
        dot.setAttribute("aria-current", "true");
      } else {
        dot.setAttribute("aria-current", "false");
      }
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
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

    if (prevBtn) {
      prevBtn.setAttribute("type", "button");
      prevBtn.addEventListener("click", prevSlide);
    }
    if (nextBtn) {
      nextBtn.setAttribute("type", "button");
      nextBtn.addEventListener("click", nextSlide);
    }

    // Initialize
    updateSlider();
  });
});

// ===== APP STATE =====
const App = {
  config: {
    cursorEnabled: window.innerWidth > 768,
    revealThreshold: 150,
  },

  elements: {
    cursor: document.querySelector(".cursor"),
    menuToggle: document.querySelector(".nav__toggle"),
    navLinks: document.querySelector(".nav__links"),
    navLinkItems: document.querySelectorAll(".nav__link"),
    reveals: document.querySelectorAll(".reveal"),
    interactiveElements: document.querySelectorAll("a, button, .project"),
    progressBars: document.querySelectorAll(".language__progress-bar"),
  },

  // ===== CURSOR MODULE =====
  cursor: {
    init() {
      if (!App.config.cursorEnabled) {
        App.elements.cursor.style.display = "none";
        return;
      }
      document.addEventListener("mousemove", this.handleMove);
      App.elements.interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => this.scale(2));
        el.addEventListener("mouseleave", () => this.scale(1));
      });
    },

    handleMove(e) {
      App.elements.cursor.style.left = `${e.clientX}px`;
      App.elements.cursor.style.top = `${e.clientY}px`;
    },

    scale(size) {
      App.elements.cursor.style.transform = `scale(${size})`;
    },
  },

  // ===== NAVIGATION MODULE =====
  nav: {
    init() {
      App.elements.menuToggle.addEventListener("click", this.toggleMenu);
      App.elements.navLinkItems.forEach((link) => {
        link.addEventListener("click", this.closeMenu);
      });
      this.setupSmoothScroll();
      this.setupLogoClick();
      this.handleScroll(); // ← ADD THIS LINE
      window.addEventListener("scroll", () => this.handleScroll()); // ← ADD THIS LINE
    },
    handleScroll() {
      const nav = document.querySelector(".nav");
      const heroSection = document.getElementById("home");

      if (!nav) return;

      // If there is NO #home section, this is a subpage → always use scrolled state
      if (!heroSection) {
        nav.classList.add("nav--scrolled");
        document.body.classList.add("page--burgundy");
        return;
      }

      // Home page behavior
      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition > heroHeight - 100) {
        nav.classList.add("nav--scrolled");
        document.body.classList.add("page--burgundy");
      } else {
        nav.classList.remove("nav--scrolled");
        document.body.classList.remove("page--burgundy");
      }
    },

    setupLogoClick() {
      const logo = document.querySelector(".nav__logo");
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        const caseStudyPage = document.getElementById("caseStudyPage");
        if (caseStudyPage.classList.contains("active")) {
          goBackToPortfolio();
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    },

    toggleMenu() {
      App.elements.menuToggle.classList.toggle("active");
      App.elements.navLinks.classList.toggle("active");
    },

    closeMenu() {
      App.elements.menuToggle.classList.remove("active");
      App.elements.navLinks.classList.remove("active");
    },

    setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();

          const target = document.querySelector(anchor.getAttribute("href"));
          if (target) {
            setTimeout(() => {
              target.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        });
      });
    },
  },

  // ===== ANIMATIONS MODULE =====
  animations: {
    init() {
      this.handleReveal();
      window.addEventListener("scroll", () => this.handleReveal());
    },

    handleReveal() {
      const windowHeight = window.innerHeight;
      App.elements.reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - App.config.revealThreshold) {
          el.classList.add("active");
        }
      });

      // Animate progress bars when languages section is in view
      App.elements.progressBars.forEach((bar) => {
        const elementTop = bar.getBoundingClientRect().top;
        if (elementTop < windowHeight - App.config.revealThreshold) {
          bar.classList.add("active");
        }
      });
    },
  },

  // ===== INITIALIZE =====
  init() {
    this.cursor.init();
    this.nav.init();
    this.animations.init();
  },
};

// Start app when DOM is ready
document.addEventListener("DOMContentLoaded", () => App.init());
// ===== IMAGE SLIDER MODULE =====
const ImageSlider = {
  currentSlide: 0,
  totalSlides: 0,
  slider: null,
  track: null,
  dots: [],
  counter: null,
  touchStartX: 0,
  touchEndX: 0,

  init() {
    this.slider = document.querySelector(".image-slider");
    if (!this.slider) return;

    this.track = this.slider.querySelector(".slider-track");
    this.totalSlides = this.slider.querySelectorAll(".slider-slide").length;

    this.setupDots();
    this.setupButtons();
    this.setupTouch();
    this.updateSlider();
  },

  setupDots() {
    const dotsContainer = this.slider.querySelector(".slider-dots");

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }
  },

  setupButtons() {
    const prevBtn = this.slider.querySelector(".slider-btn-prev");
    const nextBtn = this.slider.querySelector(".slider-btn-next");

    prevBtn.addEventListener("click", () => this.prevSlide());
    nextBtn.addEventListener("click", () => this.nextSlide());
  },

  setupTouch() {
    this.track.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.track.addEventListener(
      "touchmove",
      (e) => {
        this.touchEndX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.track.addEventListener(
      "touchend",
      () => {
        this.handleSwipe();
      },
      { passive: true }
    );

    // Mouse drag support for desktop
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    this.track.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      this.track.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.cursor = "grab";

      const diff = startX - currentX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  },

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  },

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  },

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  },

  updateSlider() {
    const offset = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });

    // Update button states
    const prevBtn = this.slider.querySelector(".slider-btn-prev");
    const nextBtn = this.slider.querySelector(".slider-btn-next");

    // Optional: disable buttons at boundaries (remove if you want infinite loop)
    // prevBtn.disabled = this.currentSlide === 0;
    // nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
  },
};

// Make sure to initialize in your App.init()
// Update the existing App.init() method to include:
App.init = function () {
  this.cursor.init();
  this.nav.init();
  this.animations.init();
  ImageSlider.init(); // Add this line
};
