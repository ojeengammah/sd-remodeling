// Mobile Menu
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}

// Close menu when clicking a nav link (mobile)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('#nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById("nav-links").classList.remove("show");
    });
  });
});

// Scroll to Contact
function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Fade-in
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => observer.observe(el));
});

// Projects Modal
function openModal(imgUrl) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = imgUrl;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function closeModalOnBackdrop(e) {
  if (e.target.id === "modal") closeModal();
}

// =============================
// EmailJS Contact Form
// =============================
const SERVICE_ID = "service_3d19ib4";
const TEMPLATE_ID = "template_m6z74w1";

function submitForm(e) {
  e.preventDefault();

  const msgEl = document.getElementById("form-msg");
  const btn = e.target.querySelector('button[type="submit"]');

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    msgEl.textContent = "Please fill out all fields.";
    msgEl.style.color = "red";
    return;
  }

  msgEl.textContent = "";
  msgEl.style.color = "";
  btn.disabled = true;
  btn.style.opacity = "0.8";
  btn.textContent = "Sending...";

  // Works for auto-reply templates too (they often want to_email / to_name)
  const params = {
    from_name: name,
    reply_to: email,
    to_email: email,
    to_name: name,
    message: message
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
    .then(() => {
      msgEl.textContent = "✅ Thanks! Your request was sent. We’ll contact you soon.";
      msgEl.style.color = "green";
      e.target.reset();
    })
    .catch((err) => {
      console.error("EmailJS error full:", err);
      msgEl.textContent = `❌ Email failed: ${err?.text || err?.message || "Unknown error"}`;
      msgEl.style.color = "red";
    })
    .finally(() => {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.textContent = "Send Request";
    });
}
