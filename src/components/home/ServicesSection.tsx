import { ScanSearch, ShoppingBag, ScrollText, Ship, Navigation } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const ServicesSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const icons = [ScanSearch, ShoppingBag, ScrollText, Ship, Navigation];

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className={cn(
                  "group bg-card p-6 rounded-2xl border border-border/50 shadow-glass transition-all duration-500 hover:shadow-glass-hover hover:-translate-y-2",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: isInView ? `${index * 100}ms` : '0ms' }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
