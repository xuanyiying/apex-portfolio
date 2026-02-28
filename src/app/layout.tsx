import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/lib/ThemeProvider';
import { heroContent } from '@/data';

const outfit = localFont({
  src: './fonts/Outfit-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const orbitron = localFont({
  src: './fonts/Orbitron-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${heroContent.name} | ${heroContent.title}`,
  description: heroContent.description,
  keywords: ['Full Stack Developer', 'React', 'Node.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: heroContent.name }],
  openGraph: {
    title: `${heroContent.name} | ${heroContent.title}`,
    description: heroContent.description,
    type: 'website',
    url: 'https://udefined.cc',
    siteName: heroContent.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${heroContent.name} | ${heroContent.title}`,
    description: heroContent.description,
  },
  alternates: {
    canonical: 'https://udefined.cc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
