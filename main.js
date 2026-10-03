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

// ===== Hero slider =====
const hero = document.querySelector('.hero');

if (hero) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function showSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextSlide, 1000);
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      showSlide(index);
    });
  });

  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);
  hero.addEventListener('focusin', stopAutoplay);
  hero.addEventListener('focusout', startAutoplay);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    startAutoplay();
  }
}
// ===== Product filters (Home page) =====
const pills = document.querySelectorAll('.pill');

if (pills.length > 0) {
  const products = document.querySelectorAll('.product');
  const status = document.getElementById('filter-status');

  // Show only the products whose data-tags contain the chosen filter
  function filterProducts(filter) {
    let count = 0;
    products.forEach(function (product) {
      const tags = product.dataset.tags.split(' ');   // "new best" -> ["new", "best"]
      const show = tags.includes(filter);
      product.hidden = !show;
      if (show) {
        count++;
      }
    });
    status.textContent = 'Showing ' + count + ' products';
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      // 1. reset every pill
      pills.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      // 2. highlight the clicked one
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      // 3. filter
      filterProducts(pill.dataset.filter);
    });
  });

  filterProducts('new');   // start with "New In" showing
}

// ===== Wishlist hearts =====
document.querySelectorAll('.heart').forEach(function (heart) {
  heart.addEventListener('click', function () {
    const wasSaved = heart.getAttribute('aria-pressed') === 'true';
    heart.setAttribute('aria-pressed', String(!wasSaved));
    heart.textContent = wasSaved ? '♡' : '♥';
    heart.classList.toggle('saved', !wasSaved);
  });
});