/* =============================================
   HARSHAL THAKUR — PORTFOLIO
   main.js
   ============================================= */

const API_BASE = 'https://portfolio1-8nje.onrender.com/api';

/* ---- Hamburger ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ---- Scroll Fade-in ---- */
function setupScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.ed-section, .quote-band').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
}


/* ---- INTERACTIVE LOGO POPUP ---- */
const navLogo = document.querySelector('.nav-logo');
const logoOverlay = document.getElementById('logoOverlay');

navLogo.addEventListener('click', () => {
  logoOverlay.style.display = 'flex'; // ← force flex directly
});

logoOverlay.addEventListener('click', () => {
  logoOverlay.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') logoOverlay.style.display = 'none';
});


/* ---- Projects ---- */
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const res = await fetch(`${API_BASE}/projects/`);
    if (!res.ok) throw new Error();
    const projects = await res.json();
    grid.innerHTML = '';
    projects.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'proj-card';
      card.innerHTML = `
        <div class="proj-num">// ${String(i + 1).padStart(3, '0')}</div>
        <div class="proj-name">${escapeHtml(p.name)}</div>
        <div class="proj-tech">${escapeHtml(p.tech_stack)}</div>
        <ul class="proj-bullets">
          ${p.bullets.map(b => `<li class="proj-bullet">${escapeHtml(b)}</li>`).join('')}
        </ul>`;
      grid.appendChild(card);
    });
  } catch {
    grid.innerHTML = `<div class="art-loading">Could not load projects.</div>`;
  }
}

/* ---- Skills ---- */
async function loadSkills() {
  const layout = document.getElementById('skillsLayout');
  try {
    const res = await fetch(`${API_BASE}/skills/`);
    if (!res.ok) throw new Error();
    const groups = await res.json();
    layout.innerHTML = '';
    groups.forEach(group => {
      const col = document.createElement('div');
      col.innerHTML = `<div class="skill-group-title">${escapeHtml(group.category)}</div>`;
      group.skills.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        const dots = Array.from({ length: 5 }, (_, i) => `<div class="dot${i < skill.level ? '' : ' empty'}"></div>`).join('');
        item.innerHTML = `<span>${escapeHtml(skill.name)}</span><div class="skill-dots">${dots}</div>`;
        col.appendChild(item);
      });
      layout.appendChild(col);
    });
  } catch {
    layout.innerHTML = `<div class="art-loading">Could not load skills.</div>`;
  }
}

/* ---- Certifications ---- */
async function loadCertifications() {
  const grid = document.getElementById('certsGrid');
  try {
    const res = await fetch(`${API_BASE}/certifications/`);
    if (!res.ok) throw new Error();
    const certs = await res.json();
    grid.innerHTML = '';
    certs.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-card';
      card.innerHTML = `
        <div class="cert-title">${escapeHtml(cert.title)}</div>
        <div class="cert-issuer">${escapeHtml(cert.issuer)}</div>
        <div class="cert-period">${escapeHtml(cert.period)}</div>
        <div class="cert-footer">
          <span class="cert-grade">Grade: ${escapeHtml(cert.grade)}</span>
          <div>
            <div class="cert-id-label">ID: ${escapeHtml(cert.cert_id)}</div>
            ${cert.pdf_file ? `<a class="cert-view-btn" href="frontend/img/${escapeHtml(cert.pdf_file)}" target="_blank">View PDF →</a>` : ''}
          </div>
        </div>`;
      grid.appendChild(card);
    });
  } catch {
    grid.innerHTML = `<div class="art-loading">Could not load certifications.</div>`;
  }
}

/* ---- Contact Form ---- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  function showErr(id, msg) { const el = document.getElementById(id); if (el) el.textContent = msg; }
  function clearErrors() {
    ['nameError','emailError','messageError','formError'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
  }
  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let ok = true;
    if (!name) { showErr('nameError', 'Name is required.'); ok = false; }
    if (!email || !validEmail(email)) { showErr('emailError', 'Valid email required.'); ok = false; }
    if (!message) { showErr('messageError', 'Message cannot be empty.'); ok = false; }
    if (!ok) return;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        form.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      } else {
        showErr('formError', 'Something went wrong. Email me directly.');
        submitBtn.textContent = '↳ Let\'s collaborate';
        submitBtn.disabled = false;
      }
    } catch {
      showErr('formError', 'Network error. Please email me directly.');
      submitBtn.textContent = '↳ Let\'s collaborate';
      submitBtn.disabled = false;
    }
  });
}

/* ---- Utility ---- */
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  setupScrollObserver();
  loadProjects();
  loadSkills();
  loadCertifications();
  setupContactForm();
});
