/* ── CURSOR ── */
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .work-card, .cert-card, .notion-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(255,107,0,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '40px';
    ring.style.height = '40px';
    ring.style.borderColor = 'rgba(255,107,0,0.5)';
  });
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => observer.observe(el));

/* ── NAV ACTIVE ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50
    ? 'rgba(10,6,0,0.95)'
    : 'rgba(10,6,0,0.7)';
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── TYPING EFFECT ── */
const roles = ['Content Creator', 'Video Editor', 'Motion Designer', 'Notion Power User'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function type() {
  if (!typedEl) return;
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1200);

/* ── COUNT UP ── */
document.querySelectorAll('.count-up').forEach(el => {
  const target = +el.dataset.target;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let n = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + (el.dataset.suffix || '');
        if (n >= target) clearInterval(timer);
      }, 25);
      obs.disconnect();
    }
  });
  obs.observe(el);
});
