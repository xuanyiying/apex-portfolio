import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alex Chen | Full Stack Developer',
  description: 'Passionate full-stack developer creating stunning digital experiences. Building the digital future with modern technologies.',
  keywords: ['Full Stack Developer', 'React', 'Node.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Alex Chen' }],
  openGraph: {
    title: 'Alex Chen | Full Stack Developer',
    description: 'Passionate full-stack developer creating stunning digital experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
