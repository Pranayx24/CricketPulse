import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CricketPulse Live - Real-time Cricket Scores',
  description: 'Fast, live cricket scores, latest updates, and match stats.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark text-foreground min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
