import type { Metadata } from 'next';
import { Outfit, Orbitron } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/ThemeProvider';
import { heroContent } from '@/data';
import CustomCursor from '@/components/CustomCursor';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
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
          <CustomCursor />
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
