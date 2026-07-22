const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const navigationItems = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const cursorGlow = document.querySelector('.cursor-glow');
const tiltCards = document.querySelectorAll('.tilt-card');
const magneticButtons = document.querySelectorAll('.magnetic');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });


menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navigationItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((child) =>
        child.classList.contains('reveal')
      );
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(index, 0) * 90}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));


const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));


if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
} else {
  cursorGlow.style.display = 'none';
}


tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 9;
    const rotateX = ((y / rect.height) - 0.5) * -9;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});


magneticButtons.forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  button.addEventListener('pointerleave', () => {
    button.style.transform = '';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
