/* ============================================================
   AREL YAZILIM KULÜBÜ — Enhanced Script v2.0
   Features: Toast, Parallax, Tilt, Typewriter, SW, Form Validation,
             Stagger, Scroll-Spy, Page Transitions, Keyboard Shortcuts,
             Copy-to-Clipboard, Scroll Depth, Lazy Images, Network Status
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   UTILITIES
────────────────────────────────────────────── */
function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

function throttle(fn, limit) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) { last = now; return fn(...args); }
  };
}

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

/* ──────────────────────────────────────────────
   TOAST NOTIFICATION SYSTEM
   Usage: Toast.show('message', 'success'|'error'|'warning'|'info', duration_ms)
   duration=0 → persistent until manually closed
────────────────────────────────────────────── */
const Toast = (() => {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'false');
      document.body.appendChild(container);
    }
    return container;
  }

  function show(message, type = 'info', duration = 3500) {
    const c = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');

    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
      <span class="toast-msg">${message}</span>
      <button class="toast-close" aria-label="Bildirimi kapat">×</button>
    `;
    c.appendChild(toast);

    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('toast-in')));

    const dismiss = () => {
      toast.classList.remove('toast-in');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    };

    const timer = duration > 0 ? setTimeout(dismiss, duration) : null;
    toast.querySelector('.toast-close').addEventListener('click', () => {
      if (timer) clearTimeout(timer);
      dismiss();
    });

    return { dismiss };
  }

  return { show };
})();

/* ──────────────────────────────────────────────
   SCROLL PROGRESS BAR
────────────────────────────────────────────── */
(function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const update = throttle(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
  }, 16);
  window.addEventListener('scroll', update, { passive: true });
})();

/* ──────────────────────────────────────────────
   NAVBAR SCROLL SHADOW
────────────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = throttle(() => nav.classList.toggle('scrolled', window.scrollY > 20), 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ──────────────────────────────────────────────
   MOBILE HAMBURGER MENU
   - ESC key closes menu
   - Click outside closes menu
   - Animated hamburger → X
────────────────────────────────────────────── */
(function initMobile() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('is-open');
  }

  function openMenu() {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('is-open');
  }

  btn.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMenu(); btn.focus(); }
  });
})();

/* ──────────────────────────────────────────────
   BACK TO TOP BUTTON
────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 80), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ──────────────────────────────────────────────
   STAGGERED FADE-UP ANIMATIONS
   Cards in same parent get sequential delays (0, 80ms, 160ms…)
────────────────────────────────────────────── */
(function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  // Build sibling map for stagger delays
  const parentMap = new Map();
  els.forEach(el => {
    const parent = el.parentElement;
    if (!parentMap.has(parent)) parentMap.set(parent, []);
    parentMap.get(parent).push(el);
  });

  function reveal(el) {
    const siblings = parentMap.get(el.parentElement) || [el];
    const idx = siblings.indexOf(el);
    setTimeout(() => { el.classList.add('visible'); }, Math.min(idx * 80, 400));
  }

  // Immediately reveal any elements already in viewport on page load
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal(el);
  });

  // Use generous rootMargin so cards trigger before entering viewport
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      reveal(e.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });

  els.forEach(el => {
    if (!el.classList.contains('visible')) obs.observe(el);
  });
})();


/* ──────────────────────────────────────────────
   COUNTER ANIMATION (ease-out cubic)
────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '+';
      const duration = 1800;
      const start = performance.now();

      (function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(easeOutCubic(progress) * target) + (progress >= 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(step);
      })(performance.now());

      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

/* ──────────────────────────────────────────────
   ACTIVE NAV LINK (page-based + scroll spy for index)
────────────────────────────────────────────── */
(function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Scroll spy for index.html anchor sections
  if (page === 'index.html' || page === '') {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    const onScroll = throttle(() => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href.endsWith('#' + current) || href === page && current === '');
      });
    }, 100);
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

/* ──────────────────────────────────────────────
   SMOOTH SCROLL FOR ANCHOR LINKS
────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
    }
  });
});

/* ──────────────────────────────────────────────
   TYPEWRITER EFFECT (hero title span, index.html only)
   Types out the orange <span> word letter by letter
────────────────────────────────────────────── */
(function initTypewriter() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;
  const span = heroTitle.querySelector('span');
  if (!span) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const original = span.textContent;
  span.textContent = '';
  span.classList.add('typewriter-cursor');

  let i = 0;
  const type = () => {
    if (i <= original.length) {
      span.textContent = original.slice(0, i++);
      setTimeout(type, 85 + Math.random() * 40);
    } else {
      // Blink cursor 3s then remove
      setTimeout(() => span.classList.remove('typewriter-cursor'), 3000);
    }
  };
  // Small delay so page renders first
  setTimeout(type, 600);
})();

/* ──────────────────────────────────────────────
   COPY-TO-CLIPBOARD (double-click email links)
────────────────────────────────────────────── */
(function initCopyEmails() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    if (!link.title) link.title = 'Kopyalamak için çift tıkla';
    link.addEventListener('dblclick', async (e) => {
      e.preventDefault();
      const email = link.getAttribute('href').replace('mailto:', '');
      try {
        await navigator.clipboard.writeText(email);
        Toast.show(`<b>${email}</b> panoya kopyalandı!`, 'success');
      } catch {
        Toast.show('Panoya kopyalanamadı — lütfen manuel kopyalayın', 'error');
      }
    });
  });
})();

/* ──────────────────────────────────────────────
   ENHANCED CONTACT FORM VALIDATION
   Real-time validation on blur + full check on submit
────────────────────────────────────────────── */
(function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const rules = {
    firstName: v => v.trim().length >= 2 ? null : 'Ad en az 2 karakter olmalıdır',
    lastName: v => v.trim().length >= 2 ? null : 'Soyad en az 2 karakter olmalıdır',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Geçerli bir e-posta adresi giriniz',
    message: v => v.trim().length >= 10 ? null : 'Mesaj en az 10 karakter olmalıdır',
  };

  function setField(field, error) {
    const group = field.closest('.form-group');
    if (!group) return !error;
    group.querySelector('.f-err')?.remove();
    field.classList.toggle('f-invalid', !!error);
    field.classList.toggle('f-valid', !error);
    if (error) {
      const msg = document.createElement('span');
      msg.className = 'f-err';
      msg.setAttribute('role', 'alert');
      msg.textContent = error;
      group.appendChild(msg);
    }
    return !error;
  }

  Object.keys(rules).forEach(name => {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;
    field.addEventListener('blur', () => setField(field, rules[name](field.value)));
    field.addEventListener('input', () => {
      if (field.classList.contains('f-invalid')) setField(field, rules[name](field.value));
    });
  });

  form.addEventListener('submit', (e) => {
    let allValid = true;
    Object.keys(rules).forEach(name => {
      const field = form.querySelector(`[name="${name}"]`);
      if (field && !setField(field, rules[name](field.value))) allValid = false;
    });
    if (!allValid) {
      e.preventDefault();
      Toast.show('Lütfen formdaki hataları düzeltin', 'error');
      form.querySelector('.f-invalid')?.focus();
      return;
    }
    const btn = form.querySelector('[type="submit"]');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span style="opacity:.7">Gönderiliyor…</span>'; }
  });
})();

/* ──────────────────────────────────────────────
   PAGE TRANSITION (fade-in on load, fade-out on navigate)
────────────────────────────────────────────── */
(function initPageTransition() {
  document.body.classList.add('page-enter');
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.body.classList.add('page-enter-active'));
    });
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
      href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
    link.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.add('page-leave');
      setTimeout(() => { window.location.href = href; }, 280);
    });
  });
})();

/* ──────────────────────────────────────────────
   AUTO COPYRIGHT YEAR
────────────────────────────────────────────── */
(function initCopyrightYear() {
  const year = new Date().getFullYear();
  // Update all .copyright-year spans (preferred method)
  document.querySelectorAll('.copyright-year').forEach(el => { el.textContent = year; });
  // Fallback: find any remaining hardcoded 2025 years in footer/spans
  document.querySelectorAll('footer, span, p').forEach(el => {
    if (!el.childElementCount && el.textContent.trim().startsWith('©') && el.textContent.includes('2025')) {
      el.textContent = el.textContent.replace('2025', year);
    }
  });
})();

/* ──────────────────────────────────────────────
   EXTERNAL LINK SAFETY (auto rel + aria-label)
────────────────────────────────────────────── */
(function initExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.rel || !link.rel.includes('noopener')) link.rel = 'noopener noreferrer';
    const text = link.textContent.trim();
    if (text && !link.getAttribute('aria-label') && !link.title) {
      link.setAttribute('aria-label', `${text} (yeni sekmede açılır)`);
    }
  });
})();

/* ──────────────────────────────────────────────
   PARALLAX EFFECT (hero logo only, subtle)
────────────────────────────────────────────── */
(function initParallax() {
  const hero = document.querySelector('.hero');
  const heroImg = document.querySelector('.hero-img');
  if (!hero || !heroImg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > hero.offsetHeight) return;
    heroImg.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, 16), { passive: true });
})();

/* ──────────────────────────────────────────────
   3D CARD TILT EFFECT (subtle, perspective-based)
────────────────────────────────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return; // Skip on mobile

  const cards = document.querySelectorAll('.card, .focus-card, .team-card-ms, .event-card, .about-feat');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tX = (y - 0.5) * 5;
      const tY = (x - 0.5) * -5;
      card.style.transition = 'transform 0.08s ease, box-shadow 0.22s ease';
      card.style.transform = `perspective(900px) translateY(-3px) rotateX(${tX}deg) rotateY(${tY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = '';
      card.style.transform = '';
    });
  });
})();

/* ──────────────────────────────────────────────
   MARQUEE — PAUSE ON HOVER
────────────────────────────────────────────── */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const parent = track.parentElement;
  parent.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  parent.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();

/* ──────────────────────────────────────────────
   SCROLL DEPTH TRACKING (fires custom events)
   Listen: document.addEventListener('scrollDepth', e => console.log(e.detail))
────────────────────────────────────────────── */
(function initScrollDepth() {
  const milestones = [25, 50, 75, 100];
  const fired = new Set();
  window.addEventListener('scroll', debounce(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.round((window.scrollY / docH) * 100);
    milestones.forEach(m => {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        document.dispatchEvent(new CustomEvent('scrollDepth', { detail: { percent: m, page: location.pathname } }));
      }
    });
  }, 200), { passive: true });
})();

/* ──────────────────────────────────────────────
   LAZY IMAGE LOADING (fallback for older browsers)
────────────────────────────────────────────── */
(function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return; // Native support
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const img = e.target;
      if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
      obs.unobserve(img);
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => obs.observe(img));
})();

/* ──────────────────────────────────────────────
   NETWORK STATUS TOASTS
────────────────────────────────────────────── */
(function initNetworkStatus() {
  let offlineToast = null;
  window.addEventListener('online', () => {
    offlineToast?.dismiss();
    Toast.show('İnternet bağlantısı yeniden kuruldu ✓', 'success');
  });
  window.addEventListener('offline', () => {
    offlineToast = Toast.show('İnternet bağlantısı yok — site çevrimdışı kullanılabilir', 'warning', 0);
  });
})();

/* ──────────────────────────────────────────────
   KEYBOARD SHORTCUTS
   ESC     → Close mobile menu
   Ctrl+↑  → Back to top
────────────────────────────────────────────── */
(function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + ArrowUp → scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();

/* ──────────────────────────────────────────────
   IMAGE ZOOM ON CLICK (for logo areas)
────────────────────────────────────────────── */
(function initImageZoom() {
  const imgs = document.querySelectorAll('.about-logo-card img, .hero-img');
  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'img-zoom-overlay';
      overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="img-zoom-target"/>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('img-zoom-in')));
      const close = () => {
        overlay.classList.remove('img-zoom-in');
        overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
      };
      overlay.addEventListener('click', close);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });
    });
  });
})();

/* ──────────────────────────────────────────────
   SERVICE WORKER REGISTRATION (offline support)
────────────────────────────────────────────── */
(function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              Toast.show('Site güncellendi! Sayfayı yenilemek ister misin? <a href="javascript:location.reload()" style="color:var(--orange);font-weight:700;margin-left:8px">Yenile</a>', 'info', 8000);
            }
          });
        });
      }).catch(() => { /* SW not available in dev — silent */ });
    });
  }
})();
