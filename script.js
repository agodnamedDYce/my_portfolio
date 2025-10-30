const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.body.style.backgroundPositionY = `${scrollY * 0.4}px`;
});

document.getElementById("year").textContent = new Date().getFullYear();

// CAROUSEL SECTION
const images = [
  "./assets/slideshow/download (1).jpeg",
  "./assets/slideshow/download (2).jpeg",
  "./assets/slideshow/image3-C_xWS4hg.jpeg",
  "./assets/slideshow/image1-DRtD8SJD.jpeg",
  "./assets/slideshow/download (4).jpeg",
  "./assets/slideshow/image6-B6eFxJEl.jpeg",
  "./assets/slideshow/image5-Dw9sTb9e.jpeg",
  "./assets/slideshow/image4-TsL8aLcA.jpeg",
  "./assets/slideshow/download (3).jpeg",
];

const reelContainer = document.getElementById("reelContainer");

// Create initial carousel items
function initializeCarousel() {
  // Duplicate images to ensure enough content for a seamless loop
  const allImages = [...images, ...images];

  allImages.forEach((src) => {
    const item = createReelItem(src);
    reelContainer.appendChild(item);
  });
}

function createReelItem(src) {
  const div = document.createElement("div");
  div.className = "reel-item";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Reel image";
  img.loading = "lazy";

  div.appendChild(img);
  return div;
}

// Initialize carousel on page load
document.addEventListener("DOMContentLoaded", initializeCarousel);

// Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
  const titleSpans = document.querySelectorAll(".hero-title span");

  // Start each letter animation after the others are in position
  titleSpans.forEach((span, index) => {
    span.style.animationDelay = `${1.8 + index * 0.08}s`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in-up");

  const appearOptions = {
    threshold: 0.15, // triggers when 15% of the section is visible
    rootMargin: "0px 0px -50px 0px", // slight early trigger
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});


// Fade-in descending animation for Projects section
const projectsSection = document.querySelector('.projects-section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.1 } // triggers when 10% is visible
);

if (projectsSection) {
  observer.observe(projectsSection);
}


document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const sections = document.querySelectorAll(".work-together");
  sections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
  // ---------- existing initialization if present ----------
  if (typeof initializeCarousel === "function") {
    initializeCarousel(); // keep your existing function that builds items
  }

  // ---------- progressive ascending intro logic ----------
  const reelSection = document.querySelector(".random-reel");
  const reelContainer = document.getElementById("reelContainer");

  if (!reelSection || !reelContainer) return;

  const ASCEND_DELAY = 0.09;      // seconds between items (stagger)
  const ASCEND_DURATION = 0.48;   // seconds (matches CSS animation-duration)
  const ITEMS_TO_ANIMATE = images.length; // animate one set (original images)

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Pause horizontal scroll animation while intro runs
        const previousPlayState = getComputedStyle(reelContainer).animationPlayState || "running";
        reelContainer.style.animationPlayState = "paused";

        // Grab the current items (they were appended by initializeCarousel)
        const allItems = Array.from(reelContainer.querySelectorAll(".reel-item"));

        // We'll animate only the first ITEMS_TO_ANIMATE items so the sequence is logical
        const itemsToAnimate = allItems.slice(0, ITEMS_TO_ANIMATE);

        // Apply staggered ascend class with inline delays
        itemsToAnimate.forEach((item, idx) => {
          // clear any lingering inline styles
          item.style.animationDelay = "";
          // set staggered delay
          item.style.animationDelay = `${(idx * ASCEND_DELAY).toFixed(2)}s`;
          item.classList.add("ascend");
        });

        // Calculate total wait time (last item's delay + its duration) + small buffer
        const totalTimeMs = Math.ceil(((ITEMS_TO_ANIMATE - 1) * ASCEND_DELAY + ASCEND_DURATION) * 1000 + 150);

        // After animation finishes, remove classes and resume scrolling
        setTimeout(() => {
          itemsToAnimate.forEach((item) => {
            item.classList.remove("ascend");
            item.style.animationDelay = ""; // cleanup
          });

          // Restore previous play state (usually 'running')
          reelContainer.style.animationPlayState = previousPlayState;

        }, totalTimeMs);

        // Only run once
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  obs.observe(reelSection);
});


// Footer animation
document.addEventListener("DOMContentLoaded", () => {
  // Footer fade-up on scroll (one-time)
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const footerObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Add the visible class that triggers CSS transitions
        footer.classList.add("footer-visible");

        // Clean up: we only want this animation once
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08, // start animation early (8% visible)
      rootMargin: "0px 0px -30px 0px", // slight early trigger if needed
    }
  );

  footerObserver.observe(footer);
});
