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
/* =========================================================
   INTERACTIVE CODE FIELD
   Code fragments repel from the cursor and reconstruct.
   ========================================================= */

const computationalPortrait = document.querySelector(".hero-visual");
const codeParticles = document.querySelectorAll(".code-particle");

if (computationalPortrait && codeParticles.length) {

  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  let portraitRect = computationalPortrait.getBoundingClientRect();

  const updatePortraitRect = () => {
    portraitRect = computationalPortrait.getBoundingClientRect();
  };

  window.addEventListener("resize", updatePortraitRect);

  computationalPortrait.addEventListener("pointermove", (event) => {

    portraitRect = computationalPortrait.getBoundingClientRect();

    targetMouseX = event.clientX - portraitRect.left;
    targetMouseY = event.clientY - portraitRect.top;

  });

  computationalPortrait.addEventListener("pointerleave", () => {

    targetMouseX = portraitRect.width / 2;
    targetMouseY = portraitRect.height / 2;

  });


  function animateCodeField() {

    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;

    const centerX = portraitRect.width / 2;
    const centerY = portraitRect.height / 2;

    codeParticles.forEach((particle) => {

      const baseX = parseFloat(
        getComputedStyle(particle)
          .getPropertyValue("--base-x")
      ) || 0;

      const baseY = parseFloat(
        getComputedStyle(particle)
          .getPropertyValue("--base-y")
      ) || 0;


      /*
       * Where the code particle currently lives
       */
      const particleX = centerX + baseX;
      const particleY = centerY + baseY;


      /*
       * Distance between cursor and particle
       */
      const dx = particleX - currentMouseX;
      const dy = particleY - currentMouseY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      /*
       * Interaction radius
       */
      const radius = 155;


      if (distance < radius) {

        /*
         * Stronger displacement when cursor
         * gets closer.
         */
        const strength =
          Math.pow((radius - distance) / radius, 2);

        const directionX =
          distance === 0 ? 1 : dx / distance;

        const directionY =
          distance === 0 ? 1 : dy / distance;


        const pushDistance = 75 * strength;

        const pushX = directionX * pushDistance;
        const pushY = directionY * pushDistance;


        particle.style.setProperty(
          "--push-x",
          `${pushX}px`
        );

        particle.style.setProperty(
          "--push-y",
          `${pushY}px`
        );

      } else {

        /*
         * Smoothly reconstruct the original formation.
         */
        particle.style.setProperty(
          "--push-x",
          `${parseFloat(
            particle.style.getPropertyValue("--push-x")
          ) * 0.88 || 0}px`
        );

        particle.style.setProperty(
          "--push-y",
          `${parseFloat(
            particle.style.getPropertyValue("--push-y")
          ) * 0.88 || 0}px`
        );

      }

    });

    requestAnimationFrame(animateCodeField);
  }


  /*
   * Start from the center.
   */
  currentMouseX = portraitRect.width / 2;
  currentMouseY = portraitRect.height / 2;

  targetMouseX = currentMouseX;
  targetMouseY = currentMouseY;

  animateCodeField();

}