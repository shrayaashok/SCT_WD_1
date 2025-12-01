// NAV TOGGLE + ACTIVE LINK + SCROLL BEHAVIOR
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header') || document.querySelector('.header');
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('navList') || document.querySelector('.nav-list');
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links).map(l => {
    try { return document.querySelector(l.getAttribute('href')); } catch(e) { return null; }
  }).filter(Boolean);

  // mobile toggle
  toggle && toggle.addEventListener('click', () => navList.classList.toggle('active'));

  // header style on scroll
  const onScrollHeader = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };

  // highlight active nav link
  const onScrollActive = () => {
    const offset = window.innerHeight * 0.35;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom > offset) {
        links.forEach(l => l.classList.remove('active'));
        links[i] && links[i].classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', () => { onScrollHeader(); onScrollActive(); }, {passive:true});
  onScrollHeader();
  onScrollActive();

  // Smooth scroll for nav links
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (navList.classList.contains('active')) navList.classList.remove('active'); // close mobile
      if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // fill current year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // SKILL CIRCLES: animate stroke-dasharray on scroll into view
  const skillEls = document.querySelectorAll('.skill-circle');
  const animateSkill = (el) => {
    const percent = parseInt(el.dataset.percent || '0', 10);
    const meter = el.querySelector('.meter');
    const circumference = 100; // svg normalized value
    const dash = (percent / 100) * circumference;
    meter.style.strokeDasharray = `${dash} ${circumference - dash}`;
  };

  const skillsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkill(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.45});

  skillEls.forEach(el => {
    // set initial dasharray 0
    const meter = el.querySelector('.meter');
    if (meter) meter.style.strokeDasharray = `0 100`;
    skillsObserver.observe(el);
  });

  // PROJECT FILTERS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  if (filterBtns.length && projectsGrid) {
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const items = projectsGrid.querySelectorAll('.project-card');
      items.forEach(it => {
        if (filter === 'all' || it.dataset.type === filter) {
          it.style.display = '';
        } else {
          it.style.display = 'none';
        }
      });
    }));
  }

  // CONTACT FORM (front-end only)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const msgEl = document.getElementById('formMsg');

      if (!name || !email || !message) {
        msgEl.textContent = 'Please fill all fields.';
        return;
      }

      // Simple front-end success message (replace with API call to send)
      msgEl.textContent = 'Thanks! Your message was received (demo).';
      contactForm.reset();
      setTimeout(()=> msgEl.textContent = '', 6000);
    });
  }
});
