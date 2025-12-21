import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">
                AA AUTO <span className="text-accent">EXPORT</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1cHstDK31X/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@aa.auto.export?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">{t.footer.links}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/vehicles" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.nav.vehicles}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.nav.requestQuote}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">{t.nav.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+33780783610" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>+33 7 80 78 36 10</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/33748424375" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/bmsZZZa5o2wLAzDb8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  <MapPin className="w-4 h-4 text-accent mt-0.5" />
                  <span>Paris, France</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">{language === 'fr' ? 'Légal' : 'قانوني'}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.footer.legal}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} AA AUTO EXPORT. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
