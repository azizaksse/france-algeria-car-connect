import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  const content = {
    fr: {
      title: 'Nous utilisons des cookies',
      description: 'Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic.',
      accept: 'Accepter',
      decline: 'Refuser',
    },
    ar: {
      title: 'نستخدم ملفات تعريف الارتباط',
      description: 'يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك وتحليل حركة المرور.',
      accept: 'قبول',
      decline: 'رفض',
    },
  };

  const t = content[language];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50',
        'bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50',
        'shadow-glass p-6',
        'animate-fade-in-up'
      )}
    >
      <button
        onClick={handleDecline}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5 text-accent" />
        </div>
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-foreground">
            {t.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.description}
          </p>
          <div className="flex gap-3">
            <Button variant="accent" size="sm" onClick={handleAccept}>
              {t.accept}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDecline}>
              {t.decline}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
