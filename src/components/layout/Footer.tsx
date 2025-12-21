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
                AutoExport<span className="text-accent">DZ</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.description}
            </p>
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
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span>+33 6 12 34 56 78</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span>contact@autoexportdz.com</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>Paris, France</span>
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
            © {new Date().getFullYear()} AutoExportDZ. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
