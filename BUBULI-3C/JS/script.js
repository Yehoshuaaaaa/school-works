document.addEventListener('DOMContentLoaded', () => {
  renderNavigation();
  renderHero();
  renderAbout();
  renderGames();
  initMenu();
  initActiveSection();
  initReveal();
  initTyping();
});

const navItems = [
  { text: 'Home', href: '#hero' },
  { text: 'About', href: '#about' },
  { text: 'Games', href: '#games' }
];
const heroData = {
  eyebrow: 'BSIT Student • Frontend Developer',
  title: 'A thoughtful developer with a design-first mindset.',
  imageSrc: "assets/profile.png",   
  accent: 'with clarity and motion.',
  subtitle: 'Frontend • UI/UX • Performance',
  typedWords: ['fast products', 'clean interfaces', 'modern brands'],
  description: 'I craft polished websites that feel premium, load quickly, and guide users with intention.',
  primaryCta: { label: 'See my story', href: '#about' },
  secondaryCta: { label: 'Say hello', href: 'mailto:joshua@bubuli.dev' },
  highlights: ['React', 'Accessibility', 'Animation', 'Design Systems'],
  illustration: `
    <svg viewBox="0 0 420 420" role="img" aria-label="Developer illustration">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="56" y="52" width="308" height="316" rx="30" fill="#101827" stroke="rgba(255,255,255,0.08)" />
      <circle cx="210" cy="160" r="82" fill="url(#heroGrad)" opacity="0.2" />
      <rect x="116" y="126" width="188" height="120" rx="20" fill="#0b1220" stroke="url(#heroGrad)" stroke-width="2" />
      <rect x="140" y="150" width="140" height="12" rx="6" fill="#38BDF8" opacity="0.9" />
      <rect x="140" y="176" width="102" height="10" rx="5" fill="#94A3B8" opacity="0.8" />
      <rect x="140" y="202" width="120" height="10" rx="5" fill="#94A3B8" opacity="0.5" />
      <rect x="140" y="226" width="80" height="10" rx="5" fill="#7C3AED" opacity="0.75" />
      <path d="M118 302c22-22 64-34 92-34s70 12 92 34" fill="none" stroke="url(#heroGrad)" stroke-width="4" stroke-linecap="round" />
      <circle cx="210" cy="92" r="28" fill="#f8fafc" opacity="0.9" />
      <path d="M188 100c8 8 24 8 32 0" stroke="#050816" stroke-width="3" stroke-linecap="round" />
    </svg>`
};

const aboutData = {
  title: 'A thoughtful developer with a design-first mindset.',
  imageSrc: "assets/profile.png",
  paragraphs: [
    'I blend product thinking with strong frontend craft to turn ambitious ideas into clear, premium experiences.',
    'My work focuses on accessibility, performant motion, and thoughtful interaction details that make products feel effortless.',
    'I enjoy partnering with founders and teams to shape interfaces that look sharp and feel intuitive from the first click.'
  ],
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Accessibility', 'Animation'],
  summary: 'Over the past five years, I have built fast-paced product experiences for startups, agencies, and growing teams.',
  // Inline SVG fallback used when the profile image is not present
  imageSvg: `
    <svg viewBox="0 0 360 420" role="img" aria-label="Profile illustration">
      <rect x="24" y="24" width="312" height="372" rx="30" fill="#111827" />
      <circle cx="180" cy="154" r="88" fill="#38BDF8" opacity="0.16" />
      <circle cx="180" cy="150" r="62" fill="#1E293B" />
      <circle cx="180" cy="140" r="34" fill="#F8FAFC" opacity="0.9" />
      <path d="M124 298c16-44 40-68 56-68s40 24 56 68" fill="#1E293B" />
      <path d="M114 330h132" stroke="#38BDF8" stroke-width="5" stroke-linecap="round" opacity="0.75" />
    </svg>`
};

// Hobbies and games the user plays — rendered using for loops
const HOBBIES = [
  'Photography',
  'Chess',
  'Running',
  'Playing video games',
  'Watching movies',
];

const GAMES = [
  { title: 'Crossfire', type: 'FPS' },
  { title: 'Basketball', type: 'Team Sport' },
  { title: 'Roblox', type: 'Online Game' }
];

const statItems = [
  { value: '05+', label: 'Years building' },
  { value: '24+', label: 'Launches shipped' },
  { value: '10k+', label: 'Users served' },
  { value: '100%', label: 'Detail obsessed' }
];

function renderNavigation() {
  const navMenu = document.getElementById('nav-menu');
  if (!navMenu) return;

  let html = '';
  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i];
    html += `
      <li>
        <a href="${item.href}" class="${i === 0 ? 'active-link' : ''}">
          ${item.text}
        </a>
      </li>
    `;
  }
  navMenu.innerHTML = html;
}

function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  let highlightsMarkup = '';
  for (let i = 0; i < heroData.highlights.length; i++) {
    highlightsMarkup += `<span class="highlight-pill">${heroData.highlights[i]}</span>`;
  }

  let actionsMarkup = '';
  const ctas = [heroData.primaryCta, heroData.secondaryCta];
  for (let i = 0; i < ctas.length; i++) {
    const action = ctas[i];
    const className = i === 0 ? 'btn btn-primary' : 'btn btn-secondary';
    actionsMarkup += `<a class="${className}" href="${action.href}">${action.label}</a>`;
  }

  const profileMarkup = `
    <div class="profile-card">
      <div class="profile-avatar" aria-hidden="true">
        <svg viewBox="0 0 120 120" role="img" aria-label="Profile avatar">
          <circle cx="60" cy="60" r="54" fill="#111827" stroke="url(#avatarGradient)" stroke-width="4" />
          <defs>
            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#7C3AED" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="46" r="24" fill="#F8FAFC" opacity="0.95" />
          <path d="M28 98c6-20 24-32 32-32s26 12 32 32" fill="#F8FAFC" opacity="0.95" />
        </svg>
      </div>
      <div>
        <h3>Joshua Bubuli</h3>
        <p>BSIT Student • Frontend Developer</p>
      </div>
    </div>
  `;

  hero.innerHTML = `
    <div class="hero-grid">
      <div class="reveal">
        <span class="eyebrow">${heroData.eyebrow}</span>
        ${profileMarkup}
        <h1 class="hero-title">${heroData.title} <span class="accent">${heroData.accent}</span></h1>
        <p class="hero-subtitle">${heroData.subtitle}</p>
        <p id="typing-text" class="hero-typing" aria-live="polite"></p>
        <p class="hero-description">${heroData.description}</p>
        <div class="hero-actions">${actionsMarkup}</div>
        <div class="hero-highlights">${highlightsMarkup}</div>
        <a class="scroll-indicator" href="#about">
          <span class="scroll-wheel"></span>
          Scroll to learn more
        </a>
      </div>
      <div class="hero-visual reveal">
        <div class="hero-card">
          <div class="floating-chip one">⚡ Motion-first</div>
          <div class="floating-chip two">✦ Accessible</div>
          <img src="${heroData.imageSrc}" alt="Profile photo" class="hero-profile" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
          <div class="hero-illustration" style="display:none;">
            <img src="${heroData.imageSrc}" alt="Profile visual" class="hero-illustration-img" />
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAbout() {
  const about = document.getElementById('about');
  if (!about) return;

  let paragraphsMarkup = '';
  for (let i = 0; i < aboutData.paragraphs.length; i++) {
    paragraphsMarkup += `<p>${aboutData.paragraphs[i]}</p>`;
  }

  let techMarkup = '';
  for (let i = 0; i < aboutData.technologies.length; i++) {
    techMarkup += `<span class="tech-chip">${aboutData.technologies[i]}</span>`;
  }

  // Render hobbies using a for loop
  let hobbiesMarkup = '';
  for (let i = 0; i < HOBBIES.length; i++) {
    hobbiesMarkup += `<span class="hobby-chip">${HOBBIES[i]}</span>`;
  }

  // Render games are shown in the separate Games section (renderGames)

  let statsMarkup = '';
  for (let i = 0; i < statItems.length; i++) {
    const stat = statItems[i];
    statsMarkup += `
      <article class="stat-card reveal">
        <strong>${stat.value}</strong>
        <span>${stat.label}</span>
      </article>
    `;
  }

  // Try to load an external profile image first; if it fails, show the inline SVG fallback.
  about.innerHTML = `
    <div class="about-grid">
      <div class="about-profile reveal">
        <div class="profile-media">
          <img src="${aboutData.imageSrc}" alt="Profile photo" class="profile-photo" onerror="this.style.display='none';document.getElementById('profileFallback').style.display='block'" />
          <div id="profileFallback" class="about-illustration" style="display:none;">${aboutData.imageSvg}</div>
        </div>
        <div class="about-badge">
          <strong>5+</strong>
          <span>years creating polished web experiences</span>
        </div>
      </div>
      <div class="about-copy reveal">
        <h2>${aboutData.title}</h2>
        ${paragraphsMarkup}
        <p>${aboutData.summary}</p>
        <div class="tech-list">${techMarkup}</div>
        <div class="hobbies-section">
          <h3>Hobbies</h3>
          <div class="hobbies-list">${hobbiesMarkup}</div>
        </div>
        <div class="stat-grid">${statsMarkup}</div>
      </div>
    </div>
  `;
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  const links = nav.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
}

function renderGames() {
  const section = document.getElementById('games');
  if (!section) return;

  let gamesMarkup = '';
  for (let i = 0; i < GAMES.length; i++) {
    const g = GAMES[i];
    gamesMarkup += `
      <div class="game-item">
        <strong>${g.title}</strong>
        <span class="game-type">${g.type}</span>
      </div>
    `;
  }

  section.innerHTML = `
    <div class="section-container">
      <p class="section-eyebrow">Recreation</p>
      <h2 class="section-title">Games I Play</h2>
      <p class="section-subtitle">A few games I enjoy in my free time.</p>
      <div class="games-list">${gamesMarkup}</div>
    </div>
  `;
}

function initActiveSection() {
  const links = document.querySelectorAll('.site-nav a');
  const sections = document.querySelectorAll('main section[id]');

  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.isIntersecting) {
        for (let j = 0; j < links.length; j++) {
          const link = links[j];
          link.classList.toggle('active-link', link.getAttribute('href') === `#${entry.target.id}`);
        }
      }
    }
  }, { threshold: 0.55 });

  for (let i = 0; i < sections.length; i++) {
    observer.observe(sections[i]);
  }
}

function initReveal() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.16 });

  for (let i = 0; i < revealItems.length; i++) {
    observer.observe(revealItems[i]);
  }
}

function initTyping() {
  const typingElement = document.getElementById('typing-text');
  const words = heroData.typedWords;
  if (!typingElement || !words.length) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingElement.textContent = currentWord.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      typingElement.textContent = currentWord.slice(0, charIndex - 1);
      charIndex -= 1;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? 60 : 90);
  }

  typeLoop();
}
