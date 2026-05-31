import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Soumya Naiya — AI Engineer / ML Enthusiast / Startup Builder',
  description:
    'Interactive portfolio of Soumya Naiya: AI builder, startup-minded engineer, and product thinker. Not just a student. A builder.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/JetBrainsMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Geist-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="bg-ambient" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
