/* =============================================
   HARSHAL THAKUR — PORTFOLIO
   main.js
   ============================================= */

// Use environment variable or fallback to local dev server
const API_BASE = 'https://portfolio1-8nje.onrender.com/api';
window.API_URL = 'https://portfolio-ct94.onrender.com/api';

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- Scroll Fade-in ---- */
function setupScrollObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
}

/* ---- Load Projects from API ---- */
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const res = await fetch(`${API_BASE}/projects/`);
    if (!res.ok) throw new Error('API error');
    const projects = await res.json();

    grid.innerHTML = '';    cd "C:\Users\HP\VS CODE PROJECTS\Projects\portfolio"
    
    git add .
    
    git commit -m "Update API URL for production"
    
    git push origin main
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-num">// ${String(index + 1).padStart(3, '0')}</div>
        <div class="project-name">${escapeHtml(project.name)}</div>
        <div class="project-tech">${escapeHtml(project.tech_stack)}</div>
        <ul class="project-bullets">
          ${project.bullets.map(b => `<li class="project-bullet">${escapeHtml(b)}</li>`).join('')}
        </ul>
      `;
      grid.appendChild(card);
    });

    /* Dark "What's Next" card */
    const nextCard = document.createElement('div');
    nextCard.className = 'project-card';
    nextCard.style.cssText = 'background: var(--ink); color: var(--paper);';
    nextCard.innerHTML = `
      <div class="project-num" style="color:#555;">// more</div>
      <div class="project-name" style="color:var(--paper);">What's Next?</div>
      <div class="project-tech" style="color:var(--accent);">Always building something new</div>
      <ul class="project-bullets">
        <li class="project-bullet" style="color:#aaa;">Exploring new ideas at the intersection of Python and data.</li>
        <li class="project-bullet" style="color:#aaa;">Open to internships, freelance gigs, and collaborations.</li>
        <li class="project-bullet" style="color:#aaa;">Reach out — let's build something together.</li>
      </ul>
    `;
    grid.appendChild(nextCard);

  } catch (err) {
    grid.innerHTML = `<div class="projects-loading">Could not load projects. <a href="#contact" style="color:var(--accent)">Contact me directly.</a></div>`;
    console.error('Projects API error:', err);
  }
}

/* ---- Load Skills from API ---- */
async function loadSkills() {
  const layout = document.getElementById('skillsLayout');
  try {
    const res = await fetch(`${API_BASE}/skills/`);
    if (!res.ok) throw new Error('API error');
    const groups = await res.json();

    layout.innerHTML = '';
    groups.forEach(group => {
      const col = document.createElement('div');
      col.innerHTML = `<div class="skill-group-title">${escapeHtml(group.category)}</div>`;
      group.skills.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        const dots = Array.from({ length: 5 }, (_, i) =>
          `<div class="dot${i < skill.level ? '' : ' empty'}"></div>`
        ).join('');
        item.innerHTML = `<span>${escapeHtml(skill.name)}</span><div class="skill-dots">${dots}</div>`;
        col.appendChild(item);
      });
      layout.appendChild(col);
    });

  } catch (err) {
    layout.innerHTML = `<div class="skills-loading">Could not load skills.</div>`;
    console.error('Skills API error:', err);
  }
}

/* ---- Load Certifications from API ---- */
async function loadCertifications() {
  const grid = document.getElementById('certsGrid');
  try {
    const res = await fetch(`${API_BASE}/certifications/`);
    if (!res.ok) throw new Error('API error');
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
          <div>
            <span class="cert-grade">Grade: ${escapeHtml(cert.grade)}</span>
          </div>
          <div style="text-align:right;">
            <div class="cert-id-label">ID: ${escapeHtml(cert.cert_id)}</div>
            ${cert.pdf_file
              ? `<a class="cert-view-btn" href="img/${escapeHtml(cert.pdf_file)}" target="_blank">View Certificate →</a>`
              : ''}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = `<div class="projects-loading">Could not load certifications.</div>`;
    console.error('Certifications API error:', err);
  }
}

/* ---- Contact Form ---- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  function showError(fieldId, msg) {
    const el = document.getElementById(fieldId);
    if (el) el.textContent = msg;
  }

  function clearErrors() {
    ['nameError', 'emailError', 'messageError', 'formError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    if (!name) {
      showError('nameError', 'Name is required.');
      form.name.classList.add('error');
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      showError('emailError', 'Please enter a valid email.');
      form.email.classList.add('error');
      valid = false;
    }
    if (!message) {
      showError('messageError', 'Message cannot be empty.');
      form.message.classList.add('error');
      valid = false;
    }
    if (!valid) return;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        form.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      } else {
        const msg = data.detail || data.message || 'Something went wrong. Try emailing me directly.';
        showError('formError', msg);
        submitBtn.textContent = 'Send message →';
        submitBtn.disabled = false;
      }
    } catch (err) {
      showError('formError', 'Network error. Please email me directly.');
      submitBtn.textContent = 'Send message →';
      submitBtn.disabled = false;
    }
  });
}

/* ---- Utility ---- */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  setupScrollObserver();
  loadProjects();
  loadSkills();
  loadCertifications();
  setupContactForm();
});
