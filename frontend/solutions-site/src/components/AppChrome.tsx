'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { QuoteModalRoot } from '@/components/QuoteModalRoot';
import { ChatbotWidget } from '@/components/ChatbotWidget';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEcpTrainer = pathname?.startsWith('/ecp-trainer');

  return (
    <>
      {isEcpTrainer ? null : <AnnouncementBanner />}
      {isEcpTrainer ? null : <Navbar />}
      <main id="main-content" className="min-h-screen">{children}</main>
      {isEcpTrainer ? null : <Footer />}
      {isEcpTrainer ? null : <QuoteModalRoot />}
      {isEcpTrainer ? null : <ChatbotWidget />}
    </>
  );
}
