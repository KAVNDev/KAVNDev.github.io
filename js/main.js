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

// (scroll handled by consolidated Lenis listener)

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

// Navbar scroll + Back to top handled by consolidated Lenis listener below

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

// ===== CURSOR SPOTLIGHT (rAF throttled + passive) =====
const spotlight = document.getElementById('cursorSpotlight');
let spotlightRafPending = false;
let spotlightMouseX = 0;
let spotlightMouseY = 0;

document.addEventListener('mousemove', (e) => {
  spotlightMouseX = e.clientX;
  spotlightMouseY = e.clientY;
  if (spotlightRafPending) return;
  spotlightRafPending = true;
  requestAnimationFrame(() => {
    spotlight.style.left = spotlightMouseX + 'px';
    spotlight.style.top = spotlightMouseY + 'px';
    spotlight.classList.add('cursor-spotlight--active');
    spotlightRafPending = false;
  });
}, { passive: true });

document.addEventListener('mouseleave', () => {
  spotlight.classList.remove('cursor-spotlight--active');
}, { passive: true });

// Scroll progress handled by consolidated Lenis listener

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

setInterval(createParticle, 1500);

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

// ===== LENIS SMOOTH SCROLL (with momentum) =====
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Handle anchor navigation via Lenis
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -70, duration: 1.5 });
  });
});

// ===== CONSOLIDATED SCROLL HANDLER (via Lenis for perf) =====
const heroAvatarEl = document.querySelector('.hero__avatar');
const codeDeco = document.querySelector('.hero__code-decoration');
const navbarEl = document.getElementById('navbar');
const backToTopEl = document.getElementById('backToTop');
const scrollProgressEl = document.getElementById('scrollProgress');
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.navbar__link');

lenis.on('scroll', ({ scroll }) => {
  // Parallax
  if (heroAvatarEl && scroll < window.innerHeight) {
    heroAvatarEl.style.transform = `translateY(${scroll * 0.15}px)`;
  }
  if (codeDeco && scroll < window.innerHeight) {
    codeDeco.style.transform = `translateY(${scroll * -0.3}px)`;
  }

  // Navbar background
  if (scroll > 50) {
    navbarEl.classList.add('navbar--scrolled');
  } else {
    navbarEl.classList.remove('navbar--scrolled');
  }

  // Back-to-top button
  if (scroll > 400) {
    backToTopEl.classList.add('back-to-top--visible');
  } else {
    backToTopEl.classList.remove('back-to-top--visible');
  }

  // Scroll progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgressEl.style.width = (scroll / docHeight) * 100 + '%';

  // Active nav link
  const scrollY = scroll + 100;
  allSections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      allNavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) link.classList.add('active');
      });
    }
  });
});

// ===== CURSOR MAGNET ON LINKS =====
const magneticElements = document.querySelectorAll(
  '.hero__social-link, .contact__social-link, .navbar__link, .portfolio__link'
);

magneticElements.forEach((el) => {
  el.classList.add('link-magnetic');
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// ===== RIPPLE EFFECT ON BUTTONS =====
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('btn__ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== LAZY LOAD BACKGROUND IMAGE =====
(function preloadBgImage() {
  const img = new Image();
  img.src = 'https://images.pexels.com/photos/986774/pexels-photo-986774.jpeg?auto=compress&cs=tinysrgb&w=1920';
  img.onload = () => {
    const bg = document.getElementById('bgImage');
    if (bg) bg.classList.add('bg-image--loaded');
  };
})();

// ===== PAUSE OFFSCREEN SECTIONS =====
const offscreenObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('section--offscreen');
      } else {
        entry.target.classList.add('section--offscreen');
      }
    });
  },
  { rootMargin: '200px' }
);
document.querySelectorAll('section').forEach((s) => offscreenObserver.observe(s));

// Expose lenis for keyboard nav
if (typeof lenis !== 'undefined') window.lenis = lenis;

// ===== CUSTOM CURSOR =====
(function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let cursorX = 0;
  let cursorY = 0;
  let cursorRafPending = false;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (cursorRafPending) return;
    cursorRafPending = true;
    requestAnimationFrame(() => {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorRafPending = false;
    });
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursor.classList.add('cursor--hidden');
  }, { passive: true });

  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('cursor--hidden');
  }, { passive: true });

  const hoverSelector = 'a, button, .btn, .services__card, .portfolio__card, .resume__item, input, textarea, .hero__avatar';
  document.querySelectorAll(hoverSelector).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
})();

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;

  const sectionIds = ['home', 'services', 'about', 'portfolio', 'resume', 'contact'];
  const currentScroll = window.scrollY + 100;
  let currentIndex = 0;

  sectionIds.forEach((id, i) => {
    const section = document.getElementById(id);
    if (section && currentScroll >= section.offsetTop) currentIndex = i;
  });

  let nextIndex = currentIndex;
  let handled = true;

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    nextIndex = Math.min(currentIndex + 1, sectionIds.length - 1);
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    nextIndex = Math.max(currentIndex - 1, 0);
  } else if (e.key === 'Home') {
    nextIndex = 0;
  } else if (e.key === 'End') {
    nextIndex = sectionIds.length - 1;
  } else {
    handled = false;
  }

  if (!handled) return;
  e.preventDefault();

  const target = document.getElementById(sectionIds[nextIndex]);
  if (target && window.lenis) {
    window.lenis.scrollTo(target, { offset: -70, duration: 1.2 });
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// ===== SILVER DUST TRAIL =====
(function initDustTrail() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let lastDustTime = 0;
  const DUST_INTERVAL = 30;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastDustTime < DUST_INTERVAL) return;
    lastDustTime = now;

    const dust = document.createElement('div');
    dust.className = 'dust';

    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    dust.style.left = (e.clientX + offsetX) + 'px';
    dust.style.top = (e.clientY + offsetY) + 'px';

    const driftX = (Math.random() - 0.5) * 30 - 50;
    const driftY = (Math.random() - 0.5) * 30 - 50;
    dust.style.setProperty('--dust-x', driftX + 'px');
    dust.style.setProperty('--dust-y', driftY + 'px');

    const size = Math.random() * 2 + 2;
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';

    document.body.appendChild(dust);
    setTimeout(() => dust.remove(), 1000);
  }, { passive: true });
})();
