'use client';

import React from 'react';
import Image from 'next/image';
import {
  Code2,
  Play,
  Monitor,
  Terminal,
  ShieldCheck,
  FolderSync,
  Download,
  HelpCircle,
  ArrowUp,
  FileCode2,
  Sparkles,
  Layers,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export function GuideSection() {
  const scrollToEditor = () => {
    const editorEl = document.getElementById('editor');
    if (editorEl) {
      editorEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="guide"
      aria-label="HTML Previewer Guide, Documentation and FAQ"
      className="w-full bg-[var(--bg-main)] text-[var(--text-primary)] border-t border-[var(--border-color)] transition-colors py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Main Section Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-1">
            <Image
              src="/logo.png"
              alt="HTML Previewer Logo"
              width={72}
              height={72}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain shadow-xl border border-[var(--border-color)] bg-[#0B0F14]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20">
            <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Developer Guide & Documentation</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Free Online HTML Previewer – Live HTML, CSS &amp; JS Preview
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            A fast, standalone browser playground designed for web developers, designers, and students.
            Write or paste HTML, CSS, and JavaScript code to test markup, experiment with styles, and inspect live output with zero build setup.
          </p>

          <div className="pt-2 flex justify-center">
            <a
              href="#editor"
              onClick={(e) => {
                e.preventDefault();
                scrollToEditor();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
              <span>Open Code Playground</span>
            </a>
          </div>
        </div>

        {/* What an HTML Previewer Does */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
              <Play className="w-5 h-5 fill-current" aria-hidden="true" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Instant Live Rendering</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Updates your preview automatically as you type. Combined HTML, CSS, and JavaScript are evaluated in an isolated browser iframe with near-zero latency.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Sandboxed &amp; Private</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Code runs 100% client-side in your local browser sandbox. Drafts and projects are stored exclusively in your browser&apos;s localStorage—no remote database uploads.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center">
              <Terminal className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Integrated Dev Console</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Intercepts console.log, info, warn, and error calls from your sandbox scripts so you can debug JavaScript logic without digging through browser devtools.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              How to Paste HTML and Preview the Result
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Follow these simple steps to start writing, testing, or debugging frontend code immediately:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">1</span>
                <span>Select Tab</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Choose HTML, CSS, or JS</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Click the HTML, CSS, or JS tab on the editor toolbar to switch between markup, styling, and scripting panes.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">2</span>
                <span>Write or Paste</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Insert Your Code</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Paste snippets from documentation or write fresh code. Use Ctrl + Shift + F to auto-format syntax and clean indentation.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">3</span>
                <span>Run Preview</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Instant Compilation</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Keep Auto-Run enabled for instant debounced re-renders, or press Ctrl + Enter to re-render manually on demand.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">4</span>
                <span>Test &amp; Export</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Inspect &amp; Download</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Switch to Tablet or Mobile viewports to verify responsiveness, check the console for logs, and export your HTML file.
              </p>
            </div>
          </div>
        </div>

        {/* How HTML, CSS, and JavaScript Support Works */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              How HTML, CSS, and JavaScript Support Works
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Built on browser standards to provide a lightweight, realistic execution environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Safe Sandboxed Iframe Execution</h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                The preview engine compiles your HTML, CSS, and JS into a clean data document loaded inside an iframe protected with <code className="px-1 py-0.5 rounded text-[11px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">sandbox=&quot;allow-scripts allow-modals allow-forms&quot;</code>. This isolates runtime execution from the host application while allowing DOM scripts, canvas elements, animations, and forms to function properly.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Responsive Viewport Simulation</h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Simulate multiple screen sizes directly in your browser. Switch seamlessly between Desktop (fluid 100% width), Tablet (768px width), and Mobile (375px width) viewports. Scale controls (50%, 75%, 100%, and Fit) let you test responsive CSS media queries without resizing your browser window.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-sky-500" aria-hidden="true" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Live Console Stream</h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                A custom bridge intercepts JavaScript console events (<code className="px-1 py-0.5 rounded text-[11px] bg-[var(--bg-secondary)]">console.log</code>, <code className="px-1 py-0.5 rounded text-[11px] bg-[var(--bg-secondary)]">warn</code>, <code className="px-1 py-0.5 rounded text-[11px] bg-[var(--bg-secondary)]">error</code>, and <code className="px-1 py-0.5 rounded text-[11px] bg-[var(--bg-secondary)]">info</code>) and mirrors them into the collapsible Console panel with color-coded severity badges, timestamps, and log clear buttons.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center gap-2.5">
                <FolderSync className="w-5 h-5 text-purple-400" aria-hidden="true" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Local Storage Project Management</h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                All drafts and editor settings are persisted locally in your browser storage. You can create new projects, duplicate existing drafts, rename files, or restore templates at any time. When you are ready, download a single production-ready <code className="px-1 py-0.5 rounded text-[11px] bg-[var(--bg-secondary)]">.html</code> file with your markup, styles, and scripts combined.
              </p>
            </div>
          </div>
        </div>

        {/* Common Use Cases */}
        <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              Common Use Cases for Developers, Students, and Beginners
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Why engineers and learners choose HTML Previewer over complex local toolchains:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Rapid UI Component Prototyping</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Design and test navigation bars, cards, modals, CSS grids, flexbox layouts, and animation keyframes in isolation before adding them to your production repository.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Learning &amp; Teaching Web Development</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Students and educators can explore HTML5 tags, CSS cascade rules, and JavaScript DOM manipulation without installing Node.js, code extensions, or local servers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">HTML Email &amp; Newsletter Testing</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Paste inline CSS templates and HTML email structures to inspect table alignment, typography rendering, and fallback styling across responsive widths.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Bug Reproduction &amp; Snippet Verification</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Isolate problematic CSS rules, test third-party CSS frameworks, or verify JavaScript logic quickly without pollution from project build steps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Everything you need to know about using HTML Previewer safely and effectively.
            </p>
          </div>

          <div className="space-y-3">
            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>What is an HTML Previewer?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                An HTML Previewer is an in-browser code editor and live preview tool. It gives you separate tabs for writing HTML markup, CSS styling, and JavaScript logic, compiling them on the fly into an isolated sandbox iframe so you can preview the rendered output instantly without setting up a local web server.
              </p>
            </details>

            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>How do I paste HTML and preview the result?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                Click the HTML tab in the code editor, paste or type your HTML code, and the live preview updates automatically in the preview panel. You can also paste stylesheets into the CSS tab and script logic into the JS tab. To refresh manually, press Ctrl + Enter or click the Run button.
              </p>
            </details>

            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>Is my code private and safe from remote servers?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                Yes. All code compilation, execution, and state persistence happen strictly on your client machine inside your browser. Drafts and settings are saved exclusively to your browser&apos;s local storage (localStorage). No code is sent, logged, or stored on any remote backend server.
              </p>
            </details>

            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>Can I test JavaScript and view console errors or logs?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                Yes. HTML Previewer features a built-in Console panel. Any calls to console.log, console.warn, console.error, or console.info in your JavaScript code are intercepted and streamed directly into the bottom console drawer, complete with line numbers and message filtering.
              </p>
            </details>

            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>How do I test responsive design across mobile and tablet screens?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                Use the device toolbar at the top of the preview panel. Click Desktop for fluid full-width rendering, Tablet for a 768px wide viewport, or Mobile for a 375px wide smartphone canvas. You can also adjust the zoom level (Fit, 50%, 75%, 100%) to fit smaller screens.
              </p>
            </details>

            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>Can I import existing HTML files or export my work?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                Yes. Click the Import button on the header to load any local .html or .htm file from your computer. You can also click Download to export a single, self-contained HTML file containing your HTML markup, embedded CSS styling, and JavaScript logic.
              </p>
            </details>

            <details className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-5 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-[var(--text-primary)] select-none">
                <span>Is HTML Previewer free to use?</span>
                <span className="text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                Yes, it is 100% free with no account creation, sign-up, or API key required. You can use it as often as you want directly from any modern web browser.
              </p>
            </details>
          </div>
        </div>

        {/* Footer & Back to Editor Navigation */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="HTML Previewer Logo"
              width={24}
              height={24}
              className="w-6 h-6 rounded-md object-contain border border-[var(--border-color)] bg-[#0B0F14]"
              referrerPolicy="no-referrer"
            />
            <span className="font-semibold text-[var(--text-primary)]">
              <span>HTML</span> <span className="text-[#A78BFA]">Previewer</span>
            </span>
            <span>·</span>
            <span>Write code. Preview instantly.</span>
          </div>

          <a
            href="#editor"
            onClick={(e) => {
              e.preventDefault();
              scrollToEditor();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] font-semibold transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
            <span>Back to Editor</span>
          </a>
        </div>
      </div>
    </section>
  );
}
