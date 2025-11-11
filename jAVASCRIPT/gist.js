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

// === Interactive Match Highlight ===
const matches = document.querySelectorAll(".match");
matches.forEach(match => {
  match.addEventListener("mouseenter", () => {
    match.style.background = "#00c853";
    match.style.color = "#000";
    match.style.transform = "scale(1.05)";
  });
  match.addEventListener("mouseleave", () => {
    match.style.background = "";
    match.style.color = "";
    match.style.transform = "scale(1)";
  });
});

// === Dynamic Article Hover ===
const articles = document.querySelectorAll(".category-section article, .main-article");
articles.forEach(article => {
  article.addEventListener("mouseenter", () => {
    article.style.transform = "translateY(-5px)";
    article.style.boxShadow = "0 0 20px rgba(0, 200, 83, 0.5)";
  });
  article.addEventListener("mouseleave", () => {
    article.style.transform = "translateY(0)";
    article.style.boxShadow = "none";
  });
});

// === Click to Read Full Article (Mock) ===
articles.forEach(article => {
  article.addEventListener("click", () => {
    alert("📰 Full article feature coming soon — stay tuned!");
  });
});

// === Sidebar Widget Animations ===
const widgets = document.querySelectorAll(".widget");
widgets.forEach(widget => {
  widget.addEventListener("mouseenter", () => {
    widget.style.boxShadow = "0 0 15px rgba(0, 200, 83, 0.4)";
  });
  widget.addEventListener("mouseleave", () => {
    widget.style.boxShadow = "none";
  });
});

// === Scroll-To-Top Button ===
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

// === Scroll-triggered Fade-in Animation ===
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, article, .widget").forEach(el => observer.observe(el));
