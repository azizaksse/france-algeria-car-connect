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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/70 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-background/20 backdrop-blur-sm'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <CarFront className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              AA AUTO <span className="text-accent">EXPORT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'font-medium text-sm transition-colors relative group',
                  location.pathname === link.href
                    ? 'text-accent'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-foreground/80 hover:text-foreground hover:bg-foreground/10"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
            <Button variant="accent" size="lg" asChild>
              <Link to="/request">{t.nav.requestQuote}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden absolute top-full left-0 right-0 bg-background shadow-elevated transition-all duration-300 overflow-hidden',
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="container-custom py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block py-3 font-medium transition-colors',
                  location.pathname === link.href
                    ? 'text-accent'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'fr' ? 'العربية' : 'Français'}</span>
              </button>
              <Button variant="accent" size="lg" className="w-full" asChild>
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
