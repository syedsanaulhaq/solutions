import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { QuoteModalRoot } from '@/components/QuoteModalRoot';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { defaultMetadata, organizationSchema, websiteSchema } from '@/lib/seo';

export { defaultMetadata as metadata };

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        {/* ── JSON-LD: Organization + WebSite ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
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
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <QuoteModalRoot />
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
