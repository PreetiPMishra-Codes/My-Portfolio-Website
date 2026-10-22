// Neon cursor: smooth follow with a trailing glow.
// It is disabled automatically on touch-first devices and for reduced-motion users.
const glow = document.querySelector(".cursor-glow");
const core = document.querySelector(".cursor-core");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (finePointer && !reduceMotion && glow && core) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let glowX = targetX;
  let glowY = targetY;
  let coreX = targetX;
  let coreY = targetY;

  document.body.classList.add("cursor-ready");

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    glow.style.opacity = "0";
    core.style.opacity = "0";
  });

  window.addEventListener("pointerenter", () => {
    glow.style.opacity = "1";
    core.style.opacity = "1";
  });

  // Lerp creates a soft, natural delay instead of snapping to the pointer.
  function animateCursor() {
    glowX += (targetX - glowX) * 0.105;
    glowY += (targetY - glowY) * 0.105;
    coreX += (targetX - coreX) * 0.28;
    coreY += (targetY - coreY) * 0.28;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    core.style.left = `${coreX}px`;
    core.style.top = `${coreY}px`;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Make the aura expand slightly over interactive elements.
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      glow.style.width = "390px";
      glow.style.height = "390px";
      core.style.transform = "translate(-50%, -50%) scale(1.45)";
    });
    element.addEventListener("pointerleave", () => {
      glow.style.width = "300px";
      glow.style.height = "300px";
      core.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
}

// Reveal sections gently as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Small-screen navigation.
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
