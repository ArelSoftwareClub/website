// ============================================================
// UTILS
// ============================================================
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ============================================================
// CANVAS PARTICLE NETWORK BACKGROUND
// ============================================================
(function initCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bgCanvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');

  const COLORS = ['#00d4ff', '#7c4dff', '#e040fb'];
  const COUNT = window.innerWidth < 768 ? 50 : 90;
  const RANGE = 150;
  let W, H, nodes = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', debounce(resize, 300));

  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }

  (function draw() {
    ctx.clearRect(0, 0, W, H);

    // update
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < RANGE) {
          ctx.beginPath();
          ctx.strokeStyle = nodes[i].color;
          ctx.globalAlpha = (1 - d / RANGE) * 0.45;
          ctx.lineWidth = 0.7;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // dots
    ctx.globalAlpha = 0.75;
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  })();
})();

// ============================================================
// DOT-GRID OVERLAY
// ============================================================
(function addGridOverlay() {
  const grid = document.createElement('div');
  grid.id = 'gridOverlay';
  document.body.insertBefore(grid, document.body.firstChild);
})();

// ============================================================
// FLOATING CODE SNIPPETS IN HERO
// ============================================================
(function addCodeDecorations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const snippets = [
    { text: 'import { AI } from "arel";\nconst model = new AI();\nawait model.train(data);', top: '15%', left: '2%', cls: '', delay: '0s', duration: '22s' },
    { text: 'def hackathon():\n    ideas = generate()\n    return build(ideas)', top: '55%', left: '0%', cls: 'green', delay: '5s', duration: '26s' },
    { text: 'git commit -m "Ship it 🚀"\ngit push origin main', top: '20%', right: '2%', cls: 'purple', delay: '8s', duration: '20s' },
    { text: 'SELECT * FROM members\nWHERE active = TRUE\nORDER BY skill DESC;', top: '60%', right: '1%', cls: '', delay: '3s', duration: '24s' },
  ];

  snippets.forEach(s => {
    const el = document.createElement('div');
    el.className = `code-deco ${s.cls}`;
    el.textContent = s.text;
    el.style.top = s.top || 'auto';
    el.style.left = s.left || 'auto';
    if (s.right) el.style.right = s.right;
    el.style.animationDelay = s.delay;
    el.style.animationDuration = s.duration;
    hero.appendChild(el);
  });
})();

// ============================================================
// TERMINAL CARD STYLE ON ABOUT CARDS
// ============================================================
document.querySelectorAll('.about-card').forEach(card => {
  card.classList.add('terminal-card');
});



// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
function showToast(message, type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      display: flex; flex-direction: column; gap: 10px; pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const palette = {
    success: { bg: 'rgba(0,230,118,0.12)', border: 'rgba(0,230,118,0.4)', icon: '✓', color: '#00e676' },
    error: { bg: 'rgba(255,82,82,0.12)', border: 'rgba(255,82,82,0.4)', icon: '✗', color: '#ff5252' },
    info: { bg: 'rgba(0,212,255,0.12)', border: 'rgba(0,212,255,0.4)', icon: 'ℹ', color: '#00d4ff' },
  };
  const c = palette[type] || palette.info;

  const toast = document.createElement('div');
  toast.style.cssText = `
    display: flex; align-items: center; gap: 12px;
    padding: 14px 20px; border-radius: 12px;
    background: ${c.bg}; border: 1px solid ${c.border};
    backdrop-filter: blur(16px); color: #f0f4ff;
    font-size: 14px; font-weight: 500; font-family: 'Inter', sans-serif;
    pointer-events: auto; cursor: pointer;
    transform: translateX(130%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 340px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  `;
  toast.innerHTML = `
    <span style="font-size:18px;color:${c.color};flex-shrink:0">${c.icon}</span>
    <span style="flex:1">${message}</span>
    <span style="font-size:16px;color:#4a5568;margin-left:4px">×</span>
  `;
  container.appendChild(toast);
  toast.addEventListener('click', () => removeToast(toast));

  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  }));
  toast._timer = setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  clearTimeout(toast._timer);
  toast.style.transform = 'translateX(130%)';
  setTimeout(() => toast.remove(), 400);
}

// ============================================================
// NAVBAR — HIDE ON SCROLL DOWN, REVEAL ON SCROLL UP
// ============================================================
const navbar = document.getElementById('navbar');
let lastScrollY = 0;
let isNavHidden = false;

function handleScroll() {
  const scrollY = window.scrollY;

  // scrolled class for glass effect
  navbar.classList.toggle('scrolled', scrollY > 50);

  // Hide/show behavior beyond 300px
  if (scrollY > 300) {
    if (scrollY > lastScrollY && !isNavHidden) {
      navbar.style.transform = 'translateY(-100%)';
      isNavHidden = true;
    } else if (scrollY < lastScrollY && isNavHidden) {
      navbar.style.transform = 'translateY(0)';
      isNavHidden = false;
    }
  } else {
    navbar.style.transform = 'translateY(0)';
    isNavHidden = false;
  }

  lastScrollY = scrollY;
  updateActiveNav(scrollY);

  // Back to top visibility
  if (backToTop) {
    const show = scrollY > 400;
    backToTop.style.opacity = show ? '1' : '0';
    backToTop.style.transform = show ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)';
    backToTop.style.pointerEvents = show ? 'auto' : 'none';
  }

  // Progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = (scrollY / docHeight * 100) + '%';
}

window.addEventListener('scroll', debounce(handleScroll, 8), { passive: true });

// ============================================================
// ACTIVE NAV LINK (IntersectionObserver — precision)
// ============================================================
function updateActiveNav(scrollY = window.scrollY) {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 140) current = s.id; });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '1';
  spans[2].style.transform = '';
}

function openMenu() {
  navLinks.classList.add('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.opacity = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));

// Close on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
  // Home key = scroll to top
  if (e.key === 'Home' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Close on scroll (mobile)
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768 && navLinks.classList.contains('open')) closeMenu();
}, { passive: true });

// Close on resize to desktop
window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 768) closeMenu();
}, 200));

// ============================================================
// SMOOTH ANCHOR SCROLL (native)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ============================================================
// PARTICLES
// ============================================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width: ${size}px; height: ${size}px; left: ${Math.random() * 100}%;
      background: ${Math.random() > 0.5 ? '#00d4ff' : '#7c4dff'};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: -${Math.random() * 15}s;
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
// INTERSECTION OBSERVER — FADE UP
// ============================================================
const fadeUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeUpObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Individual IDs
const fadeIds = ['ac1', 'ac2', 'ac3', 'fi1', 'fi2', 'fi3', 'fi4',
  'fc1', 'fc2', 'fc3', 'ev1', 'ev2', 'ev3', 'ev4',
  'gh1', 'ci1', 'ci2'];
fadeIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.classList.add('fade-up'); fadeUpObserver.observe(el); }
});

// Stagger grid children (about, focus, social, team)
document.querySelectorAll('.about-grid, .focus-grid, .about-features, .social-grid, .team-grid').forEach(grid => {
  Array.from(grid.children).forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    card.classList.add('fade-up');
    fadeUpObserver.observe(card);
  });
});

// Hero stats counter
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.createElement('div');
progressBar.id = 'progressBar';
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
  background: linear-gradient(to right, #00d4ff, #7c4dff);
  width: 0%; transform-origin: left; pointer-events: none;
`;
document.body.appendChild(progressBar);

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.setAttribute('aria-label', 'En üste çık');
backToTop.title = 'En üste çık';
backToTop.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:20px;height:20px"><path d="M18 15l-6-6-6 6"/></svg>`;
backToTop.style.cssText = `
  position: fixed; bottom: 32px; right: 32px; z-index: 1000;
  width: 48px; height: 48px; border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #7c4dff);
  border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: white; box-shadow: 0 4px 20px rgba(0,212,255,0.35);
  opacity: 0; transform: translateY(16px) scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  pointer-events: none;
`;
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
backToTop.addEventListener('mouseenter', () => {
  backToTop.style.transform = 'translateY(-3px) scale(1.08)';
  backToTop.style.boxShadow = '0 8px 30px rgba(0,212,255,0.5)';
});
backToTop.addEventListener('mouseleave', () => {
  backToTop.style.transform = 'translateY(0) scale(1)';
  backToTop.style.boxShadow = '0 4px 20px rgba(0,212,255,0.35)';
});

// ============================================================
// TYPEWRITER EFFECT ON HERO BADGE
// ============================================================
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
  // Find the text node (after the span)
  let textNode = null;
  heroBadge.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) textNode = node;
  });

  if (textNode) {
    const words = ['İstanbul Arel Üniversitesi', 'Yazılım Kulübü', '197+ Aktif Üye', 'Fikirden Ürüne'];
    let wordIdx = 0, charIdx = words[0].length, isDeleting = false;

    function typeWriter() {
      const word = words[wordIdx];
      if (isDeleting) charIdx--;
      else charIdx++;
      textNode.textContent = ' ' + word.substring(0, charIdx);

      let delay = isDeleting ? 45 : 85;
      if (!isDeleting && charIdx === word.length) { delay = 2500; isDeleting = true; }
      else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 500;
      }
      setTimeout(typeWriter, delay);
    }
    // Start after hero page loads
    setTimeout(typeWriter, 2500);
  }
}

// ============================================================
// CONTACT FORM — Web3Forms + Real-time Validation
// ============================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {

  // ── Real-time email validation
  const emailInput = document.getElementById('email');
  if (emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function validateEmail() {
      const valid = emailRegex.test(emailInput.value);
      emailInput.style.borderColor = emailInput.value && !valid ? '#ff5252' : '';
      emailInput.style.boxShadow = emailInput.value && !valid
        ? '0 0 0 2px rgba(255,82,82,0.2)' : '';
    }
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      emailInput.style.borderColor = '';
      emailInput.style.boxShadow = '';
    });
  }

  // ── Character counter on message textarea
  const textarea = document.getElementById('message');
  if (textarea) {
    const MAX = 500;
    const counter = document.createElement('span');
    counter.style.cssText = `
      font-size: 11px; color: var(--text-muted);
      text-align: right; display: block; margin-top: 4px;
      transition: color 0.2s ease;
    `;
    counter.textContent = `0 / ${MAX}`;
    textarea.parentNode.appendChild(counter);
    textarea.setAttribute('maxlength', MAX);
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / ${MAX}`;
      counter.style.color = len > MAX * 0.85 ? '#ff5252' : '';
    });
  }

  // ── Form submit
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>Gönderiliyor...</span>';
    btn.disabled = true;

    const formData = new FormData(contactForm);
    formData.append('access_key', '8b1e068f-195d-474f-98ea-4aab75767259');

    const subjectMap = {
      uyelik: 'Üyelik Başvurusu', etkinlik: 'Etkinlik Bilgisi',
      proje: 'Proje İşbirliği', diger: 'Diğer',
    };
    const rawSubject = formData.get('subject');
    formData.set('subject', `[Arel Yazılım] ${subjectMap[rawSubject] || rawSubject || 'İletişim Formu'}`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        btn.innerHTML = '<span>Gönderildi! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #00e676, #00bcd4)';
        showToast('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız. 🎉', 'success', 5000);
        contactForm.reset();
        setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; btn.disabled = false; }, 4000);
      } else {
        throw new Error(data.message || 'Hata');
      }
    } catch (err) {
      console.error('Form hatası:', err);
      showToast('Mesaj gönderilemedi. Lütfen tekrar deneyin.', 'error');
      btn.innerHTML = '<span>Hata! Tekrar dene ✗</span>';
      btn.style.background = 'linear-gradient(135deg, #ff5252, #ff1744)';
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; }, 3000);
    }
  });
}

// ============================================================
// COPY EMAIL TO CLIPBOARD
// ============================================================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.style.cursor = 'copy';
  link.title = 'Kopyalamak için tıkla';
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = link.href.replace('mailto:', '');
    navigator.clipboard?.writeText(email).then(() => {
      showToast(`📋 ${email} panoya kopyalandı!`, 'info', 2500);
    }).catch(() => { window.location.href = link.href; });
  });
});

// ============================================================
// PARALLAX ON HERO BRAIN IMAGE
// ============================================================
const brainImg = document.querySelector('.brain-img');
window.addEventListener('scroll', () => {
  if (brainImg && window.scrollY < window.innerHeight * 1.2) {
    brainImg.style.transform = `translateY(${window.scrollY * 0.05}px)`;
  }
}, { passive: true });

// ============================================================
// CURSOR GLOW (desktop only)
// ============================================================
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    transform: translate(-50%, -50%);
    top: -300px; left: -300px;
  `;
  document.body.appendChild(glow);

  let mx = -300, my = -300, gx = -300, gy = -300;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  (function lerpCursor() {
    gx += (mx - gx) * 0.07;
    gy += (my - gy) * 0.07;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(lerpCursor);
  })();
}

// ============================================================
// 3D TILT ON FOCUS CARDS
// ============================================================
document.querySelectorAll('.focus-card').forEach(card => {
  card.style.transformStyle = 'preserve-3d';
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const tiltX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 12;
    const tiltY = ((rect.width / 2 - (e.clientX - rect.left)) / rect.width) * 12;
    card.style.transform = `perspective(800px) translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.transition = 'transform 0.15s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
});

// ============================================================
// AUTO-UPDATE COPYRIGHT YEAR
// ============================================================
document.querySelectorAll('.footer-bottom p').forEach(p => {
  p.innerHTML = p.innerHTML.replace(/© \d{4}/, `© ${new Date().getFullYear()}`);
});

// ============================================================
// INITIAL PAGE FADE-IN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '1';
  }, 50);
});
