// === Navbar Active Link Highlight ===
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// === Smooth Scroll for Internal Links ===
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// === Hero Image Float Animation ===
const heroImg = document.querySelector(".hero-image img");
if (heroImg) {
  let direction = 1;
  setInterval(() => {
    const currentY = parseFloat(getComputedStyle(heroImg).transform.split(',')[5]) || 0;
    if (currentY > 10) direction = -1;
    if (currentY < -10) direction = 1;
    heroImg.style.transform = `translateY(${currentY + direction}px)`;
  }, 100);
}

// === Play Button Functionality for Podcasts ===
const playButtons = document.querySelectorAll(".play-btn");
let currentPlaying = null;

playButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Reset previous play button
    if (currentPlaying && currentPlaying !== btn) {
      currentPlaying.innerHTML = '<i class="fa-solid fa-play"></i> Play';
      currentPlaying.classList.remove("playing");
    }

    const isPlaying = btn.classList.toggle("playing");
    btn.innerHTML = isPlaying
      ? '<i class="fa-solid fa-pause"></i> Pause'
      : '<i class="fa-solid fa-play"></i> Play';
    currentPlaying = isPlaying ? btn : null;
  });
});

// === Card Hover Glow ===
const cards = document.querySelectorAll(".podcast-card, .podcaster");
cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 0 20px rgba(0, 200, 83, 0.5)";
    card.style.transform = "translateY(-5px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
    card.style.transform = "translateY(0)";
  });
});

// === Scroll-to-Top Button ===
const scrollTopBtn = document.createElement("button");
scrollTopBtn.textContent = "↑";
scrollTopBtn.style.position = "fixed";
scrollTopBtn.style.bottom = "30px";
scrollTopBtn.style.right = "30px";
scrollTopBtn.style.padding = "10px 15px";
scrollTopBtn.style.border = "none";
scrollTopBtn.style.borderRadius = "50%";
scrollTopBtn.style.background = "#00c853";
scrollTopBtn.style.color = "#000";
scrollTopBtn.style.cursor = "pointer";
scrollTopBtn.style.display = "none";
scrollTopBtn.style.zIndex = "1000";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Theme Toggle ===
const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
themeToggle.innerHTML = "🌙";
themeToggle.style.position = "fixed";
themeToggle.style.bottom = "30px";
themeToggle.style.left = "30px";
themeToggle.style.padding = "10px 15px";
themeToggle.style.border = "none";
themeToggle.style.borderRadius = "50%";
themeToggle.style.background = "#222";
themeToggle.style.color = "#00c853";
themeToggle.style.cursor = "pointer";
themeToggle.style.zIndex = "1000";
document.body.appendChild(themeToggle);

const currentTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark-mode", currentTheme === "dark");

themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// === Intersection Fade-In Animation ===
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll("section, .podcaster, .podcast-card").forEach(el => observer.observe(el));
