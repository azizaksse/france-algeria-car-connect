import { Helmet } from 'react-helmet-async';
import { Smartphone, MessageSquare, AtSign, MapPinned, Timer } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const Contact = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const contactInfo = [
    {
      icon: Smartphone,
      label: t.contact.phone,
      value: '+33 7 80 78 36 10',
      href: 'tel:+33780783610',
      description: language === 'fr' ? 'Appelez-nous directement' : 'اتصل بنا مباشرة',
    },
    {
      icon: MessageSquare,
      label: t.contact.whatsapp,
      value: '+33 7 48 42 43 75',
      href: 'https://wa.me/33748424375',
      description: language === 'fr' ? 'Écrivez-nous sur WhatsApp' : 'راسلنا على واتساب',
    },
    {
      icon: AtSign,
      label: t.contact.email,
      value: 'contact@aaautoexport.com',
      href: 'mailto:contact@aaautoexport.com',
      description: language === 'fr' ? 'Envoyez-nous un email' : 'أرسل لنا بريدًا إلكترونيًا',
    },
    {
      icon: MapPinned,
      label: t.contact.address,
      value: 'Paris, France',
      href: 'https://maps.app.goo.gl/bmsZZZa5o2wLAzDb8',
      description: language === 'fr' ? 'Notre siège social' : 'مقرنا الرئيسي',
    },
  ];

  const hours = [
    { day: language === 'fr' ? 'Lundi - Vendredi' : 'الإثنين - الجمعة', time: '09:00 - 18:00' },
    { day: language === 'fr' ? 'Samedi' : 'السبت', time: '10:00 - 16:00' },
    { day: language === 'fr' ? 'Dimanche' : 'الأحد', time: language === 'fr' ? 'Fermé' : 'مغلق' },
  ];

  return (
    <>
      <Helmet>
        <title>
          {language === 'fr' ? 'Contact - AA AUTO EXPORT' : 'اتصل بنا - AA AUTO EXPORT'}
        </title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? 'Contactez AA AUTO EXPORT pour toute question sur l\'exportation de véhicules vers l\'Algérie.'
              : 'اتصل بـ AA AUTO EXPORT لأي سؤال حول تصدير السيارات إلى الجزائر.'
          }
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.contact.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg">
                {t.contact.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section ref={ref} className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    "group bg-card border border-border rounded-2xl p-6 hover:border-accent/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: isInView ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="text-muted-foreground text-sm mb-1">{item.label}</div>
                  <div className="font-heading font-semibold text-foreground mb-1">{item.value}</div>
                  <div className="text-muted-foreground text-sm">{item.description}</div>
                </a>
              ))}
            </div>

            {/* Hours & Map */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Hours */}
              <div className={cn(
                "bg-card border border-border rounded-2xl p-8 transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Timer className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {language === 'fr' ? 'Horaires d\'ouverture' : 'ساعات العمل'}
                  </h2>
                </div>
                <div className="space-y-4">
                  {hours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                      <span className="text-foreground font-medium">{item.day}</span>
                      <span className="text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <a
                href="https://maps.app.goo.gl/bmsZZZa5o2wLAzDb8"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "bg-secondary/50 border border-border rounded-2xl overflow-hidden transition-all duration-700 delay-100 block hover:border-accent/50",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="h-full min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPinned className="w-12 h-12 text-accent mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-2">
                      {language === 'fr' ? 'Voir sur Google Maps' : 'عرض على خرائط جوجل'}
                    </p>
                    <p className="text-muted-foreground">
                      {language === 'fr' ? 'Paris, France' : 'باريس، فرنسا'}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
