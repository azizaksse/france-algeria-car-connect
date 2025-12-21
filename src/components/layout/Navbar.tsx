import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages, CarFront } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/vehicles', label: t.nav.vehicles },
    { href: '/services', label: t.nav.services },
    { href: '/how-it-works', label: t.nav.howItWorks },
    { href: '/contact', label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          'container-custom transition-all duration-500 rounded-full',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-border/30'
            : 'bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/50'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <CarFront className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              AA AUTO <span className="text-accent">EXPORT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-full p-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'font-medium text-sm px-4 py-2 rounded-full transition-all duration-300',
                  location.pathname === link.href
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary transition-all duration-300"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
            <Button variant="accent" size="default" className="rounded-full px-6" asChild>
              <Link to="/request">{t.nav.requestQuote}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-screen pb-6' : 'max-h-0'
          )}
        >
          <div className="pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block py-3 px-4 rounded-xl font-medium transition-all duration-300',
                  location.pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border/50 space-y-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'fr' ? 'العربية' : 'Français'}</span>
              </button>
              <Button variant="accent" size="lg" className="w-full rounded-xl" asChild>
                <Link to="/request" onClick={() => setIsOpen(false)}>
                  {t.nav.requestQuote}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
