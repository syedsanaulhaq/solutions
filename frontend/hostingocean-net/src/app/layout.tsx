import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'HostingOcean.net — Pakistan Web Hosting, VPS & Domains',
    template: '%s | HostingOcean.net',
  },
  description:
    'Pakistan\'s trusted web hosting provider. Affordable web hosting, VPS servers, dedicated servers and .pk domain registration. Fast, secure, and fully managed with 24/7 Pakistan support.',
  metadataBase: new URL('https://www.hostingocean.net'),
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://www.hostingocean.net',
    siteName: 'HostingOcean.net',
    title: 'HostingOcean.net — Pakistan Web Hosting, VPS & Domains',
    description:
      'Pakistan\'s trusted web hosting provider. Affordable web hosting, VPS and domain registration with 24/7 support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HostingOcean.net — Pakistan Web Hosting',
    description: 'Fast, secure web hosting for Pakistani businesses. Starting from Rs. 999/month.',
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
    <html lang="en-PK" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[#15803D] focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-[calc(100vh-4rem)] flex flex-col">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
