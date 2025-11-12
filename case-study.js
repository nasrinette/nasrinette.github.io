// Shared behaviors for case-study pages
// - Custom cursor interactions
// - Responsive nav toggle
// - Smooth in-page scrolling
// - Reveal-on-scroll animations

(function () {
  function initCursor() {
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;
    const enabled = window.innerWidth > 768;
    if (!enabled) {
      cursor.style.display = "none";
      return;
    }

    const onMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", onMove);

    // Hover scaling on actionable elements
    const enter = () => (cursor.style.transform = "scale(2)");
    const leave = () => (cursor.style.transform = "scale(1)");
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
  }

  function initNav() {
    const menuToggle = document.querySelector(".nav__toggle");
    const navLinks = document.querySelector(".nav__links");
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close on link click
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        // Allow "#" or empty href to be ignored
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function initReveal() {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    if (!reveals.length) return;

    let ticking = false;
    const update = () => {
      const windowHeight = window.innerHeight;
      for (const el of reveals) {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 150) {
          el.classList.add("active");
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initCursor();
      initNav();
      initSmoothScroll();
      initReveal();
    });
  } else {
    initCursor();
    initNav();
    initSmoothScroll();
    initReveal();
  }
})();
