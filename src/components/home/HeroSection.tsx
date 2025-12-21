import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const stats = [
    { icon: ShieldCheck, value: '10+', label: language === 'fr' ? 'Ans d\'expertise' : 'سنوات من الخبرة' },
    { icon: Zap, value: '500+', label: language === 'fr' ? 'Véhicules exportés' : 'سيارة مصدرة' },
    { icon: Sparkles, value: '100%', label: language === 'fr' ? 'Clients satisfaits' : 'عملاء راضون' },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/55 to-navy-light/60" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className={cn(
              "inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
              <span className="text-primary-foreground/80 text-sm font-medium">
                {language === 'fr' ? 'Export France → Algérie' : 'تصدير فرنسا ← الجزائر'}
              </span>
            </div>

            <h1 className={cn(
              "font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              {t.hero.title}
              <span className="block text-accent">{t.hero.subtitle}</span>
            </h1>

            <p className={cn(
              "text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              {t.hero.description}
            </p>

            <div className={cn(
              "flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/vehicles" className="group">
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/request">{t.hero.cta2}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className={cn(
              "flex flex-wrap justify-center gap-8 pt-8 border-t border-primary-foreground/10 transition-all duration-700 delay-500",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center gap-3 transition-all duration-500",
                    isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  )}
                  style={{ transitionDelay: isInView ? `${600 + index * 100}ms` : '0ms' }}
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-heading font-bold text-2xl text-primary-foreground">{stat.value}</div>
                    <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
