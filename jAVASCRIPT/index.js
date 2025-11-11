// === Navbar Active Link Highlight ===
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// === Podcast Circular Stats Animation (scroll-triggered) ===
const circles = document.querySelectorAll(".circle");
const circleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let circle = entry.target;
      let percent = circle.getAttribute("data-percent");
      let current = 0;
      const step = () => {
        if (current < percent) {
          current++;
          circle.style.setProperty("--percent", current);
          circle.querySelector("span").textContent = `${current}%`;
          requestAnimationFrame(step);
        } else {
          circle.querySelector("span").textContent = `${percent}%`;
        }
      };
      step();
      circleObserver.unobserve(circle);
    }
  });
}, { threshold: 0.5 });
circles.forEach(c => circleObserver.observe(c));

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
if(heroImg){
  let direction = 1;
  setInterval(() => {
    const currentY = parseFloat(getComputedStyle(heroImg).transform.split(',')[5]) || 0;
    if (currentY > 10) direction = -1;
    if (currentY < -10) direction = 1;
    heroImg.style.transform = `translateY(${currentY + direction}px)`;
  }, 100);
}

// === Button Hover Glow & Ripple Effects ===
const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-dark, .btn-main, .btn-details, .pill");
buttons.forEach(btn => {
  // Glow
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 15px #00c853";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
  });

  // Ripple
  btn.addEventListener("click", e => {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    btn.appendChild(circle);
    const rect = btn.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    setTimeout(() => circle.remove(), 600);
  });
});

// === Scroll To Top Button ===
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

// === Card Hover Effects & Optional Accordion ===
const featureCards = document.querySelectorAll(".feature-card, .program-card");
featureCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.03)";
    card.style.boxShadow = "0 10px 25px rgba(0, 200, 83, 0.4)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
  });

  // Optional Accordion for "Details"
  const btnDetails = card.querySelector(".btn-details");
  const extraContent = card.querySelector(".extra-content"); // add this div inside your card HTML if needed
  if(btnDetails && extraContent){
    btnDetails.addEventListener("click", () => {
      extraContent.style.display = extraContent.style.display === "block" ? "none" : "block";
    });
  }
});

// === Fade-in On Scroll ===
const fadeElems = document.querySelectorAll(".feature-card, .program-card, .news-updates article");
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease-out";
  fadeObserver.observe(el);
});

// === Search / Filter for News / Articles ===
const searchInput = document.createElement("input");
searchInput.placeholder = "Search news...";
searchInput.style.margin = "20px auto";
searchInput.style.display = "block";
searchInput.style.padding = "10px 15px";
document.querySelector(".fantasy-section")?.prepend(searchInput);

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".news-updates article").forEach(article => {
    article.style.display = article.textContent.toLowerCase().includes(query) ? "flex" : "none";
  });
});
