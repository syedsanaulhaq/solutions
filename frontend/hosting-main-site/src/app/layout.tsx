import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'HostingOcean — Reliable UK Web Hosting, VPS & Domains',
    template: '%s | HostingOcean',
  },
  description:
    'UK-based web hosting, VPS servers, dedicated servers and domain registration. Fast, secure, and fully managed with 24/7 UK support.',
  metadataBase: new URL('https://www.hostingocean.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.hostingocean.co.uk',
    siteName: 'HostingOcean',
    title: 'HostingOcean — Reliable UK Web Hosting, VPS & Domains',
    description:
      'UK-based web hosting, VPS servers, dedicated servers and domain registration. Fast, secure, and fully managed with 24/7 UK support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HostingOcean — Reliable UK Web Hosting',
    description: 'Fast, secure UK web hosting with 24/7 support.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
