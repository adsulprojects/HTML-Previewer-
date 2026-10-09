import { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'blank',
    name: 'Full-Page Starter',
    description: 'Modern full-page responsive website with navbar, hero, live interactive controls, and feature grid',
    category: 'Starter',
    html: `<!-- Modern Full-Page Responsive Website -->
<header class="navbar">
  <div class="nav-brand">
    <div class="brand-logo">⚡</div>
    <span class="brand-title">HTML Previewer</span>
  </div>
  <nav class="nav-menu">
    <a href="#hero" class="nav-link active">Home</a>
    <a href="#features" class="nav-link">Features</a>
    <a href="#demo" class="nav-link">Interactive Demo</a>
  </nav>
  <div class="nav-actions">
    <button id="themeToggleBtn" class="secondary-btn">Toggle Theme</button>
    <button id="primaryCtaBtn" class="primary-btn">Get Started</button>
  </div>
</header>

<main class="page-content">
  <!-- Hero Section -->
  <section class="hero-section" id="hero">
    <div class="badge-pill">
      <span class="badge-dot"></span>
      <span>Live Sandboxed Environment</span>
    </div>
    <h1 class="hero-headline">Write Code. Preview Instantly in Real Time.</h1>
    <p class="hero-subtext">
      A high-performance HTML, CSS, and JavaScript playground. Edit your code in the editor and watch your full-page website render live with zero latency.
    </p>
    <div class="cta-row">
      <button id="actionCounterBtn" class="primary-btn large">
        Click Counter: <span id="clickCount">0</span>
      </button>
      <button id="resetCountBtn" class="secondary-btn large">Reset</button>
    </div>
  </section>

  <!-- Metrics Bar -->
  <section class="stats-bar">
    <div class="stat-card">
      <div class="stat-value">0 ms</div>
      <div class="stat-label">Instant Compilation</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">100%</div>
      <div class="stat-label">Full Page Coverage</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">60 FPS</div>
      <div class="stat-label">Silky Responsive Render</div>
    </div>
  </section>

  <!-- Interactive Demo & Features -->
  <section class="features-section" id="features">
    <div class="section-header">
      <h2>Interactive Live Components</h2>
      <p>Interact with the live components below to test JavaScript and CSS reactivity.</p>
    </div>

    <div class="cards-grid">
      <div class="feature-card">
        <div class="card-icon">🎨</div>
        <h3>Dynamic Color Theme</h3>
        <p>Switch the page accent color instantly using client-side JavaScript.</p>
        <div class="palette-picker">
          <button class="color-dot" data-color="#7C3AED" style="background: #7C3AED;"></button>
          <button class="color-dot" data-color="#2563EB" style="background: #2563EB;"></button>
          <button class="color-dot" data-color="#059669" style="background: #059669;"></button>
          <button class="color-dot" data-color="#DC2626" style="background: #DC2626;"></button>
        </div>
      </div>

      <div class="feature-card">
        <div class="card-icon">⌨️</div>
        <h3>Live Input Mirror</h3>
        <p>Type into the text field below to see real-time two-way DOM synchronization.</p>
        <input type="text" id="liveInput" class="custom-input" placeholder="Type something here..." />
        <div class="live-mirror">
          Output: <strong id="mirrorOutput">Type above to see text update</strong>
        </div>
      </div>

      <div class="feature-card">
        <div class="card-icon">⚡</div>
        <h3>Console Telemetry</h3>
        <p>Log messages directly from your script into the integrated console panel.</p>
        <button id="logConsoleBtn" class="secondary-btn w-full">Send Test Console Log</button>
        <div id="logFeedback" class="feedback-text">Console output recorded</div>
      </div>
    </div>
  </section>
</main>

<footer class="page-footer">
  <div class="footer-inner">
    <span>© 2026 HTML Previewer · Built for developers</span>
    <span class="footer-tag">Standalone Sandboxed Runtime</span>
  </div>
</footer>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --accent: #7C3AED;
  --accent-hover: #6D28D9;
  --bg-main: #0B0F14;
  --bg-card: #151B23;
  --border-color: #252C36;
  --text-main: #F5F7FA;
  --text-muted: #9CA3AF;
}

body {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  line-height: 1.5;
}

/* Full-width Navbar */
.navbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  background-color: #11161D;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 18px;
}

.brand-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: #FFFFFF;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Buttons */
.primary-btn {
  background: var(--accent);
  color: #FFFFFF;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.primary-btn:hover {
  background: var(--accent-hover);
}

.primary-btn:active {
  transform: scale(0.98);
}

.primary-btn.large {
  padding: 12px 24px;
  font-size: 15px;
}

.secondary-btn {
  background: #151B23;
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-btn:hover {
  background: #1E2530;
  border-color: #3B4452;
}

.secondary-btn.large {
  padding: 12px 22px;
  font-size: 15px;
}

.w-full {
  width: 100%;
}

/* Main Content Container - 100% Full-Width Coverage */
.page-content {
  flex: 1;
  width: 100%;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Hero */
.hero-section {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 16px;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #151B23;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-muted);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  box-shadow: 0 0 8px #22C55E;
}

.hero-headline {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  width: 100%;
  max-width: 1100px;
  line-height: 1.15;
}

.hero-subtext {
  font-size: 18px;
  color: var(--text-muted);
  width: 100%;
  max-width: 850px;
  line-height: 1.6;
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

/* Stats Bar */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  width: 100%;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

/* Features Section */
.features-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-header {
  text-align: center;
}

.section-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 6px;
}

.section-header p {
  color: var(--text-muted);
  font-size: 14px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-icon {
  font-size: 28px;
}

.feature-card h3 {
  font-size: 18px;
  color: #FFFFFF;
}

.feature-card p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Palette Picker */
.palette-picker {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.color-dot {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
}

.color-dot:hover {
  transform: scale(1.1);
}

.color-dot.active {
  border-color: #FFFFFF;
}

/* Custom Input & Mirror */
.custom-input {
  width: 100%;
  background: #0D1117;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 10px 12px;
  color: #FFFFFF;
  font-size: 13px;
  outline: none;
}

.custom-input:focus {
  border-color: var(--accent);
}

.live-mirror {
  background: #0D1117;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 12px;
  color: var(--text-muted);
  word-break: break-all;
}

.feedback-text {
  font-size: 12px;
  color: #22C55E;
  display: none;
}

/* Footer */
.page-footer {
  width: 100%;
  padding: 24px 28px;
  background: #11161D;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.footer-inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-muted);
}

.footer-tag {
  color: var(--accent);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .hero-headline {
    font-size: 30px;
  }
  .stats-bar {
    grid-template-columns: 1fr;
  }
  .footer-inner {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}`,
    js: `// Interactive Starter Logic
let count = 0;
const countDisplay = document.getElementById('clickCount');
const actionBtn = document.getElementById('actionCounterBtn');
const resetBtn = document.getElementById('resetCountBtn');

if (actionBtn && countDisplay) {
  actionBtn.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
    console.log('User incremented counter to:', count);
  });
}

if (resetBtn && countDisplay) {
  resetBtn.addEventListener('click', () => {
    count = 0;
    countDisplay.textContent = count;
    console.log('Counter reset to 0');
  });
}

// Live Input Mirroring
const liveInput = document.getElementById('liveInput');
const mirrorOutput = document.getElementById('mirrorOutput');
if (liveInput && mirrorOutput) {
  liveInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    mirrorOutput.textContent = val || 'Type above to see text update';
  });
}

// Palette Theme Picker
const colorDots = document.querySelectorAll('.color-dot');
colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const color = dot.getAttribute('data-color');
    document.documentElement.style.setProperty('--accent', color);
    colorDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    console.log('Changed accent theme color to:', color);
  });
});

// Console Log Test
const logBtn = document.getElementById('logConsoleBtn');
const feedback = document.getElementById('logFeedback');
if (logBtn && feedback) {
  logBtn.addEventListener('click', () => {
    console.log('[HTML Previewer] Live console message dispatched at:', new Date().toLocaleTimeString());
    feedback.style.display = 'block';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 2000);
  });
}

// Global Theme Toggle
const themeBtn = document.getElementById('themeToggleBtn');
let isLight = false;
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    isLight = !isLight;
    if (isLight) {
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
      document.querySelectorAll('.navbar, .page-footer').forEach(el => el.style.backgroundColor = '#FFFFFF');
      document.querySelectorAll('.stat-card, .feature-card').forEach(el => el.style.backgroundColor = '#FFFFFF');
    } else {
      document.body.style.backgroundColor = '#0B0F14';
      document.body.style.color = '#F5F7FA';
      document.querySelectorAll('.navbar, .page-footer').forEach(el => el.style.backgroundColor = '#11161D');
      document.querySelectorAll('.stat-card, .feature-card').forEach(el => el.style.backgroundColor = '#151B23');
    }
    console.log('Switched page theme mode, isLight:', isLight);
  });
}
`
  },

  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Modern developer tool SaaS landing page with hero, badge, feature grid and CTA',
    category: 'Marketing',
    html: `<header class="navbar">
  <div class="brand">
    <span class="logo-dot"></span>
    <span class="brand-name">PulseFlow</span>
  </div>
  <nav class="nav-links">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="#docs">Docs</a>
  </nav>
  <button class="nav-cta">Get Started</button>
</header>

<main class="hero">
  <div class="announcement">
    <span class="sparkle">⚡</span> New: v2.0 Developer SDK released
  </div>
  <h1 class="hero-title">Ship faster with high-performance real-time telemetry.</h1>
  <p class="hero-sub">Monitor logs, latency, and events with microsecond precision. Zero overhead, infinite scalability.</p>
  
  <div class="cta-group">
    <button class="primary-btn" id="startTrialBtn">Start Free 14-Day Trial</button>
    <button class="secondary-btn" id="demoBtn">View Live Sandbox</button>
  </div>

  <section class="grid-section" id="features">
    <div class="card">
      <div class="icon-box">⚡</div>
      <h3>Microsecond Latency</h3>
      <p>Stream telemetry pipelines with sub-millisecond edge ingest and instant indexing.</p>
    </div>
    <div class="card">
      <div class="icon-box">🛡️</div>
      <h3>End-to-End Encryption</h3>
      <p>AES-256 in transit and at rest with customer-managed cryptographic keys.</p>
    </div>
    <div class="card">
      <div class="icon-box">📈</div>
      <h3>Instant Analytics</h3>
      <p>Query petabytes of timeseries metrics with declarative SQL expressions in real time.</p>
    </div>
  </section>
</main>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #090d13;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.5;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 32px;
  border-bottom: 1px solid #1e2633;
}

.brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; }
.logo-dot { width: 10px; height: 10px; background: #7c3aed; border-radius: 50%; }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.nav-links a:hover { color: #ffffff; }

.nav-cta {
  background: transparent;
  color: #f1f5f9;
  border: 1px solid #334155;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.hero {
  width: 100%;
  padding: 60px 32px;
  text-align: center;
}

.announcement {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #161e2b;
  border: 1px solid #2a374a;
  border-radius: 20px;
  font-size: 13px;
  color: #cbd5e1;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 18px;
  color: #ffffff;
  line-height: 1.15;
}

.hero-sub {
  font-size: 18px;
  color: #94a3b8;
  max-width: 650px;
  margin: 0 auto 36px;
}

.cta-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
}

.primary-btn {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 13px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s;
}
.primary-btn:hover { background: #6d28d9; transform: translateY(-1px); }

.secondary-btn {
  background: #161e2b;
  color: #e2e8f0;
  border: 1px solid #334155;
  padding: 13px 24px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
}
.secondary-btn:hover { background: #1f2937; }

.grid-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  text-align: left;
}

.card {
  background: #111722;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 28px;
}

.icon-box {
  font-size: 24px;
  margin-bottom: 16px;
  background: #1a2232;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.card h3 { font-size: 18px; margin-bottom: 8px; color: #f8fafc; }
.card p { font-size: 14px; color: #94a3b8; line-height: 1.6; }

@media (max-width: 640px) {
  .navbar { padding: 12px 16px; }
  .nav-links { display: none; }
  .hero { padding: 36px 16px 32px; }
  .hero-title { font-size: 28px; }
  .hero-sub { font-size: 14px; margin-bottom: 24px; }
  .cta-group { flex-direction: column; gap: 10px; margin-bottom: 36px; }
  .primary-btn, .secondary-btn { width: 100%; }
  .grid-section { grid-template-columns: 1fr; }
}`,
    js: `document.getElementById('startTrialBtn').addEventListener('click', () => {
  console.log('Action: User clicked Start Trial button');
  alert('Welcome to PulseFlow! Redirecting to setup onboarding...');
});

document.getElementById('demoBtn').addEventListener('click', () => {
  console.log('Action: Opening Live Sandbox');
});`
  },

  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Clean personal developer portfolio with filterable projects and contact badge',
    category: 'Personal',
    html: `<div class="portfolio-wrap">
  <header class="header">
    <div class="avatar">AK</div>
    <div class="bio">
      <h1>Alex Kowalski</h1>
      <p class="role">Staff Frontend Engineer · Systems Architect</p>
      <p class="location">San Francisco, CA · Available for consulting</p>
    </div>
  </header>

  <nav class="filters" id="filterNav">
    <button class="filter-btn active" data-filter="all">All Projects</button>
    <button class="filter-btn" data-filter="systems">Systems</button>
    <button class="filter-btn" data-filter="webgl">WebGL</button>
    <button class="filter-btn" data-filter="tools">Dev Tools</button>
  </nav>

  <section class="projects-grid" id="projectsContainer">
    <div class="project-card" data-category="systems">
      <div class="card-meta">Systems · 2025</div>
      <h3>Hyperion State Store</h3>
      <p>High-throughput atomic state synchronizer written in Rust with WASM bindings.</p>
      <div class="tags"><span>Rust</span><span>WebAssembly</span><span>TypeScript</span></div>
    </div>

    <div class="project-card" data-category="webgl">
      <div class="card-meta">WebGL · 2024</div>
      <h3>Nova Vector Canvas</h3>
      <p>GPU-accelerated procedural node editor rendering 60,000 entities at 60 FPS.</p>
      <div class="tags"><span>Three.js</span><span>GLSL</span><span>Vite</span></div>
    </div>

    <div class="project-card" data-category="tools">
      <div class="card-meta">Dev Tools · 2024</div>
      <h3>SchemaDiff CLI</h3>
      <p>Static AST analyzer for relational database migrations with zero-downtime safety checks.</p>
      <div class="tags"><span>Node.js</span><span>PostgreSQL</span><span>AST</span></div>
    </div>
  </section>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0a0e14;
  color: #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 40px 20px;
}

.portfolio-wrap { max-width: 780px; margin: 0 auto; }

.header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid #1f2937;
  margin-bottom: 32px;
}

.avatar {
  width: 72px;
  height: 72px;
  background: #7c3aed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  color: white;
}

.bio h1 { font-size: 26px; color: #f9fafb; margin-bottom: 4px; }
.bio .role { font-size: 15px; color: #a855f7; font-weight: 500; margin-bottom: 4px; }
.bio .location { font-size: 13px; color: #9ca3af; }

.filters { display: flex; gap: 10px; margin-bottom: 28px; }
.filter-btn {
  background: #111827;
  border: 1px solid #1f2937;
  color: #9ca3af;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn.active, .filter-btn:hover {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
}

.projects-grid { display: flex; flex-direction: column; gap: 18px; }

.project-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 24px;
  transition: transform 0.2s, border-color 0.2s;
}
.project-card:hover { transform: translateY(-2px); border-color: #374151; }

.card-meta { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em; }
.project-card h3 { font-size: 18px; color: #f3f4f6; margin-bottom: 8px; }
.project-card p { font-size: 14px; color: #9ca3af; line-height: 1.5; margin-bottom: 16px; }

.tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tags span {
  font-size: 11px;
  background: #1f2937;
  color: #cbd5e1;
  padding: 3px 8px;
  border-radius: 4px;
}`,
    js: `const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    cards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    console.log('Filtered projects by:', filter);
  });
});`
  },

  {
    id: 'product',
    name: 'Product Page',
    description: 'E-commerce showcase with thumbnail gallery, variant selection, and cart calculation',
    category: 'E-Commerce',
    html: `<div class="product-layout">
  <div class="product-media">
    <div class="main-preview" id="previewBox">
      <div class="device-art" id="deviceArt">🎧 Space Gray</div>
    </div>
    <div class="thumbnails">
      <button class="thumb active" data-color="#1e293b" data-name="Space Gray">Gray</button>
      <button class="thumb" data-color="#0f766e" data-name="Forest Teal">Teal</button>
      <button class="thumb" data-color="#7c3aed" data-name="Electric Violet">Violet</button>
    </div>
  </div>

  <div class="product-details">
    <div class="stock-badge">In Stock · Ready to Ship</div>
    <h1 class="title">Aura Pro Noise-Cancelling Headphones</h1>
    <div class="price-row">
      <span class="price" id="priceDisplay">$299.00</span>
      <span class="original-price">$349.00</span>
    </div>
    <p class="desc">Engineered with custom planar magnetic acoustic drivers, active hybrid cancellation, and up to 48 hours of uninterrupted lossless playback.</p>

    <div class="selector-group">
      <label>Selected Color: <strong id="selectedColorName">Space Gray</strong></label>
    </div>

    <div class="quantity-row">
      <div class="qty-stepper">
        <button id="qtyDec">-</button>
        <span id="qtyVal">1</span>
        <button id="qtyInc">+</button>
      </div>
      <button class="add-to-cart-btn" id="addToCart">Add to Cart · <span id="btnTotal">$299.00</span></button>
    </div>
    <div id="cartNotification" class="notification"></div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 40px 20px;
}

.product-layout {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 16px;
  padding: 36px;
}

@media(max-width: 720px) {
  .product-layout { grid-template-columns: 1fr; }
}

.main-preview {
  height: 300px;
  background: #1e293b;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: background 0.3s;
}

.device-art { font-size: 22px; font-weight: 700; color: white; }

.thumbnails { display: flex; gap: 12px; }
.thumb {
  flex: 1;
  background: #161e2b;
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}
.thumb.active { border-color: #7c3aed; color: #ffffff; }

.stock-badge { font-size: 12px; color: #22c55e; font-weight: 600; margin-bottom: 8px; }
.title { font-size: 26px; line-height: 1.25; margin-bottom: 12px; }

.price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
.price { font-size: 28px; font-weight: 800; color: #ffffff; }
.original-price { font-size: 18px; color: #6b7280; text-decoration: line-through; }

.desc { font-size: 14px; color: #9ca3af; line-height: 1.6; margin-bottom: 24px; }
.selector-group { margin-bottom: 24px; font-size: 14px; color: #cbd5e1; }

.quantity-row { display: flex; gap: 16px; }
.qty-stepper {
  display: flex;
  align-items: center;
  background: #161e2b;
  border: 1px solid #334155;
  border-radius: 8px;
}
.qty-stepper button {
  background: transparent;
  border: none;
  color: white;
  width: 36px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
}
.qty-stepper span { width: 30px; text-align: center; font-weight: 600; }

.add-to-cart-btn {
  flex: 1;
  background: #7c3aed;
  border: none;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.add-to-cart-btn:hover { background: #6d28d9; }

.notification {
  margin-top: 16px;
  padding: 10px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid #22c55e;
  border-radius: 6px;
  color: #22c55e;
  font-size: 13px;
  display: none;
}`,
    js: `const UNIT_PRICE = 299;
let qty = 1;
const thumbs = document.querySelectorAll('.thumb');
const preview = document.getElementById('previewBox');
const deviceArt = document.getElementById('deviceArt');
const selectedColorName = document.getElementById('selectedColorName');
const qtyVal = document.getElementById('qtyVal');
const btnTotal = document.getElementById('btnTotal');
const notif = document.getElementById('cartNotification');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const color = thumb.getAttribute('data-color');
    const name = thumb.getAttribute('data-name');
    preview.style.backgroundColor = color;
    deviceArt.textContent = '🎧 ' + name;
    selectedColorName.textContent = name;
  });
});

document.getElementById('qtyInc').addEventListener('click', () => {
  qty++;
  updateTotal();
});

document.getElementById('qtyDec').addEventListener('click', () => {
  if (qty > 1) {
    qty--;
    updateTotal();
  }
});

function updateTotal() {
  qtyVal.textContent = qty;
  const total = '$' + (qty * UNIT_PRICE).toFixed(2);
  btnTotal.textContent = total;
}

document.getElementById('addToCart').addEventListener('click', () => {
  notif.style.display = 'block';
  notif.textContent = 'Added ' + qty + ' unit(s) of ' + selectedColorName.textContent + ' to cart!';
  console.log('Cart updated:', { qty, total: qty * UNIT_PRICE, color: selectedColorName.textContent });
  setTimeout(() => notif.style.display = 'none', 3000);
});`
  },

  {
    id: 'login',
    name: 'Login Page',
    description: 'Developer portal authentication screen with password reveal and validation',
    category: 'Auth',
    html: `<div class="auth-card">
  <div class="auth-header">
    <div class="icon-badge">🔒</div>
    <h2>Sign In to Console</h2>
    <p>Enter your enterprise credentials to access dashboard</p>
  </div>

  <form id="loginForm" novalidate>
    <div class="field">
      <label for="email">Work Email</label>
      <input type="email" id="email" placeholder="alex@company.com" required />
      <span class="field-error" id="emailError"></span>
    </div>

    <div class="field">
      <div class="label-row">
        <label for="password">Password</label>
        <a href="#reset" class="forgot-link">Forgot?</a>
      </div>
      <div class="password-input-wrap">
        <input type="password" id="password" placeholder="••••••••••••" required />
        <button type="button" id="togglePassword" class="toggle-pwd-btn">Show</button>
      </div>
      <span class="field-error" id="pwdError"></span>
    </div>

    <div class="checkbox-row">
      <input type="checkbox" id="remember" checked />
      <label for="remember">Remember session for 30 days</label>
    </div>

    <button type="submit" class="submit-btn" id="submitBtn">Sign In</button>
  </form>

  <div id="statusAlert" class="status-alert"></div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 14px;
  padding: 36px 32px;
}

.auth-header { text-align: center; margin-bottom: 28px; }
.icon-badge { font-size: 24px; margin-bottom: 12px; }
.auth-header h2 { font-size: 22px; color: #ffffff; margin-bottom: 6px; }
.auth-header p { font-size: 13px; color: #94a3b8; }

.field { margin-bottom: 20px; }
.field label { display: block; font-size: 13px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; }
.label-row { display: flex; justify-content: space-between; align-items: baseline; }
.forgot-link { font-size: 12px; color: #7c3aed; text-decoration: none; }

.field input[type="email"],
.field input[type="password"],
.field input[type="text"] {
  width: 100%;
  background: #0d1117;
  border: 1px solid #252c36;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus { border-color: #7c3aed; }

.password-input-wrap { position: relative; }
.toggle-pwd-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}

.field-error { font-size: 12px; color: #ef4444; margin-top: 4px; display: block; min-height: 16px; }

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 13px;
  color: #94a3b8;
}

.submit-btn {
  width: 100%;
  background: #7c3aed;
  color: white;
  border: none;
  padding: 11px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover { background: #6d28d9; }

.status-alert {
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  display: none;
  text-align: center;
}
.status-alert.success { background: rgba(34, 197, 94, 0.15); color: #22c55e; border: 1px solid #22c55e; }
.status-alert.error { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid #ef4444; }`,
    js: `const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const statusAlert = document.getElementById('statusAlert');

toggleBtn.addEventListener('click', () => {
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    toggleBtn.textContent = 'Hide';
  } else {
    pwdInput.type = 'password';
    toggleBtn.textContent = 'Show';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const emailVal = emailInput.value.trim();
  const pwdVal = pwdInput.value;

  document.getElementById('emailError').textContent = '';
  document.getElementById('pwdError').textContent = '';

  if (!emailVal || !emailVal.includes('@')) {
    document.getElementById('emailError').textContent = 'Please enter a valid work email.';
    valid = false;
  }

  if (!pwdVal || pwdVal.length < 6) {
    document.getElementById('pwdError').textContent = 'Password must be at least 6 characters.';
    valid = false;
  }

  if (valid) {
    statusAlert.className = 'status-alert success';
    statusAlert.style.display = 'block';
    statusAlert.textContent = 'Authentication successful! Redirecting...';
    console.log('Login success for:', emailVal);
  }
});`
  },

  {
    id: 'contact',
    name: 'Contact Page',
    description: 'Corporate inquiry form with live validation and contact channel details',
    category: 'Forms',
    html: `<div class="contact-container">
  <div class="info-sidebar">
    <h2>Let's talk code.</h2>
    <p>Have an inquiry regarding custom enterprise solutions or support? We typically reply within 2 business hours.</p>

    <div class="channel-list">
      <div class="channel">
        <span class="icon">📍</span>
        <div>
          <h4>Office</h4>
          <p>500 Howard St, San Francisco, CA</p>
        </div>
      </div>
      <div class="channel">
        <span class="icon">✉️</span>
        <div>
          <h4>Support Email</h4>
          <p>support@previewer.internal</p>
        </div>
      </div>
      <div class="channel">
        <span class="icon">📞</span>
        <div>
          <h4>Phone Support</h4>
          <p>+1 (800) 555-0199</p>
        </div>
      </div>
    </div>
  </div>

  <div class="form-wrapper">
    <form id="contactForm">
      <div class="row">
        <div class="field">
          <label>Your Name</label>
          <input type="text" id="name" placeholder="Sarah Connor" required />
        </div>
        <div class="field">
          <label>Email Address</label>
          <input type="email" id="cEmail" placeholder="sarah@skynet.dev" required />
        </div>
      </div>

      <div class="field">
        <label>Subject</label>
        <input type="text" id="subject" placeholder="Inquiry about API throughput" required />
      </div>

      <div class="field">
        <label>Message</label>
        <textarea id="message" rows="4" placeholder="Tell us how we can help..." required></textarea>
      </div>

      <button type="submit" class="send-btn">Send Message</button>
    </form>
    <div id="contactStatus" class="contact-status"></div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 40px 20px;
}

.contact-container {
  max-width: 920px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 14px;
  overflow: hidden;
}

@media(max-width: 768px) {
  .contact-container { grid-template-columns: 1fr; }
}

.info-sidebar {
  padding: 36px;
  background: #0d1219;
  border-right: 1px solid #252c36;
}

.info-sidebar h2 { font-size: 24px; color: white; margin-bottom: 12px; }
.info-sidebar p { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 32px; }

.channel-list { display: flex; flex-direction: column; gap: 20px; }
.channel { display: flex; gap: 14px; align-items: flex-start; }
.channel .icon { font-size: 20px; }
.channel h4 { font-size: 14px; color: #f8fafc; margin-bottom: 2px; }
.channel p { font-size: 13px; color: #94a3b8; margin-bottom: 0; }

.form-wrapper { padding: 36px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media(max-width: 480px) { .row { grid-template-columns: 1fr; } }

.field { margin-bottom: 18px; }
.field label { display: block; font-size: 13px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; }
.field input, .field textarea {
  width: 100%;
  background: #0d1117;
  border: 1px solid #252c36;
  border-radius: 6px;
  padding: 10px 12px;
  color: white;
  font-size: 14px;
  outline: none;
}
.field input:focus, .field textarea:focus { border-color: #7c3aed; }

.send-btn {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.send-btn:hover { background: #6d28d9; }

.contact-status {
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  display: none;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid #22c55e;
  color: #22c55e;
}`,
    js: `document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const status = document.getElementById('contactStatus');
  status.style.display = 'block';
  status.textContent = 'Thank you ' + name + '! Your message has been dispatched successfully.';
  console.log('Inquiry submitted by:', name);
  e.target.reset();
});`
  },

  {
    id: 'pricing',
    name: 'Pricing Page',
    description: 'Tiered subscription table with monthly/annual billing switch and feature comparison',
    category: 'Commercial',
    html: `<div class="pricing-wrap">
  <div class="pricing-header">
    <h2>Predictable, transparent developer pricing</h2>
    <p>Start free for hobby projects, scale securely with production workloads.</p>

    <div class="toggle-container">
      <span class="active" id="monthlyLabel">Monthly</span>
      <button class="switch" id="billingSwitch" aria-label="Toggle Billing Period">
        <span class="thumb"></span>
      </button>
      <span id="annualLabel">Annual (Save 20%)</span>
    </div>
  </div>

  <div class="cards-grid">
    <div class="tier-card">
      <div class="tier-name">Developer</div>
      <div class="tier-price"><span class="amount" data-monthly="0" data-annual="0">$0</span> /mo</div>
      <p class="tier-desc">Ideal for experiments and personal open-source projects.</p>
      <ul class="features">
        <li>✓ 100,000 monthly requests</li>
        <li>✓ Single node deployments</li>
        <li>✓ Community forum support</li>
      </ul>
      <button class="tier-btn outline">Current Plan</button>
    </div>

    <div class="tier-card highlighted">
      <div class="highlight-badge">Most Popular</div>
      <div class="tier-name">Team Pro</div>
      <div class="tier-price"><span class="amount" data-monthly="39" data-annual="31">$39</span> /mo</div>
      <p class="tier-desc">For fast-moving software teams requiring uptime SLA and edge nodes.</p>
      <ul class="features">
        <li>✓ Unlimited monthly requests</li>
        <li>✓ Global multi-region edge</li>
        <li>✓ 99.99% Uptime Guarantee</li>
        <li>✓ Priority 24/7 Slack support</li>
      </ul>
      <button class="tier-btn primary">Upgrade to Pro</button>
    </div>

    <div class="tier-card">
      <div class="tier-name">Enterprise</div>
      <div class="tier-price"><span class="amount" data-monthly="199" data-annual="159">$199</span> /mo</div>
      <p class="tier-desc">Dedicated isolation, SOC2 compliance, and custom contracts.</p>
      <ul class="features">
        <li>✓ Dedicated VPC peering</li>
        <li>✓ Custom SAML/SSO integration</li>
        <li>✓ Custom SLA & Dedicated TAM</li>
      </ul>
      <button class="tier-btn outline">Contact Sales</button>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 40px 20px;
}

.pricing-wrap { max-width: 1040px; margin: 0 auto; text-align: center; }

.pricing-header h2 { font-size: 32px; color: #ffffff; margin-bottom: 8px; }
.pricing-header p { font-size: 16px; color: #94a3b8; margin-bottom: 28px; }

.toggle-container {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #11161d;
  border: 1px solid #252c36;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 13px;
  margin-bottom: 40px;
}
.toggle-container span.active { color: #ffffff; font-weight: 600; }
.toggle-container span { color: #94a3b8; }

.switch {
  width: 44px;
  height: 24px;
  background: #252c36;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}
.switch.annual { background: #7c3aed; }
.switch .thumb {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
}
.switch.annual .thumb { transform: translateX(20px); }

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  text-align: left;
}

.tier-card {
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 12px;
  padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.tier-card.highlighted { border-color: #7c3aed; background: #131922; }

.highlight-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #7c3aed;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.tier-name { font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
.tier-price { font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
.tier-desc { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 24px; }

.features { list-style: none; margin-bottom: 32px; flex-grow: 1; }
.features li { font-size: 13px; color: #cbd5e1; margin-bottom: 10px; }

.tier-btn {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.tier-btn.primary { background: #7c3aed; color: white; border: none; }
.tier-btn.primary:hover { background: #6d28d9; }
.tier-btn.outline { background: transparent; border: 1px solid #334155; color: #e2e8f0; }
.tier-btn.outline:hover { background: #1e293b; }`,
    js: `const toggle = document.getElementById('billingSwitch');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const amounts = document.querySelectorAll('.amount');
let isAnnual = false;

toggle.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggle.classList.toggle('annual', isAnnual);
  monthlyLabel.classList.toggle('active', !isAnnual);
  annualLabel.classList.toggle('active', isAnnual);

  amounts.forEach(span => {
    const val = isAnnual ? span.getAttribute('data-annual') : span.getAttribute('data-monthly');
    span.textContent = '$' + val;
  });
  console.log('Billing mode switched to:', isAnnual ? 'Annual' : 'Monthly');
});`
  },

  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Modern developer analytics metrics dashboard with live status cards and activity stream',
    category: 'Admin',
    html: `<div class="dash-container">
  <header class="dash-top">
    <div>
      <h1>Telemetry Analytics</h1>
      <p class="subtitle">System cluster: us-east-prod-04 · Latency: 14ms</p>
    </div>
    <button class="refresh-dash-btn" id="refreshMetrics">Refresh Stream</button>
  </header>

  <section class="stat-grid">
    <div class="stat-card">
      <div class="stat-title">API Requests</div>
      <div class="stat-val" id="reqMetric">4.82M</div>
      <div class="stat-delta pos">+12.4% vs last week</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">P99 Latency</div>
      <div class="stat-val" id="latMetric">18.2ms</div>
      <div class="stat-delta pos">-3.1ms improvement</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">Error Rate</div>
      <div class="stat-val" id="errMetric">0.004%</div>
      <div class="stat-delta neg">Optimal</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">Active Workers</div>
      <div class="stat-val">128 / 128</div>
      <div class="stat-delta pos">100% capacity</div>
    </div>
  </section>

  <section class="events-panel">
    <h3>Live Stream Activity</h3>
    <table class="event-table">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Endpoint</th>
          <th>Status</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody id="eventBody">
        <tr>
          <td>12:44:02</td>
          <td>POST /v1/telemetry/batch</td>
          <td><span class="badge success">200 OK</span></td>
          <td>12ms</td>
        </tr>
        <tr>
          <td>12:44:01</td>
          <td>GET /v1/auth/tokens</td>
          <td><span class="badge success">200 OK</span></td>
          <td>8ms</td>
        </tr>
      </tbody>
    </table>
  </section>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 30px 20px;
}

.dash-container { max-width: 980px; margin: 0 auto; }

.dash-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.dash-top h1 { font-size: 24px; color: white; }
.subtitle { font-size: 13px; color: #94a3b8; }

.refresh-dash-btn {
  background: #151b23;
  border: 1px solid #252c36;
  color: #cbd5e1;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
}
.refresh-dash-btn:hover { background: #1e2633; color: white; }

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 10px;
  padding: 20px;
}
.stat-title { font-size: 12px; color: #9ca3af; text-transform: uppercase; margin-bottom: 8px; }
.stat-val { font-size: 26px; font-weight: 800; color: white; margin-bottom: 6px; }
.stat-delta { font-size: 12px; }
.stat-delta.pos { color: #22c55e; }
.stat-delta.neg { color: #7c3aed; }

.events-panel {
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 10px;
  padding: 24px;
}
.events-panel h3 { font-size: 16px; margin-bottom: 16px; color: white; }

.event-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.event-table th { text-align: left; color: #64748b; padding: 10px; border-bottom: 1px solid #252c36; }
.event-table td { padding: 12px 10px; border-bottom: 1px solid #1a222d; color: #cbd5e1; }

.badge { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.badge.success { background: rgba(34, 197, 94, 0.15); color: #22c55e; }`,
    js: `const refreshBtn = document.getElementById('refreshMetrics');
const eventBody = document.getElementById('eventBody');
const reqMetric = document.getElementById('reqMetric');

refreshBtn.addEventListener('click', () => {
  const now = new Date().toTimeString().split(' ')[0];
  const endpoints = ['/v1/query/analytics', '/v1/cache/purge', '/v1/ingest/stream'];
  const ep = endpoints[Math.floor(Math.random() * endpoints.length)];
  const duration = Math.floor(Math.random() * 20 + 5) + 'ms';

  const row = document.createElement('tr');
  row.innerHTML = \`<td>\${now}</td><td>\${ep}</td><td><span class="badge success">200 OK</span></td><td>\${duration}</td>\`;
  eventBody.prepend(row);

  const current = (parseFloat(reqMetric.textContent) + 0.05).toFixed(2);
  reqMetric.textContent = current + 'M';
  console.log('Simulated metric update:', { ep, duration, totalReq: current });
});`
  },

  {
    id: 'blog',
    name: 'Blog Page',
    description: 'Clean typography article reading layout with progress bar and reaction counter',
    category: 'Content',
    html: `<div class="read-progress" id="progressBar"></div>

<article class="article-container">
  <div class="article-meta">Systems Architecture · Published Oct 6, 2026 · 6 min read</div>
  <h1 class="article-title">Zero-Copy Memory Serialization for Real-Time Canvas Engines</h1>
  
  <div class="author-row">
    <div class="author-avatar">JD</div>
    <div>
      <div class="author-name">Julian Vance</div>
      <div class="author-role">Graphics Systems Engineer</div>
    </div>
  </div>

  <div class="content">
    <p class="lead">When handling tens of thousands of dynamic procedural vector primitives at 120 FPS, the overhead of standard garbage-collected JSON parsing dominates frame budgets.</p>
    
    <h2>1. The Memory Allocation Bottleneck</h2>
    <p>Modern browser JavaScript execution is astonishingly fast, but frequent heap allocations trigger unpredictable garbage collector pauses. By migrating to structured typed arrays and ArrayBuffers shared across Web Workers, memory stays contiguous and zero-copy.</p>

    <blockquote>
      "Contiguous memory layouts are the single most significant predictor of stable frame latency under heavy vector graphics loads."
    </blockquote>

    <h2>2. Implementation Blueprint</h2>
    <p>Using raw Float32Array buffers, position transforms, vertices, and draw calls are prepared in parallel and committed via transferables directly to the WebGL rendering context.</p>
  </div>

  <footer class="article-footer">
    <button class="clap-btn" id="clapBtn">👏 Claps (<span id="clapCount">42</span>)</button>
    <button class="share-btn" id="shareBtn">Copy Article Link</button>
  </footer>
</article>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.7;
}

.read-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #7c3aed;
  width: 25%;
  z-index: 100;
}

.article-container {
  max-width: 680px;
  margin: 60px auto;
  padding: 0 20px;
}

.article-meta { font-size: 13px; color: #7c3aed; font-weight: 600; margin-bottom: 12px; }
.article-title { font-size: 34px; font-weight: 800; line-height: 1.25; color: #ffffff; margin-bottom: 24px; }

.author-row { display: flex; align-items: center; gap: 14px; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid #1e2633; }
.author-avatar { width: 44px; height: 44px; border-radius: 50%; background: #252c36; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #a855f7; }
.author-name { font-size: 15px; font-weight: 600; color: white; }
.author-role { font-size: 13px; color: #94a3b8; }

.content p.lead { font-size: 18px; color: #cbd5e1; margin-bottom: 24px; line-height: 1.6; }
.content h2 { font-size: 22px; color: white; margin: 36px 0 16px; }
.content p { font-size: 16px; color: #94a3b8; margin-bottom: 20px; }

blockquote {
  border-left: 3px solid #7c3aed;
  padding-left: 20px;
  margin: 28px 0;
  font-style: italic;
  color: #cbd5e1;
  font-size: 17px;
}

.article-footer { display: flex; gap: 14px; margin-top: 48px; padding-top: 24px; border-top: 1px solid #1e2633; }
.clap-btn, .share-btn {
  background: #151b23;
  border: 1px solid #252c36;
  color: #cbd5e1;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
}
.clap-btn:hover { background: #1f2937; color: white; }
.share-btn:hover { background: #1f2937; color: white; }`,
    js: `let claps = 42;
const clapBtn = document.getElementById('clapBtn');
const clapCount = document.getElementById('clapCount');

clapBtn.addEventListener('click', () => {
  claps++;
  clapCount.textContent = claps;
  console.log('Applauded article, total claps:', claps);
});

document.getElementById('shareBtn').addEventListener('click', () => {
  console.log('Article share link copied');
  alert('Article link copied to clipboard!');
});`
  },

  {
    id: 'coming-soon',
    name: 'Coming Soon Page',
    description: 'Product launch teaser with live countdown timer and email pre-registration',
    category: 'Marketing',
    html: `<div class="teaser-wrapper">
  <div class="teaser-card">
    <div class="logo-mark">🚀</div>
    <div class="status-pill">Private Alpha Launch</div>
    <h1>QuantumGrid is launching in</h1>
    
    <div class="timer" id="countdown">
      <div class="time-block"><span class="num" id="days">14</span><span class="lbl">Days</span></div>
      <div class="time-block"><span class="num" id="hours">08</span><span class="lbl">Hours</span></div>
      <div class="time-block"><span class="num" id="mins">32</span><span class="lbl">Mins</span></div>
      <div class="time-block"><span class="num" id="secs">50</span><span class="lbl">Secs</span></div>
    </div>

    <p class="teaser-sub">The next evolutionary leap for headless vector computation. Join 12,000+ engineers waiting on the early access list.</p>

    <form id="notifyForm" class="notify-form">
      <input type="email" id="earlyEmail" placeholder="Enter your developer email..." required />
      <button type="submit">Get Early Invite</button>
    </form>
    <div id="notifyMsg" class="notify-msg"></div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f14;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.teaser-wrapper { max-width: 600px; width: 100%; text-align: center; }

.teaser-card {
  background: #11161d;
  border: 1px solid #252c36;
  border-radius: 16px;
  padding: 48px 36px;
}

.logo-mark { font-size: 36px; margin-bottom: 12px; }

.status-pill {
  display: inline-block;
  background: #1b1629;
  border: 1px solid #7c3aed;
  color: #c084fc;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

h1 { font-size: 28px; color: white; margin-bottom: 28px; }

.timer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 28px;
}

.time-block {
  background: #0d1117;
  border: 1px solid #252c36;
  border-radius: 10px;
  width: 76px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
}
.time-block .num { font-size: 26px; font-weight: 800; color: #ffffff; }
.time-block .lbl { font-size: 11px; color: #64748b; text-transform: uppercase; margin-top: 2px; }

.teaser-sub { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 32px; }

.notify-form { display: flex; gap: 8px; }
@media(max-width: 480px) { .notify-form { flex-direction: column; } }

.notify-form input {
  flex: 1;
  background: #0d1117;
  border: 1px solid #252c36;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 14px;
  outline: none;
}
.notify-form input:focus { border-color: #7c3aed; }

.notify-form button {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.notify-form button:hover { background: #6d28d9; }

.notify-msg {
  margin-top: 16px;
  font-size: 13px;
  color: #22c55e;
  display: none;
}`,
    js: `let totalSeconds = 14 * 86400 + 8 * 3600 + 32 * 60 + 50;

function updateCountdown() {
  if (totalSeconds <= 0) return;
  totalSeconds--;

  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  document.getElementById('days').textContent = String(d).padStart(2, '0');
  document.getElementById('hours').textContent = String(h).padStart(2, '0');
  document.getElementById('mins').textContent = String(m).padStart(2, '0');
  document.getElementById('secs').textContent = String(s).padStart(2, '0');
}

setInterval(updateCountdown, 1000);

document.getElementById('notifyForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('earlyEmail').value;
  const msg = document.getElementById('notifyMsg');
  msg.style.display = 'block';
  msg.textContent = 'Invite spot reserved for ' + email + '! Check your inbox.';
  console.log('Early invite reserved:', email);
  e.target.reset();
});`
  }
];
