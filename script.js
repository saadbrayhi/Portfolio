const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const reveals = document.querySelectorAll('.reveal');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

navItems.forEach((item) => item.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });
reveals.forEach((el) => observer.observe(el));

const stage = document.querySelector('.hero-stage');
const systemCard = document.querySelector('.system-card');
if (stage && systemCard && window.matchMedia('(pointer: fine)').matches) {
  stage.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    systemCard.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
  });
  stage.addEventListener('mouseleave', () => systemCard.style.transform = '');
}

document.getElementById('year').textContent = new Date().getFullYear();
