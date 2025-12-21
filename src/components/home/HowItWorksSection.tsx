import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const HowItWorksSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative group transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${index * 150}ms` : '0ms' }}
            >
              {/* Connector Line */}
              {index < t.howItWorks.steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-primary-foreground/20">
                  <div
                    className={cn(
                      "h-full bg-accent transition-all duration-1000",
                      isInView ? "w-full" : "w-0"
                    )}
                    style={{ transitionDelay: isInView ? `${(index + 1) * 300}ms` : '0ms' }}
                  />
                </div>
              )}

              <div className="relative z-10 text-center">
                {/* Number */}
                <div className="w-24 h-24 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="font-heading font-bold text-4xl text-accent">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
