import React from 'react';

export function StructuredData() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HTML Previewer',
    alternateName: 'Free Online HTML Previewer',
    url: 'https://html-previewer-steel.vercel.app/',
    image: 'https://html-previewer-steel.vercel.app/logo.png',
    logo: 'https://html-previewer-steel.vercel.app/logo.png',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    description:
      'Free online HTML previewer and sandbox. Write, test, and preview HTML in real time with an instant sandboxed iframe, responsive viewports, and developer console.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time live HTML code preview',
      'Sandboxed iframe execution for security and isolation',
      'Multi-device responsive testing (Desktop, Tablet, Mobile)',
      'Built-in developer console intercepting logs, errors, and warnings',
      'Instant code formatting and auto-indentation',
      'Local browser persistence without cloud tracking',
      'Single-file HTML import and export',
      'Dark and Light theme support',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
    />
  );
}
