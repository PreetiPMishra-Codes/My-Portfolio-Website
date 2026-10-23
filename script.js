// =========================================================
//  NEON CURSOR
//  Smooth follow with a trailing glow.
//  Disabled automatically on touch-first devices
//  and for reduced-motion users.
// =========================================================

const glow = document.querySelector(".cursor-glow");
const core = document.querySelector(".cursor-core");

const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (finePointer && !reduceMotion && glow && core) {

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  let glowX = targetX;
  let glowY = targetY;

  let coreX = targetX;
  let coreY = targetY;

  document.body.classList.add("cursor-ready");

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => {
    glow.style.opacity = "0";
    core.style.opacity = "0";
  });

  window.addEventListener("pointerenter", () => {
    glow.style.opacity = "1";
    core.style.opacity = "1";
  });

  // Smooth interpolation instead of snapping to the cursor.
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


  // Expand the cursor aura over interactive elements.
  document.querySelectorAll("a, button").forEach((element) => {

    element.addEventListener("pointerenter", () => {

      glow.style.width = "390px";
      glow.style.height = "390px";

      core.style.transform =
        "translate(-50%, -50%) scale(1.45)";
    });

    element.addEventListener("pointerleave", () => {

      glow.style.width = "300px";
      glow.style.height = "300px";

      core.style.transform =
        "translate(-50%, -50%) scale(1)";
    });

  });
}



// =========================================================
//  REVEAL ANIMATION
//  Sections gently appear as they enter the viewport.
// =========================================================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          currentObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });

} else {

  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });

}



// =========================================================
//  MOBILE NAVIGATION
// =========================================================

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}



// =========================================================
//  INTERACTIVE COMPUTATIONAL PORTRAIT
//
//  Code fragments repel from the cursor and then
//  smoothly reconstruct their original formation.
// =========================================================

const computationalPortrait =
  document.querySelector(".hero-visual");

const codeParticles =
  document.querySelectorAll(".code-particle");

if (computationalPortrait && codeParticles.length) {

  let targetMouseX = 0;
  let targetMouseY = 0;

  let currentMouseX = 0;
  let currentMouseY = 0;

  let portraitRect =
    computationalPortrait.getBoundingClientRect();


  const updatePortraitRect = () => {

    portraitRect =
      computationalPortrait.getBoundingClientRect();

  };


  window.addEventListener(
    "resize",
    updatePortraitRect
  );


  computationalPortrait.addEventListener(
    "pointermove",
    (event) => {

      portraitRect =
        computationalPortrait.getBoundingClientRect();

      targetMouseX =
        event.clientX - portraitRect.left;

      targetMouseY =
        event.clientY - portraitRect.top;

    }
  );


  computationalPortrait.addEventListener(
    "pointerleave",
    () => {

      targetMouseX =
        portraitRect.width / 2;

      targetMouseY =
        portraitRect.height / 2;

    }
  );



  function animateCodeField() {

    currentMouseX +=
      (targetMouseX - currentMouseX) * 0.08;

    currentMouseY +=
      (targetMouseY - currentMouseY) * 0.08;


    const centerX =
      portraitRect.width / 2;

    const centerY =
      portraitRect.height / 2;


    codeParticles.forEach((particle) => {

      const baseX =
        parseFloat(
          getComputedStyle(particle)
            .getPropertyValue("--base-x")
        ) || 0;

      const baseY =
        parseFloat(
          getComputedStyle(particle)
            .getPropertyValue("--base-y")
        ) || 0;


      // Original position of the particle.
      const particleX =
        centerX + baseX;

      const particleY =
        centerY + baseY;


      // Distance from cursor to particle.
      const dx =
        particleX - currentMouseX;

      const dy =
        particleY - currentMouseY;

      const distance =
        Math.sqrt(dx * dx + dy * dy);


      // Interaction radius.
      const radius = 155;


      if (distance < radius) {

        // Stronger displacement closer to cursor.
        const strength =
          Math.pow(
            (radius - distance) / radius,
            2
          );


        const directionX =
          distance === 0
            ? 1
            : dx / distance;

        const directionY =
          distance === 0
            ? 1
            : dy / distance;


        const pushDistance =
          75 * strength;


        const pushX =
          directionX * pushDistance;

        const pushY =
          directionY * pushDistance;


        particle.style.setProperty(
          "--push-x",
          `${pushX}px`
        );

        particle.style.setProperty(
          "--push-y",
          `${pushY}px`
        );

      } else {

        // Smoothly reconstruct the original formation.

        const currentPushX =
          parseFloat(
            particle.style.getPropertyValue("--push-x")
          ) || 0;

        const currentPushY =
          parseFloat(
            particle.style.getPropertyValue("--push-y")
          ) || 0;


        particle.style.setProperty(
          "--push-x",
          `${currentPushX * 0.88}px`
        );

        particle.style.setProperty(
          "--push-y",
          `${currentPushY * 0.88}px`
        );

      }

    });


    requestAnimationFrame(animateCodeField);
  }



  // Start from the center.

  currentMouseX =
    portraitRect.width / 2;

  currentMouseY =
    portraitRect.height / 2;

  targetMouseX =
    currentMouseX;

  targetMouseY =
    currentMouseY;


  animateCodeField();

}



// =========================================================
//  PROJECT CARD INTERACTION
//
//  Cards subtly respond to the cursor:
//  - small 3D tilt
//  - soft internal glow
//  - gentle cursor-based movement
//
//  The effect stays deliberately restrained so the
//  portfolio still feels technical rather than gimmicky.
// =========================================================

const projectCards =
  document.querySelectorAll(".project-card");


if (
  projectCards.length &&
  finePointer &&
  !reduceMotion
) {

  projectCards.forEach((card) => {

    card.addEventListener(
      "pointermove",
      (event) => {

        const rect =
          card.getBoundingClientRect();


        // Cursor position inside the card.
        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        // Normalize to -1 → +1.
        const normalizedX =
          (x / rect.width - 0.5) * 2;

        const normalizedY =
          (y / rect.height - 0.5) * 2;


        // Very subtle tilt.
        const rotateY =
          normalizedX * 2.5;

        const rotateX =
          normalizedY * -2.5;


        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;


        // Cursor-relative glow position.
        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

      },
      { passive: true }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.transform = "";

        card.style.setProperty(
          "--mouse-x",
          "50%"
        );

        card.style.setProperty(
          "--mouse-y",
          "50%"
        );

      }
    );

  });

}



// =========================================================
//  PROJECT CARD IMAGE / ART PARALLAX
//
//  The visual inside each project card moves slightly
//  opposite to the cursor, giving the cards depth.
// =========================================================

const projectArts =
  document.querySelectorAll(".project-art");


if (
  projectArts.length &&
  finePointer &&
  !reduceMotion
) {

  projectArts.forEach((art) => {

    art.addEventListener(
      "pointermove",
      (event) => {

        const rect =
          art.getBoundingClientRect();


        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const offsetX =
          ((x / rect.width) - 0.5) * 8;

        const offsetY =
          ((y / rect.height) - 0.5) * 8;


        const visual =
          art.querySelector(
            ".mini-window, .ai-orbit, .terminal-card"
          );


        if (visual) {

          visual.style.transform =
            `translate(
              ${-offsetX}px,
              ${-offsetY}px
            )
            rotate(
              var(--project-rotation, 0deg)
            )`;

        }

      },
      { passive: true }
    );


    art.addEventListener(
      "pointerleave",
      () => {

        const visual =
          art.querySelector(
            ".mini-window, .ai-orbit, .terminal-card"
          );


        if (visual) {

          visual.style.transform =
            `rotate(
              var(--project-rotation, 0deg)
            )`;

        }

      }
    );

  });

}



// =========================================================
//  PROJECT ART ROTATIONS
//
//  Keeps the original visual personality of each
//  project illustration while allowing JS parallax.
// =========================================================

const miniWindow =
  document.querySelector(".mini-window");

const terminalCard =
  document.querySelector(".terminal-card");


if (miniWindow) {
  miniWindow.style.setProperty(
    "--project-rotation",
    "-4deg"
  );
}

if (terminalCard) {
  terminalCard.style.setProperty(
    "--project-rotation",
    "2deg"
  );
}



// =========================================================
//  PROJECT LINK MICRO-INTERACTION
//
//  Adds a tiny arrow movement when hovering project
//  GitHub links.
// =========================================================

const projectLinks =
  document.querySelectorAll(".project-footer a");


projectLinks.forEach((link) => {

  const arrow =
    link.querySelector("span");

  if (!arrow) return;


  link.addEventListener(
    "pointerenter",
    () => {

      arrow.style.transform =
        "translate(3px, -3px)";

    }
  );


  link.addEventListener(
    "pointerleave",
    () => {

      arrow.style.transform =
        "translate(0, 0)";

    }
  );

});