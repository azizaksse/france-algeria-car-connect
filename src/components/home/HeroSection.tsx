import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Shield, value: '10+', label: language === 'fr' ? 'Ans d\'expertise' : 'سنوات من الخبرة' },
    { icon: Clock, value: '500+', label: language === 'fr' ? 'Véhicules exportés' : 'سيارة مصدرة' },
    { icon: Award, value: '100%', label: language === 'fr' ? 'Clients satisfaits' : 'عملاء راضون' },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-90" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
              <span className="text-primary-foreground/80 text-sm font-medium">
                {language === 'fr' ? 'Export France → Algérie' : 'تصدير فرنسا ← الجزائر'}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              {t.hero.title}
              <span className="block text-accent">{t.hero.subtitle}</span>
            </h1>

            <p className="text-primary-foreground/70 text-lg md:text-xl max-w-xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4">
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
            <div className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/10">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-primary-foreground">{stat.value}</div>
                    <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative hidden lg:block animate-fade-in delay-300">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80"
                alt="Luxury car export"
                className="relative rounded-2xl shadow-floating w-full object-cover aspect-[4/3]"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-elevated animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      {language === 'fr' ? 'Service garanti' : 'خدمة مضمونة'}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {language === 'fr' ? 'Satisfaction client' : 'رضا العملاء'}
                    </div>
                  </div>
                </div>
              </div>
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
