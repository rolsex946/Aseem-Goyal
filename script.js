/* ==========================================================================
   DR. ASEEM GOYAL - PREMIUM ORTHOPAEDIC WEBSITE SCRIPTS
   ========================================================================== */

(function () {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. DOM ELEMENTS
  // --------------------------------------------------------------------------
  const header = document.getElementById("main-header");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileClose = document.getElementById("mobile-close");
  const preloader = document.getElementById("preloader");
  const app = document.getElementById("app");
  const backToTopBtn = document.getElementById("back-to-top");
  const cursorFollower = document.getElementById("cursor-follower");
  const pageTransition = document.getElementById("page-transition");

  // --------------------------------------------------------------------------
  // 2. PRELOADER
  // --------------------------------------------------------------------------
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("loaded");
      // Trigger initial page animation
      const activePage = document.querySelector(".page.active");
      if (activePage) {
        animateElements(activePage);
      }
    }, 800);
  });

  // --------------------------------------------------------------------------
  // 3. SPA ROUTER
  // --------------------------------------------------------------------------
  const routes = {
    home: "page-home",
    about: "page-about",
    services: "page-services",
    "service-knee-replacement": "page-service-knee-replacement",
    "service-fracture": "page-service-fracture",
    "service-arthritis": "page-service-arthritis",
    "service-sports": "page-service-sports",
    "service-spine": "page-service-spine",
    "service-shoulder": "page-service-shoulder",
    pricing: "page-pricing",
    reviews: "page-reviews",
    blog: "page-blog",
    "blog-knee-guide": "page-blog-knee-guide",
    "blog-arthritis-myths": "page-blog-arthritis-myths",
    "blog-sports-recovery": "page-blog-sports-recovery",
    "blog-spine-health": "page-blog-spine-health",
    gallery: "page-gallery",
    faq: "page-faq",
    contact: "page-contact",
    "book-appointment": "page-book-appointment",
    "privacy-policy": "page-privacy-policy",
    "terms-of-service": "page-terms-of-service",
    "cookie-policy": "page-cookie-policy",
    "refund-policy": "page-refund-policy",
    disclaimer: "page-disclaimer",
  };

  function navigateTo(routeName) {
    const pageId = routes[routeName];
    if (!pageId) return;

    const currentPage = document.querySelector(".page.active");
    const targetPage = document.getElementById(pageId);

    if (currentPage === targetPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Page transition animation
    pageTransition.classList.add("page-transition-enter");

    setTimeout(() => {
      // Hide current page
      if (currentPage) {
        currentPage.classList.remove("active");
        currentPage.style.display = "none";
      }

      // Show target page
      targetPage.style.display = "block";
      // Force reflow
      void targetPage.offsetWidth;
      targetPage.classList.add("active");

      // Update URL hash
      window.location.hash = routeName;

      // Update active nav links
      updateActiveNav(routeName);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "auto" });

      // Animate elements in new page
      animateElements(targetPage);

      // Close mobile menu if open
      closeMobileMenu();

      // Remove transition overlay
      setTimeout(() => {
        pageTransition.classList.remove("page-transition-enter");
      }, 300);
    }, 500);
  }

  function updateActiveNav(routeName) {
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${routeName}`) {
        link.classList.add("active");
      }
    });
  }

  // Handle navigation clicks
  document.addEventListener("click", function (e) {
    const navLink = e.target.closest("[data-nav]");
    if (navLink) {
      e.preventDefault();
      const href = navLink.getAttribute("href");
      if (href && href.startsWith("#")) {
        const routeName = href.substring(1);
        navigateTo(routeName);
      }
    }
  });

  // Handle browser back/forward
  window.addEventListener("hashchange", function () {
    const hash = window.location.hash.substring(1) || "home";
    const pageId = routes[hash];
    if (pageId) {
      const currentPage = document.querySelector(".page.active");
      const targetPage = document.getElementById(pageId);
      if (currentPage !== targetPage) {
        if (currentPage) {
          currentPage.classList.remove("active");
          currentPage.style.display = "none";
        }
        targetPage.style.display = "block";
        targetPage.classList.add("active");
        updateActiveNav(hash);
        animateElements(targetPage);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }
  });

  // Initialize route on page load
  function initRouter() {
    const hash = window.location.hash.substring(1) || "home";
    const pageId = routes[hash];

    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.style.display = "none";
      page.classList.remove("active");
    });

    if (pageId) {
      const targetPage = document.getElementById(pageId);
      targetPage.style.display = "block";
      targetPage.classList.add("active");
      updateActiveNav(hash);
    } else {
      // Fallback to home
      const homePage = document.getElementById("page-home");
      homePage.style.display = "block";
      homePage.classList.add("active");
      updateActiveNav("home");
    }
  }

  initRouter();

  // --------------------------------------------------------------------------
  // 4. HEADER SCROLL EFFECT
  // --------------------------------------------------------------------------
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Back to top button
    if (currentScroll > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    lastScroll = currentScroll;
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --------------------------------------------------------------------------
  // 5. MOBILE MENU
  // --------------------------------------------------------------------------
  function openMobileMenu() {
    mobileDrawer.classList.add("active");
    mobileOverlay.classList.add("active");
    mobileToggle.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove("active");
    mobileOverlay.classList.remove("active");
    mobileToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileToggle.addEventListener("click", () => {
    if (mobileDrawer.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileOverlay.addEventListener("click", closeMobileMenu);
  mobileClose.addEventListener("click", closeMobileMenu);

  // Mobile menu group toggles
  document
    .querySelectorAll(".mobile-nav-group > .mobile-nav-link")
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentElement.classList.toggle("open");
      });
    });

  // --------------------------------------------------------------------------
  // 6. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  function animateElements(container) {
    const elements = container.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Trigger counter animations if on home page
    if (container.id === "page-home") {
      initCounters();
    }
  }

  // --------------------------------------------------------------------------
  // 7. COUNTER ANIMATION
  // --------------------------------------------------------------------------
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      // Start counter when stats bar is visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          observer.disconnect();
        }
      });

      const statsBar = counter.closest(".hero-stats-bar");
      if (statsBar) {
        observer.observe(statsBar);
      } else {
        updateCounter();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. FAQ ACCORDION
  // --------------------------------------------------------------------------
  document.addEventListener("click", function (e) {
    if (e.target.closest(".faq-question")) {
      const faqItem = e.target.closest(".faq-item");
      const answer = faqItem.querySelector(".faq-answer");
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items in the same list
      const parentList = faqItem.closest(".faq-list");
      if (parentList) {
        parentList.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("active");
          item.querySelector(".faq-answer").style.maxHeight = null;
        });
      }

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    }
  });

  // --------------------------------------------------------------------------
  // 9. APPOINTMENT FORM SUBMISSION (WHATSAPP)
  // --------------------------------------------------------------------------
  const appointmentForm = document.getElementById("appointment-form");
  const contactForm = document.getElementById("contact-form");

  function sendToWhatsApp(formData, isAppointment = true) {
    const phone = "919988054848";
    let message = "";

    if (isAppointment) {
      message = `🦴 *NEW APPOINTMENT REQUEST* 🦴\n\n`;
      message += `*Patient Details:*\n`;
      message += `👤 Name: ${formData.get("name")}\n`;
      message += `📞 Phone: ${formData.get("phone")}\n`;
      message += `📧 Email: ${formData.get("email") || "N/A"}\n`;
      message += `🎂 Age: ${formData.get("age")}\n`;
      message += `⚧ Gender: ${formData.get("gender")}\n`;
      message += `🏙️ City: ${formData.get("city")}\n\n`;
      message += `*Consultation Details:*\n`;
      message += `🩺 Concern: ${formData.get("concern")}\n`;
      message += `💻 Type: ${formData.get("consultationType")}\n`;
      message += `📅 Preferred Date: ${formData.get("preferredDate")}\n`;
      message += `🕐 Preferred Time: ${formData.get("preferredTime") || "Any"}\n\n`;
      message += `*Medical Description:*\n${formData.get("description")}\n\n`;
      message += `*Source:* ${formData.get("referralSource") || "Website"}`;
    } else {
      message = `📩 *NEW CONTACT MESSAGE* 📩\n\n`;
      message += `👤 Name: ${formData.get("name")}\n`;
      message += `📞 Phone: ${formData.get("phone")}\n`;
      message += `📧 Email: ${formData.get("email") || "N/A"}\n\n`;
      message += `*Message:*\n${formData.get("message")}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  }

  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      const errorSpan = field.parentElement.querySelector(".form-error");
      field.classList.remove("error");
      if (errorSpan) errorSpan.textContent = "";

      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("error");
        if (errorSpan) errorSpan.textContent = "This field is required";
      } else if (
        field.type === "email" &&
        field.value &&
        !/^\S+@\S+\.\S+$/.test(field.value)
      ) {
        isValid = false;
        field.classList.add("error");
        if (errorSpan) errorSpan.textContent = "Please enter a valid email";
      } else if (field.type === "checkbox" && !field.checked) {
        isValid = false;
        const label = field.parentElement.querySelector("label");
        if (label) label.style.color = "var(--accent)";
      }
    });

    return isValid;
  }

  if (appointmentForm) {
    // Set min date to today
    const dateInput = document.getElementById("apt-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }

    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm(this)) {
        const formData = new FormData(this);
        sendToWhatsApp(formData, true);

        // Show success feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          this.reset();
        }, 3000);
      } else {
        // Scroll to first error
        const firstError = this.querySelector(".error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm(this)) {
        const formData = new FormData(this);
        sendToWhatsApp(formData, false);
        this.reset();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. CUSTOM CURSOR
  // --------------------------------------------------------------------------
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      if (cursorFollower) {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }
    });

    document
      .querySelectorAll("a, button, input, select, textarea, .btn")
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          cursorFollower.classList.add("active"),
        );
        el.addEventListener("mouseleave", () =>
          cursorFollower.classList.remove("active"),
        );
      });
  }

  // --------------------------------------------------------------------------
  // 11. TILT EFFECT ON SERVICE CARDS
  // --------------------------------------------------------------------------
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // --------------------------------------------------------------------------
  // 12. SMOOTH SCROLL FOR ANCHOR LINKS (Same page)
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement && targetElement.closest(".page.active")) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
})();
