/* =========================
   Global Utilities
========================= */

// Throttle for performance
function throttle(fn, delay = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}

/* =========================
   Footer Year
========================= */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================
   Mobile Menu Toggle
========================= */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });
}

/* =========================
   Smooth Scroll + Active Menu
========================= */
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    // Active state
    menuLinks.forEach((x) => x.classList.remove("active"));
    link.classList.add("active");

    // Close mobile menu
    menu.classList.remove("open");
    menuBtn.classList.remove("active");
  });
});

/* =========================
   Scroll Spy (Auto Active Menu)
========================= */
const sections = document.querySelectorAll("section[id]");

function updateActiveMenu() {
  let scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      menuLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );
      });
    }
  });
}

/* =========================
   Header Scroll Effect
========================= */
const header = document.querySelector("header");

function handleHeaderScroll() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 50);
}

/* =========================
   Scroll Progress Bar
========================= */
const progress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
  if (!progress) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const percent = (scrollTop / scrollHeight) * 100;
  progress.style.width = `${percent}%`;
}

/* =========================
   Reveal Animation
========================= */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

reveals.forEach((el) => revealObserver.observe(el));

/* =========================
   Contact Form UX
========================= */
const form = document.getElementById("contactForm");
const note = document.getElementById("note");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  note.textContent = "⏳ Sending message...";

  emailjs
    .sendForm(
      "service_1j7c1so",
      "template_hl0vatr",
      this
    )
    .then(
      () => {
        note.textContent = "✅ Message sent successfully!";
        form.reset();
      },
      (error) => {
        note.textContent = "❌ Failed to send message. Try again.";
        console.error(error);
      }
    );
});


/* =========================
   Scroll Events (Optimized)
========================= */
window.addEventListener(
  "scroll",
  throttle(() => {
    updateScrollProgress();
    updateActiveMenu();
    handleHeaderScroll();
  }, 100)
);

/* =========================
   Accessibility Enhancements
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menu.classList.remove("open");
    menuBtn.classList.remove("active");
  }
});
