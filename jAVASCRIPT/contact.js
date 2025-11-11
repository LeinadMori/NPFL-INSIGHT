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

// === Hero Buttons Hover Glow ===
const heroButtons = document.querySelectorAll(".hero-buttons a");
heroButtons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 15px #00c853";
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
    btn.style.transform = "scale(1)";
  });
});

// === Info Cards Hover Effect ===
const infoCards = document.querySelectorAll(".info-card");
infoCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 0 20px rgba(0,200,83,0.4)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "none";
  });
});

// === Scroll-to-top Button ===
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

// === Scroll-triggered Fade-in Animations ===
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, .info-card, .contact-form").forEach(el => observer.observe(el));

// === Contact Form Handling with Modal ===
const contactForm = document.querySelector(".contact-form");

// Create modal dynamically
const modal = document.createElement("div");
modal.id = "contact-modal";
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <span class="modal-close">&times;</span>
    <h3>Message Sent!</h3>
    <p>Thank you for reaching out. We'll get back to you soon.</p>
  </div>
`;
document.body.appendChild(modal);

const modalClose = modal.querySelector(".modal-close");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = contactForm.querySelector("input[type='text']").value.trim();
    const email = contactForm.querySelector("input[type='email']").value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending your message.");
      return;
    }

    // Show modal
    modal.style.display = "block";

    // Reset form
    contactForm.reset();
  });
}

// Close modal when clicking the close button
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
