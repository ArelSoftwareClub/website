// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const color = Math.random() > 0.5 ? '#00d4ff' : '#7c4dff';
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + (target > 10 ? '+' : '');
  }, 16);
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

// Fade-up elements observer
const fadeUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeUpObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Counter observer (only for hero stats)
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number[data-target]');
      numbers.forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Register all fade-up elements
const fadeIds = ['ac1', 'ac2', 'ac3', 'fi1', 'fi2', 'fi3', 'fi4', 'fc1', 'fc2', 'fc3',
  'ev1', 'ev2', 'ev3', 'ev4', 'gh1', 'ci1', 'ci2', 'tm1', 'tm2', 'tm3', 'tm4'];
fadeIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.classList.add('fade-up'); fadeUpObserver.observe(el); }
});

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ===== CARD STAGGER =====
document.querySelectorAll('.about-grid, .focus-grid, .about-features, .social-grid').forEach(grid => {
  const cards = grid.children;
  Array.from(cards).forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    card.classList.add('fade-up');
    fadeUpObserver.observe(card);
  });
});

// ===== CONTACT FORM (Web3Forms) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Gönderiliyor...</span>';
    btn.disabled = true;

    const formData = new FormData(contactForm);
    formData.append('access_key', '8b1e068f-195d-474f-98ea-4aab75767259');

    const subjectMap = {
      uyelik: 'Üyelik Başvurusu',
      etkinlik: 'Etkinlik Bilgisi',
      proje: 'Proje İşbirliği',
      diger: 'Diğer',
    };
    const rawSubject = formData.get('subject');
    formData.set('subject', `[Arel Yazılım] ${subjectMap[rawSubject] || rawSubject || 'İletişim Formu'}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        btn.innerHTML = '<span>Mesaj Gönderildi! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #00e676, #00bcd4)';
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error(data.message || 'Gönderme başarısız');
      }
    } catch (err) {
      console.error('Form hatası:', err);
      btn.innerHTML = '<span>Hata! Tekrar dene ✗</span>';
      btn.style.background = 'linear-gradient(135deg, #ff5252, #ff1744)';
      btn.disabled = false;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
      }, 3000);
    }
  });
}

// ===== SMOOTH PARALLAX ON HERO =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const brainImg = document.querySelector('.brain-img');
  if (brainImg && scrolled < window.innerHeight) {
    brainImg.style.transform = `translateY(${scrolled * 0.05}px)`;
  }
}, { passive: true });

// ===== CURSOR GLOW (desktop only) =====
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0; transform: translate(-50%, -50%);
    transition: opacity 0.3s ease; top: -200px; left: -200px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.top = e.clientY + 'px';
    glow.style.left = e.clientX + 'px';
  });
}

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.focus-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== TYPING EFFECT ON LOGO =====
const techWords = ['Yazılım', 'Software', 'Teknoloji', 'Innovation', 'Hackathon'];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const logoAccent = document.querySelector('.hero-title .gradient-text');
// (Keep static title for readability, so no typing effect on hero title)

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
  background: linear-gradient(to right, #00d4ff, #7c4dff);
  width: 0%; transition: width 0.05s linear;
`;
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
}, { passive: true });

// ===== INITIAL LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '1';
  }, 100);
});
