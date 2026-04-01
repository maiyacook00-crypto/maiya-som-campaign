/*
  Experience carousel behavior.
*/
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
  if (!slides.length) {
    return;
  }

  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  if (!slides.length) {
    return;
  }

  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  if (!slides.length) {
    return;
  }

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

showSlide(currentSlide);

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

/*
  Simple reveal-on-scroll effect for sections.
  Remove this if you want a fully static page.
*/
const revealTargets = document.querySelectorAll(".section, .site-footer");

revealTargets.forEach((target) => {
  target.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealTargets.forEach((target) => {
  revealObserver.observe(target);
});

/*
  Highlight the current navigation section while scrolling.
*/
const navLinks = [...document.querySelectorAll(".site-nav a")];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentId = `#${entry.target.id}`;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === currentId);
      });
    });
  },
  {
    threshold: 0.4,
  }
);

trackedSections.forEach((section) => {
  navObserver.observe(section);
});
