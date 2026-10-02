const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", function () {
  navLinks.classList.toggle("open"); // show/hide menu
  const isOpen = navLinks.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen); // tells screen readers
});
//Email checker

const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("email-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!looksValid) {
    message.textContent = "Please enter a valid email address.";
    message.className = "form-message error";
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.focus();
    return;
  }

  message.textContent = "Thanks! You're in the club.";
  message.className = "form-message success";
  emailInput.setAttribute("aria-invalid", "false");
  form.reset();
});