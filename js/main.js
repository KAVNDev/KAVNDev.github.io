// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const hamburger = navToggle.querySelector('.navbar__hamburger');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('navbar__menu--open');
  hamburger.classList.toggle('navbar__hamburger--active');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
document.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('navbar__menu--open');
    hamburger.classList.remove('navbar__hamburger--active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__link');

function highlightNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});
