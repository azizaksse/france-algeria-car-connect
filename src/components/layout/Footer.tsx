import { Link } from 'react-router-dom';
import { CarFront, Smartphone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  const openingHours = [
    { day: language === 'fr' ? 'Lundi' : 'الإثنين', hours: '09:30 - 12:30 / 14:00 - 18:00' },
    { day: language === 'fr' ? 'Mardi' : 'الثلاثاء', hours: '09:30 - 12:30 / 14:00 - 18:00' },
    { day: language === 'fr' ? 'Mercredi' : 'الأربعاء', hours: '09:30 - 12:30 / 14:00 - 18:00' },
    { day: language === 'fr' ? 'Jeudi' : 'الخميس', hours: '09:30 - 12:30 / 14:00 - 18:00' },
    { day: language === 'fr' ? 'Vendredi' : 'الجمعة', hours: '09:30 - 12:30' },
    { day: language === 'fr' ? 'Samedi' : 'السبت', hours: '11:00 - 17:00' },
    { day: language === 'fr' ? 'Dimanche' : 'الأحد', hours: language === 'fr' ? 'Fermé' : 'مغلق' },
  ];

  return (
    <footer className="bg-secondary pt-16 pb-8 text-primary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Opening Hours */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-accent rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CarFront className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-wider text-primary-foreground">
                  AA AUTO EXPORT
                </span>
                <span className="text-[10px] tracking-[0.2em] text-accent uppercase">
                  Premium Services
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>

            {/* Opening Hours */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wide">
                {language === 'fr' ? "HORAIRES D'OUVERTURE" : 'ساعات العمل'}
              </h4>
              <div className="w-12 h-1 bg-accent rounded-full" />
              <ul className="space-y-2">
                {openingHours.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-medium">{item.day}:</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wide">
              {language === 'fr' ? 'LIENS RAPIDES' : 'روابط سريعة'}
            </h4>
            <div className="w-12 h-1 bg-accent rounded-full" />
            <ul className="space-y-3">
              {[
                { path: '/', label: t.nav.home },
                { path: '/vehicles', label: t.nav.vehicles },
                { path: '/services', label: t.nav.services },
                { path: '/contact', label: t.nav.contact },
                { path: '/admin', label: language === 'fr' ? 'Administration' : 'إدارة' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-lg uppercase tracking-wide">
              {language === 'fr' ? 'INFOS CONTACT' : 'معلومات الاتصال'}
            </h4>
            <div className="w-12 h-1 bg-accent rounded-full" />
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:2A.autoexport@gmail.com"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>2A.autoexport@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/33748424375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>+33 7 48 42 43 75</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+33748424375"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <Smartphone className="w-4 h-4 text-accent shrink-0" />
                  <span>+33 7 48 42 43 75</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/nErQ7C9xdffNwAzC9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>81 avenue Lénine 93380 pierrefitte sur seine</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Map */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wide">
                SOCIAL MEDIA
              </h4>
              <div className="w-12 h-1 bg-accent rounded-full" />
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1cHstDK31X/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aaautoexport?igsh=N3BtY2R2MDJ2YjJo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/33748424375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-lg uppercase tracking-wide">
                {language === 'fr' ? 'NOTRE ADRESSE' : 'عنواننا'}
              </h4>
              <div className="w-12 h-1 bg-accent rounded-full" />
              <div className="rounded-xl overflow-hidden border border-primary-foreground/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.2!2d2.4!3d48.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ1JzAwLjAiTiAywrAyNCcwMC4wIkU!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Notre adresse"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            Copyright © {new Date().getFullYear()} AA AUTO EXPORT. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;