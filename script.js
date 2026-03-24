// =========================
// INIT AFTER DOM LOAD (VERY IMPORTANT)
// =========================
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // LENIS SMOOTH SCROLL
  // =========================
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // =========================
  // GSAP SETUP
  // =========================
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("h1", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  // reveal
  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      }
    });
  });

  // grid stagger
  gsap.utils.toArray(".reveal-grid").forEach(grid => {
    gsap.from(grid.children, {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 85%"
      }
    });
  });

  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // =========================
  // LOGO MODAL
  // =========================
  const navLogo = document.getElementById("navLogo");
  const footerLogo = document.getElementById("footerLogo");
  const modal = document.getElementById("logoModal");
  const closeModal = document.getElementById("closeModal");

  if (navLogo && modal) {
    navLogo.addEventListener("click", () => modal.classList.remove("hidden"));
  }

  if (footerLogo && modal) {
    footerLogo.addEventListener("click", () => modal.classList.remove("hidden"));
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  // =========================
  // CIRCLE IMAGE SLIDER
  // =========================
  const circleSlides = document.querySelectorAll(".circle-slide");
  let cIndex = 0;

  function showCircle(i) {
    circleSlides.forEach((slide, idx) => {
      slide.style.opacity = (idx === i) ? "1" : "0";
    });
  }

  if (circleSlides.length) {
    showCircle(cIndex);
    setInterval(() => {
      cIndex = (cIndex + 1) % circleSlides.length;
      showCircle(cIndex);
    }, 4000);
  }

  // =========================
  // MOBILE MENU
  // =========================
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // =========================
  // ANNOUNCEMENT SLIDER
  // =========================
  const slides = document.querySelectorAll(".announcement-slide");
  const dots = document.querySelectorAll(".dot");

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("hidden", i !== index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-black", i === index);
      dot.classList.toggle("bg-gray-300", i !== index);
    });
  }

  if (slides.length) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // =========================
  // LEADERSHIP SLIDER (DOT BASED)
  // =========================
  const slider = document.getElementById("leaderSlider");
  const dotsContainer = document.getElementById("leaderDots");

  let index = 0;

  function getVisibleCards() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function updateSlider() {
    if (!slider) return;

    const visible = getVisibleCards();
    const movePercent = 100 / visible;
    slider.style.transform = `translateX(-${index * movePercent}%)`;

    updateDots();
  }

  function updateDots() {
    if (!dotsContainer || !slider) return;

    dotsContainer.innerHTML = "";
    const cards = slider.children;

    const visible = getVisibleCards();
    const totalGroups = Math.ceil(cards.length / visible);

    let start = Math.max(0, index - 1);
    let end = Math.min(totalGroups, start + 3);

    for (let i = start; i < end; i++) {
      const dot = document.createElement("div");

      dot.className =
        "w-2 h-2 rounded-full cursor-pointer transition " +
        (i === index ? "bg-black scale-125" : "bg-gray-300");

      dot.addEventListener("click", () => {
        index = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }
  }

  if (slider) {
    window.addEventListener("resize", () => {
      index = 0;
      updateSlider();
    });

    updateSlider();
  }

});