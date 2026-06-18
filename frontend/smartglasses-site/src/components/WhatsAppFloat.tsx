import { whatsappLink, site } from '@/lib/site';
import { MessageCircle } from 'lucide-react';

/** Floating WhatsApp button shown on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(`Hi ${site.name}! I'd like to know more about your smart glasses.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
