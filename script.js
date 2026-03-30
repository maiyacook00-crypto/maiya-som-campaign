/*
  FAQ accordion behavior.
  Edit FAQ entries in index.html. This script handles the open/close interaction.
*/
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");

    if (!item) {
      return;
    }

    const isOpen = item.classList.contains("open");

    faqButtons.forEach((otherButton) => {
      const otherItem = otherButton.closest(".faq-item");

      if (!otherItem) {
        return;
      }

      otherItem.classList.remove("open");
      otherButton.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

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
