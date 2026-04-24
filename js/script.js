// ===== LIGHTWEIGHT PARTICLE BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 35; i++) {
  particles.push({
    x: Math.random() * w, y: Math.random() * h,
    s: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    o: Math.random() * 0.2 + 0.05
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.s, 0, 6.28);
    ctx.fillStyle = `rgba(0,184,148,${p.o})`;
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const d = dx * dx + dy * dy;
      if (d < 10000) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,184,148,${0.04 * (1 - Math.sqrt(d) / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== NAVBAR =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links a');

let lastScroll = 0;
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  lastScroll = window.scrollY;
}, { passive: true });

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

allNavLinks.forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger?.classList.remove('active');
}));

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  allNavLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const revealCheck = () => {
  const wh = window.innerHeight;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < wh - 80) el.classList.add('active');
  });
};
window.addEventListener('scroll', revealCheck, { passive: true });
revealCheck();

// ===== COUNTER ANIMATION =====
let countersRan = false;
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersRan) {
    countersRan = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur) + suffix;
      }, 25);
    });
  }
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== TYPING EFFECT =====
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const words = ['Geospatial Solutions Architect', 'GIS Developer', 'Spatial Data Expert', 'Web GIS Specialist'];
  let wi = 0, ci = 0, del = false;
  function type() {
    const w = words[wi];
    typingEl.textContent = w.substring(0, ci);
    if (!del && ci < w.length) { ci++; setTimeout(type, 70); }
    else if (del && ci > 0) { ci--; setTimeout(type, 35); }
    else { del = !del; if (!del) wi = (wi + 1) % words.length; setTimeout(type, del ? 1200 : 400); }
  }
  type();
}

// ===== FORM =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = form.querySelector('[name="name"]').value;
    const em = form.querySelector('[name="email"]').value;
    const m = form.querySelector('[name="message"]').value;
    window.open(`https://wa.me/923055547264?text=${encodeURIComponent(`Hi Gul! I'm ${n} (${em}). ${m}`)}`, '_blank');
    form.reset();
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});
