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

class CaseStudyNavigation {
  constructor() {
    this.sections = [];
    this.nav = null;
    this.navItems = [];
    this.currentSection = null;
    this.scrollTimeout = null;

    this.init();
  }

  init() {
    // Find all main sections in the case study
    this.sections = Array.from(
      document.querySelectorAll(".case-study__section")
    );

    if (this.sections.length === 0) {
      console.warn("No case study sections found");
      return;
    }

    this.createNavigation();
    this.attachEventListeners();
    this.updateActiveSection();
  }

  createNavigation() {
    // Create navigation container
    this.nav = document.createElement("nav");
    this.nav.className = "case-study-nav";
    this.nav.setAttribute("aria-label", "Case study sections");

    // Create nav items for each section
    this.sections.forEach((section, index) => {
      const title = this.getSectionTitle(section);
      if (!title) return;

      const button = document.createElement("button");
      button.className = "case-study-nav__item";
      button.setAttribute("data-section-index", index);
      button.setAttribute("aria-label", `Go to ${title} section`);

      // Add text
      const text = document.createElement("span");
      text.textContent = title;

      button.appendChild(text);

      this.nav.appendChild(button);
      this.navItems.push(button);
    });

    // Add to page
    document.body.appendChild(this.nav);
  }

  getSectionTitle(section) {
    // Try to find title in different possible locations
    const titleElement =
      section.querySelector(".case-study__section-title") ||
      section.querySelector("h3") ||
      section.querySelector("h2");

    if (titleElement) {
      return titleElement.textContent.trim();
    }

    return null;
  }

  attachEventListeners() {
    // Click handlers for nav items
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.scrollToSection(index);
      });
    });

    // Scroll handler to update active section
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.updateActiveSection();
      }, 100);
    });

    // Show/hide nav on scroll (optional)
    let lastScroll = window.pageYOffset;
    let hideTimeout;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      // Show nav when scrolling
      this.nav.classList.remove("hidden");

      // Optional: Hide after 3 seconds of no scrolling
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        // Uncomment to enable auto-hide:
        // this.nav.classList.add('hidden');
      }, 3000);

      lastScroll = currentScroll;
    });
  }

  scrollToSection(index) {
    const section = this.sections[index];
    if (!section) return;

    // Calculate offset for fixed headers
    const headerOffset = 100;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update active immediately for better UX
    this.setActiveSection(index);
  }

  updateActiveSection() {
    const scrollPosition = window.pageYOffset + window.innerHeight / 3;

    let activeIndex = 0;

    // Find which section is currently in view
    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeIndex = index;
      }
    });

    this.setActiveSection(activeIndex);
  }

  setActiveSection(index) {
    if (this.currentSection === index) return;

    this.currentSection = index;

    // Update active class
    this.navItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
        item.setAttribute("aria-current", "true");

        // Scroll nav item into view if needed
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      } else {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      }
    });
  }

  destroy() {
    if (this.nav && this.nav.parentNode) {
      this.nav.parentNode.removeChild(this.nav);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CaseStudyNavigation();
  });
} else {
  new CaseStudyNavigation();
}
