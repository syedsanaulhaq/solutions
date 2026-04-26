import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://solutions.hostingocean.com'
  ),
  title: {
    default: 'HostingOcean Solutions — Web Hosting, Domains & AI',
    template: '%s | HostingOcean Solutions',
  },
  description:
    'HostingOcean Solutions delivers professional web hosting, domain registration, SSL certificates, business email, managed LMS, and AI-powered services — all on AWS infrastructure.',
  keywords: [
    'web hosting', 'domain registration', 'SSL certificate', 'VPS hosting',
    'managed LMS', 'Moodle hosting', 'AI chatbot', 'business email',
  ],
  openGraph: {
    type: 'website',
    siteName: 'HostingOcean Solutions',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
