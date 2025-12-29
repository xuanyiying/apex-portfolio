import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/ThemeProvider';
import { heroContent } from '@/data';

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
