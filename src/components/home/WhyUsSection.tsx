import { Earth, Wallet, UsersRound, BadgeCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const WhyUsSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const icons = [Earth, Wallet, UsersRound, BadgeCheck, HeartHandshake];

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className={cn(
            "relative transition-all duration-700",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"
              alt="Car showroom"
              className="relative rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
            />
          </div>

          {/* Content */}
          <div>
            <div className={cn(
              "mb-8 transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.whyUs.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t.whyUs.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {t.whyUs.items.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-500",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: isInView ? `${(index + 2) * 100}ms` : '0ms' }}
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
