// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 1px 0 #2e2e2e';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activateNav = () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', activateNav);

// ===== TYPING ANIMATION =====
const typedTextEl = document.querySelector('.typed-text');
const phrases = ["a Developer", "a Problem Solver", "a Builder", "a CS Student"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 55;
  } else {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at end of word before deleting
    typingDelay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingDelay = 400;
  }

  setTimeout(typeEffect, typingDelay);
}

// Start typing after a short delay on page load
setTimeout(typeEffect, 600);

// ===== FADE-IN ANIMATION ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-section');
  observer.observe(section);
});

// Inject fade animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-section {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .fade-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
