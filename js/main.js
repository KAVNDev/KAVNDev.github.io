// Force scroll to top on page refresh
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const hamburger = navToggle.querySelector('.navbar__hamburger');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('navbar__menu--open');
  hamburger.classList.toggle('navbar__hamburger--active');
  navToggle.setAttribute('aria-expanded', isOpen);
});

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

// Contact Form with Success Animation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then((response) => {
    if (response.ok) {
      formSuccess.classList.add('contact__form-success--visible');
      contactForm.reset();
      setTimeout(() => {
        formSuccess.classList.remove('contact__form-success--visible');
      }, 3000);
    }
  }).catch(() => {
    formSuccess.classList.add('contact__form-success--visible');
    contactForm.reset();
    setTimeout(() => {
      formSuccess.classList.remove('contact__form-success--visible');
    }, 3000);
  });
});

// ===== TYPEWRITER EFFECT =====
const typewriterElement = document.getElementById('typewriter');
const phrases = ['Programmer',
    'Technical Support',
    'Problem Solver' 
    //'Debug Specialist'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typewrite() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400;
  }

  setTimeout(typewrite, typeSpeed);
}

typewrite();

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.section__title, .section__subtitle, .about__grid, .portfolio__card, .resume__item, .contact__grid, .hero__content, .hero__image, .stats__item'
);

revealElements.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('back-to-top--visible');
  } else {
    backToTop.classList.remove('back-to-top--visible');
  }
});

// ===== STATS COUNTER ANIMATION =====
const statsNumbers = document.querySelectorAll('.stats__number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statsNumbers.forEach((num) => counterObserver.observe(num));

function animateCounter(element, target) {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 30);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// ===== CURSOR SPOTLIGHT =====
const spotlight = document.getElementById('cursorSpotlight');

document.addEventListener('mousemove', (e) => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top = e.clientY + 'px';
  spotlight.classList.add('cursor-spotlight--active');
});

document.addEventListener('mouseleave', () => {
  spotlight.classList.remove('cursor-spotlight--active');
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('preloader--hidden');
    document.querySelector('.hero__content').classList.add('hero--loaded');
    document.querySelector('.hero__image').classList.add('hero--loaded');
  }, 1500);
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn--magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// ===== 3D TILT ON PROFILE PHOTO =====
const avatar = document.querySelector('.hero__avatar');

if (avatar) {
  avatar.addEventListener('mousemove', (e) => {
    const rect = avatar.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    avatar.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`;
  });

  avatar.addEventListener('mouseleave', () => {
    avatar.style.transform = 'rotateY(0) rotateX(0) scale(1)';
  });
}

// ===== FLOATING PARTICLES =====
const particlesContainer = document.getElementById('particles');

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = Math.random() * 8 + 6 + 's';
  particle.style.width = Math.random() * 3 + 1 + 'px';
  particle.style.height = particle.style.width;
  particle.style.opacity = Math.random() * 0.3 + 0.05;
  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 14000);
}

setInterval(createParticle, 600);

// ===== DYNAMIC GREETING =====
const greetingEl = document.getElementById('heroGreeting');
const hour = new Date().getHours();
let greeting = 'Hello';

if (hour >= 5 && hour < 12) greeting = 'Good morning';
else if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
else greeting = 'Good evening';

greetingEl.textContent = greeting + ", I'm";

// ===== LAZY LOAD BLUR EFFECT =====
const lazyImg = document.querySelector('.hero__avatar-img--lazy');
if (lazyImg) {
  if (lazyImg.complete) {
    lazyImg.classList.add('hero__avatar-img--loaded');
  } else {
    lazyImg.addEventListener('load', () => {
      lazyImg.classList.add('hero__avatar-img--loaded');
    });
  }
}

// ===== INJECT ACCESS KEY =====
document.getElementById('formAccessKey').value = 'sf_0c6af9c04ad1f1f82f54d0ff';

// ===== FORM COOLDOWN (30s between submissions) =====
let lastSubmitTime = 0;
contactForm.querySelector('.contact__submit').addEventListener('click', (e) => {
  const now = Date.now();
  if (now - lastSubmitTime < 30000 && lastSubmitTime !== 0) {
    e.preventDefault();
    alert('Please wait 30 seconds before sending another message.');
    return;
  }
  lastSubmitTime = now;
});

// ===== SERVICE MODALS =====
const serviceCards = document.querySelectorAll('.services__card[data-modal]');

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('modal--open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });
});

document.querySelectorAll('[data-close]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) {
      modal.classList.remove('modal--open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal--open').forEach((m) => {
      m.classList.remove('modal--open');
      m.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
});
