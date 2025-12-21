import { Link } from 'react-router-dom';
import { Smartphone, MessageSquare, AtSign, MapPinned, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const contactItems = [
    { icon: Smartphone, label: t.contact.phone, value: '+33 7 80 78 36 10', href: 'tel:+33780783610' },
    { icon: MessageSquare, label: t.contact.whatsapp, value: '+33 7 48 42 43 75', href: 'https://wa.me/33748424375' },
    { icon: AtSign, label: t.contact.email, value: 'contact@aaautoexport.com', href: 'mailto:contact@aaautoexport.com' },
    { icon: MapPinned, label: t.contact.address, value: 'Paris, France', href: 'https://maps.app.goo.gl/bmsZZZa5o2wLAzDb8' },
  ];

  return (
    <section ref={ref} className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t.contact.title}
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              {t.contact.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    "group flex items-center gap-4 p-4 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-accent/50 transition-all duration-300",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: isInView ? `${(index + 1) * 100}ms` : '0ms' }}
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/60 text-sm">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className={cn(
            "bg-primary-foreground/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-primary-foreground/10 transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h3 className="font-heading text-2xl font-bold mb-4">
              {t.form.title}
            </h3>
            <p className="text-primary-foreground/70 mb-8">
              {t.form.subtitle}
            </p>
            <Button variant="hero" size="xl" className="w-full" asChild>
              <Link to="/request" className="group">
                {t.nav.requestQuote}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
