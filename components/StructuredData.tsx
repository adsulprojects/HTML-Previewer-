import React from 'react';

export function StructuredData() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HTML Previewer',
    alternateName: 'Free Online HTML Previewer',
    url: 'https://html-previewer-steel.vercel.app/',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    description:
      'Free online HTML previewer and sandbox. Write, test, and preview HTML, CSS, and JavaScript in real time with an instant sandboxed iframe, responsive viewports, and developer console.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time live HTML, CSS, and JavaScript code preview',
      'Sandboxed iframe execution for security and isolation',
      'Multi-device responsive testing (Desktop, Tablet, Mobile)',
      'Built-in developer console intercepting logs, errors, and warnings',
      'Instant code formatting and auto-indentation',
      'Local browser persistence without cloud tracking',
      'Single-file HTML import and export',
      'Dark and Light theme support',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an HTML Previewer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An HTML Previewer is an in-browser code editor and live preview tool that lets you write, paste, and test HTML markup, CSS styling, and JavaScript logic simultaneously, rendering the resulting web page live in a secure, sandboxed iframe.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I paste HTML and preview the result?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select the HTML tab in the code editor, paste or type your HTML markup, and watch the preview update immediately in the sandbox pane. You can enable Auto-Run for live updates or click the Run button (Ctrl+Enter) to re-render manually.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my code private and safe from remote servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All code compilation, execution, and state persistence happen strictly on your client machine inside your browser. Drafts and settings are saved exclusively to your browser local storage (localStorage). No code is sent, logged, or stored on any remote backend server.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I test JavaScript and view console errors or logs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. HTML Previewer includes an integrated Developer Console panel that captures console.log, console.info, console.warn, and console.error messages emitted from your sandbox script in real time, with severity filters and clear actions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test responsive design across mobile and tablet screens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click the viewport switcher buttons above the preview pane to test your design across simulated Desktop (100% fluid), Tablet (768px), or Mobile (375px) screen sizes. You can also adjust the zoom scale (Fit, 50%, 75%, 100%) to fit your screen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I import existing HTML files or export my work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can click Import on the header to load any local .html or .htm file from your computer, or click Download to export a clean, combined single-file HTML document bundling your HTML markup, embedded CSS styling, and JavaScript logic.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is HTML Previewer free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this tool is 100% free with no account creation, sign-up, or API key required.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
