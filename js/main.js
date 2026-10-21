// ===== LOADING SKELETON =====
window.addEventListener('load', () => {
  const skeletonLoader = document.getElementById('skeletonLoader');
  if (!skeletonLoader) return;

  // Hide skeleton immediately when fonts are ready, or after max 3 seconds
  const hideLoader = () => {
    if (skeletonLoader && !skeletonLoader.classList.contains('hidden')) {
      skeletonLoader.classList.add('hidden');
    }
  };

  // Check if fonts are ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(hideLoader);
  } else {
    hideLoader();
  }

  // Failsafe: hide after 3 seconds maximum
  setTimeout(hideLoader, 3000);
});

// ===== CHECK FOR REDUCED MOTION PREFERENCE =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== MOBILE MENU TOGGLE (OPTIMIZED) =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidenav = document.getElementById('sidenav');

if (mobileMenuToggle && sidenav) {
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = sidenav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking on a link (immediate response)
  document.querySelectorAll('.sidenav__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        sidenav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidenav.classList.contains('active')) {
      sidenav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.focus();
    }
  });

  // Close menu when clicking outside (throttled)
  let clickTimeout;
  document.addEventListener('click', (e) => {
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
      if (!sidenav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidenav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    }, 50);
  });
}

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidenav__link');

function highlightNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== BUILD EMAIL AT RUNTIME (SPAM PROTECTION) =====
(function buildEmail() {
  const user = 'andreinaig00912';
  const domain = 'gmail';
  const tld = 'com';
  const email = `${user}@${domain}.${tld}`;
  
  // Update contact info link
  const emailLink = document.getElementById('emailLink');
  if (emailLink) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
  }
  
  // Update error message
  const formErrorText = document.getElementById('formErrorText');
  if (formErrorText) {
    formErrorText.innerHTML = `Couldn't send. Please email me directly at <a href="mailto:${email}">${email}</a>.`;
  }
})();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const formErrorText = document.getElementById('formErrorText');

if (contactForm && formSuccess && formError) {
  const cooldownKey = 'formCooldown';
  const cooldownMs = 30000;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check honeypot (silent block with fake success)
    const honeypot = contactForm.querySelector('[name="honeypot"]');
    if (honeypot && honeypot.value) {
      // Bot detected — show fake success and do nothing
      formSuccess.style.display = 'flex';
      formError.style.display = 'none';
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
      return;
    }

    // Check cooldown from localStorage
    const lastSubmit = localStorage.getItem(cooldownKey);
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit) < cooldownMs) {
      const remainingSeconds = Math.ceil((cooldownMs - (now - parseInt(lastSubmit))) / 1000);
      formErrorText.textContent = `Please wait ${remainingSeconds} seconds before sending another message.`;
      formError.style.display = 'flex';
      formSuccess.style.display = 'none';
      setTimeout(() => {
        formError.style.display = 'none';
      }, 3000);
      return;
    }

    const submitBtn = contactForm.querySelector('.contact__submit');
    const originalText = submitBtn.innerHTML;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg class="icon spin" aria-hidden="true"><use href="#icon-spinner"></use></svg> Sending…';

    // Hide previous messages
    formSuccess.style.display = 'none';
    formError.style.display = 'none';

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (response.ok) {
        formSuccess.style.display = 'flex';
        formError.style.display = 'none';
        contactForm.reset();
        localStorage.setItem(cooldownKey, now.toString());
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      } else {
        // Error message already built at runtime
        formError.style.display = 'flex';
        formSuccess.style.display = 'none';
      }
    }).catch(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      // Error message already built at runtime
      formError.style.display = 'flex';
      formSuccess.style.display = 'none';
    });
  });
}

// ===== TYPEWRITER EFFECT =====
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement && !prefersReducedMotion) {
  const phrases = ['Junior .NET Developer', 'Junior Software Developer', 'C# & SQL Server Developer'];
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
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.section__title, .section__subtitle, .about__grid, .portfolio__card, .resume__item, .contact__grid, .hero__content, .hero__image, .services__card'
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

// ===== MAGNETIC BUTTONS (OPTIMIZED) =====
if (!prefersReducedMotion) {
  document.querySelectorAll('.btn--magnetic').forEach((btn) => {
    let magneticTicking = false;

    btn.addEventListener('mousemove', (e) => {
      if (!magneticTicking) {
        window.requestAnimationFrame(() => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
          magneticTicking = false;
        });
        magneticTicking = true;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== 3D TILT ON PROFILE PHOTO (OPTIMIZED) =====
const avatar = document.querySelector('.hero__avatar');
if (avatar && !prefersReducedMotion) {
  let tiltTicking = false;

  avatar.addEventListener('mousemove', (e) => {
    if (!tiltTicking) {
      window.requestAnimationFrame(() => {
        const rect = avatar.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        avatar.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
        tiltTicking = false;
      });
      tiltTicking = true;
    }
  });

  avatar.addEventListener('mouseleave', () => {
    avatar.style.transform = 'rotateY(0) rotateX(0) scale(1)';
  });
}

// ===== FLOATING PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer && !prefersReducedMotion) {
  let particleInterval;

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

  function startParticles() {
    if (!particleInterval) {
      particleInterval = setInterval(createParticle, 1500);
    }
  }

  function stopParticles() {
    if (particleInterval) {
      clearInterval(particleInterval);
      particleInterval = null;
    }
  }

  // Start particles initially
  startParticles();

  // Restart particles when page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopParticles();
    } else {
      startParticles();
    }
  });
}

// ===== DYNAMIC GREETING =====
const greetingEl = document.getElementById('heroGreeting');
if (greetingEl) {
  const hour = new Date().getHours();
  let greeting = 'Hello';

  if (hour >= 5 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  greetingEl.textContent = greeting + ", I'm";
}

// ===== LAZY LOAD BLUR EFFECT =====
// SVG <image> doesn't reliably fire load events — use a JS Image to detect load
(function() {
  const svgImage = document.querySelector('.hero__avatar-img--lazy');
  if (!svgImage) return;
  const loader = new Image();
  loader.onload = () => svgImage.classList.replace('hero__avatar-img--lazy', 'hero__avatar-img--loaded');
  loader.src = svgImage.getAttribute('href') || 'img/ProfileP.png';
  // If already cached, fire immediately
  if (loader.complete) svgImage.classList.replace('hero__avatar-img--lazy', 'hero__avatar-img--loaded');
})();

// ===== INJECT ACCESS KEY =====
const formAccessKey = document.getElementById('formAccessKey');
if (formAccessKey) {
  formAccessKey.value = 'sf_0c6af9c04ad1f1f82f54d0ff';
}

// ===== SERVICE MODALS =====
const serviceCards = document.querySelectorAll('.services__card[data-modal]');
const mainContent = document.getElementById('main');

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      // Store the element that opened the modal
      modal.dataset.returnFocus = card.tagName;

      modal.classList.add('modal--open');
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';

      // Set inert on main content
      if (mainContent && 'inert' in HTMLElement.prototype) {
        mainContent.inert = true;
      }

      // Move focus to modal
      const closeBtn = modal.querySelector('[data-close]');
      if (closeBtn) {
        closeBtn.focus();
      }

      // Trap focus within modal
      trapFocus(modal);
    }
  });
});

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Remove any existing trap listener
  if (element.trapFocusHandler) {
    element.removeEventListener('keydown', element.trapFocusHandler);
  }

  // Create and store new handler
  element.trapFocusHandler = function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  };

  element.addEventListener('keydown', element.trapFocusHandler);
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove('modal--open');
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  document.body.style.overflow = '';

  // Remove inert from main content
  if (mainContent && 'inert' in HTMLElement.prototype) {
    mainContent.inert = false;
  }

  // Return focus to the element that opened the modal
  const returnFocusTo = modal.dataset.returnFocus;
  if (returnFocusTo) {
    const card = Array.from(serviceCards).find(c => c.getAttribute('data-modal') === modal.id);
    if (card) {
      card.focus();
    }
  }
}

document.querySelectorAll('[data-close]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    closeModal(modal);
  });
});

// Close modal on Escape and overlay click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal--open');
    if (openModal) {
      closeModal(openModal);
    }
  }
});

document.querySelectorAll('.modal__overlay').forEach((overlay) => {
  overlay.addEventListener('click', () => {
    const modal = overlay.closest('.modal');
    closeModal(modal);
  });
});

// ===== LENIS SMOOTH SCROLL =====
let lenis = null;

if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
  lenis = new Lenis({
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    lerp: 0.12,
    infinite: false,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ===== PORTFOLIO FLIP CARD ACCESSIBILITY =====
document.querySelectorAll('.portfolio__card--flip').forEach((card) => {
  // Keyboard interaction
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('is-flipped');
    }
  });

  // Touch interaction for mobile
  card.addEventListener('click', (e) => {
    // Only toggle if not clicking on a link inside
    if (!e.target.closest('a')) {
      card.classList.toggle('is-flipped');
    }
  });
});

// Handle anchor navigation with immediate response and URL hash update
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    // Update URL hash
    if (history.pushState) {
      history.pushState(null, null, targetId);
    } else {
      window.location.hash = targetId;
    }

    // Immediate feedback
    anchor.style.pointerEvents = 'none';
    setTimeout(() => {
      anchor.style.pointerEvents = '';
    }, 800);

    // Scroll with Lenis if available, otherwise use native
    if (lenis) {
      lenis.scrollTo(target, { offset: -20, duration: 0.6, immediate: false });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Handle hash on page load
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(target, { offset: -20, duration: 0.6 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Increased delay to ensure Lenis is fully initialized
    }
  }
});

// ===== CONSOLIDATED SCROLL HANDLER (OPTIMIZED) =====
const backToTopEl = document.getElementById('backToTop');
const scrollProgressEl = document.getElementById('scrollProgress');

let scrollTicking = false;

function handleScroll(scroll) {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const scrollY = scroll !== undefined ? scroll : window.scrollY;

      // Back-to-top button
      if (backToTopEl) {
        if (scrollY > 400) {
          backToTopEl.classList.add('back-to-top--visible');
        } else {
          backToTopEl.classList.remove('back-to-top--visible');
        }
      }

      // Scroll progress bar
      if (scrollProgressEl) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgressEl.style.width = (scrollY / docHeight) * 100 + '%';
      }

      // Active nav link
      highlightNavLink();

      scrollTicking = false;
    });

    scrollTicking = true;
  }
}

// Use Lenis scroll event if available, otherwise native scroll
if (lenis) {
  lenis.on('scroll', ({ scroll }) => {
    handleScroll(scroll);
  });
} else {
  window.addEventListener('scroll', () => {
    handleScroll();
  }, { passive: true });
}

// ===== CURSOR MAGNET ON LINKS (OPTIMIZED) =====
const magneticElements = document.querySelectorAll(
  '.hero__social-link, .contact__social-link, .portfolio__link, .sidenav__social-link'
);

if (!prefersReducedMotion) {
  magneticElements.forEach((el) => {
    el.classList.add('link-magnetic');
    let linkTicking = false;

    el.addEventListener('mousemove', (e) => {
      if (!linkTicking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
          linkTicking = false;
        });
        linkTicking = true;
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

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
  img.src = 'img/bg.jpg';
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

// Expose lenis for any scripts that need it
if (lenis) {
  window.lenis = lenis;
}

// ===== INITIAL HIGHLIGHT =====
setTimeout(() => {
  highlightNavLink();
}, 100);

