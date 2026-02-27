// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.5,
});

// Connect Lenis to GSAP ticker for perfect sync
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ============================================================
// GSAP SCROLLTRIGGER SETUP
// ============================================================
gsap.registerPlugin(ScrollTrigger);

// Let Lenis update ScrollTrigger on scroll
lenis.on('scroll', ScrollTrigger.update);

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgressBar';
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
  background: linear-gradient(to right, #00d4ff, #7c4dff);
  width: 0%; transform-origin: left;
`;
document.body.appendChild(progressBar);

lenis.on('scroll', ({ progress }) => {
  progressBar.style.width = (progress * 100) + '%';
});

// ============================================================
// NAVBAR SCROLL + ACTIVE LINK
// ============================================================
const navbar = document.getElementById('navbar');

function updateNav(scrollY) {
  navbar.classList.toggle('scrolled', scrollY > 50);
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 120) current = section.id;
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

lenis.on('scroll', ({ scroll }) => updateNav(scroll));

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// ============================================================
// SMOOTH ANCHOR SCROLL (via Lenis)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    }
  });
});

// ============================================================
// PARTICLES
// ============================================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const color = Math.random() > 0.5 ? '#00d4ff' : '#7c4dff';
    p.style.cssText = `
      width: ${size}px; height: ${size}px; left: ${x}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + (target > 10 ? '+' : '');
  }, 16);
}

// ============================================================
// HERO ENTRANCE (GSAP — Framer Motion style)
// ============================================================
const heroTl = gsap.timeline({ delay: 0.1 });

heroTl
  .from('.hero-badge', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'
  })
  .from('.hero-title', {
    opacity: 0, y: 50, duration: 0.9, ease: 'power3.out'
  }, '-=0.4')
  .from('.hero-subtitle', {
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-buttons > *', {
    opacity: 0, y: 25, duration: 0.6, stagger: 0.15, ease: 'power2.out'
  }, '-=0.4')
  .from('.hero-stats .stat-item, .hero-stats .stat-divider', {
    opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out'
  }, '-=0.3')
  .from('.brain-container', {
    opacity: 0, scale: 0.8, duration: 1.1, ease: 'back.out(1.4)'
  }, '-=1.1')
  .from('.scroll-indicator', {
    opacity: 0, y: 10, duration: 0.6, ease: 'power2.out'
  }, '-=0.2');

// Counter for hero stats fires after hero animation
heroTl.add(() => {
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    heroStats.querySelectorAll('.stat-number[data-target]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
});

// ============================================================
// SECTION HEADERS (ScrollTrigger)
// ============================================================
document.querySelectorAll('.section-header').forEach(header => {
  const tag = header.querySelector('.section-tag');
  const title = header.querySelector('.section-title');
  const desc = header.querySelector('.section-desc');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: header,
      start: 'top 85%',
      once: true,
    }
  });
  if (tag) tl.from(tag, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' });
  if (title) tl.from(title, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  if (desc) tl.from(desc, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4');
});

// ============================================================
// ABOUT CARDS (staggered slide-up)
// ============================================================
gsap.from('.about-card', {
  scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true },
  opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power3.out'
});

gsap.from('.feature-item', {
  scrollTrigger: { trigger: '.about-features', start: 'top 82%', once: true },
  opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: 'power2.out'
});

// ============================================================
// FOCUS CARDS (scroll reveal with scale)
// ============================================================
gsap.from('.focus-card', {
  scrollTrigger: { trigger: '.focus-grid', start: 'top 80%', once: true },
  opacity: 0, y: 70, scale: 0.93, duration: 0.9, stagger: 0.18, ease: 'back.out(1.2)'
});

// ============================================================
// EVENTS TIMELINE (slide from left)
// ============================================================
document.querySelectorAll('.event-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: 'top 85%', once: true },
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    duration: 0.8,
    ease: 'power3.out',
    delay: i * 0.1,
  });
});

// ============================================================
// PROJECTS / GITHUB SECTION
// ============================================================
gsap.from('.github-card', {
  scrollTrigger: { trigger: '.github-showcase', start: 'top 82%', once: true },
  opacity: 0, y: 50, duration: 0.9, ease: 'power3.out'
});

// ============================================================
// CONTACT SECTION
// ============================================================
gsap.from('.contact-item', {
  scrollTrigger: { trigger: '.contact-info', start: 'top 82%', once: true },
  opacity: 0, x: -30, duration: 0.7, stagger: 0.15, ease: 'power2.out'
});
gsap.from('.social-btn', {
  scrollTrigger: { trigger: '.social-grid', start: 'top 85%', once: true },
  opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)'
});
gsap.from('.contact-form-wrap', {
  scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 82%', once: true },
  opacity: 0, x: 60, duration: 0.9, ease: 'power3.out'
});

// ============================================================
// FOOTER
// ============================================================
gsap.from('.footer-brand, .footer-col', {
  scrollTrigger: { trigger: '.footer-top', start: 'top 90%', once: true },
  opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power2.out'
});

// ============================================================
// PARALLAX ON HERO BRAIN IMAGE (Lenis-based)
// ============================================================
lenis.on('scroll', ({ scroll }) => {
  const brainImg = document.querySelector('.brain-img');
  if (brainImg && scroll < window.innerHeight * 1.5) {
    brainImg.style.transform = `translateY(${scroll * 0.06}px)`;
  }
});

// ============================================================
// CURSOR GLOW (desktop only)
// ============================================================
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0; transform: translate(-50%, -50%);
    transition: opacity 0.3s ease; top: -300px; left: -300px;
  `;
  document.body.appendChild(glow);

  let mouseX = -300, mouseY = -300;
  let glowX = -300, glowY = -300;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow with lerp
  function lerpCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();
}

// ============================================================
// TILT EFFECT ON FOCUS CARDS
// ============================================================
document.querySelectorAll('.focus-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((y - rect.height / 2) / rect.height) * 12;
    const tiltY = ((rect.width / 2 - x) / rect.width) * 12;
    gsap.to(card, {
      rotateX: tiltX, rotateY: tiltY,
      transformPerspective: 800,
      y: -8, duration: 0.3, ease: 'power2.out'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0, rotateY: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)'
    });
  });
});

// ============================================================
// CONTACT FORM (Web3Forms)
// ============================================================
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

// ============================================================
// INITIAL PAGE FADE-IN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  gsap.from('body', { opacity: 0, duration: 0.8, ease: 'power2.out' });
});
