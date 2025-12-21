import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingWhatsApp = () => {
  const phoneNumber = '33748424375';
  const message = encodeURIComponent('Bonjour, je souhaite avoir des informations sur vos services d\'exportation de véhicules.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-14 h-14 rounded-full',
        'bg-[#25D366] hover:bg-[#20BD5A]',
        'flex items-center justify-center',
        'shadow-[0_4px_20px_rgba(37,211,102,0.4)]',
        'transition-all duration-300',
        'hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)]',
        'animate-pulse-slow'
      )}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

export default FloatingWhatsApp;
