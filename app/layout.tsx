import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0B0F14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://html-previewer-steel.vercel.app'),
  title: 'Free Online HTML Previewer – Live HTML, CSS & JS Preview',
  description:
    'Free online HTML previewer and sandbox. Write, test, and preview HTML, CSS, and JavaScript in real time with an instant sandboxed iframe, responsive viewports, and developer console.',
  alternates: {
    canonical: 'https://html-previewer-steel.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Free Online HTML Previewer – Live HTML, CSS & JS Preview',
    description:
      'Free online HTML previewer and sandbox. Write, test, and preview HTML, CSS, and JavaScript in real time with an instant sandboxed iframe, responsive viewports, and developer console.',
    url: 'https://html-previewer-steel.vercel.app/',
    siteName: 'HTML Previewer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online HTML Previewer – Live HTML, CSS & JS Preview',
    description:
      'Free online HTML previewer and sandbox. Write, test, and preview HTML, CSS, and JavaScript in real time with an instant sandboxed iframe, responsive viewports, and developer console.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className="font-sans antialiased transition-colors" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
