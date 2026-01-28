/**
 * Optional typing effect for the Bento "Currently" card on the home page.
 * Uses plan-aligned phrases: "React, Node, teaching", "Building products...", etc.
 */
(function () {
  const phrases = [
    "React, Node, teaching",
    "Building products at the intersection of code and learning.",
    "JavaScript · React · Node",
    "Fullstack development & educator",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout = 0;

  function tick(el) {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      timeout = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      timeout = charIndex === current.length ? 2500 : 80;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      timeout = 2500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeout = 400;
    }

    setTimeout(function () {
      tick(el);
    }, timeout);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("bento-now-typed");
    if (!el) return;
    setTimeout(function () {
      tick(el);
    }, 600);
  });
})();
