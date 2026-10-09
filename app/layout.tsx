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
  title: 'HTML Previewer - Write code. Preview instantly.',
  description: 'A standalone professional web-based HTML, CSS, and JavaScript playground with live sandboxed preview, device modes, and developer console.',
  openGraph: {
    title: 'HTML Previewer - Write code. Preview instantly.',
    description: 'A standalone professional web-based HTML, CSS, and JavaScript playground with live sandboxed preview, device modes, and developer console.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Previewer - Write code. Preview instantly.',
    description: 'A standalone professional web-based HTML, CSS, and JavaScript playground with live sandboxed preview, device modes, and developer console.',
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
