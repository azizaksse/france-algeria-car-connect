import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, CalendarDays, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { vehicles } from '@/data/vehicles';
import { cn } from '@/lib/utils';

const VehiclesSection = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const displayVehicles = vehicles.slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'ar-DZ', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.vehicles.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {t.vehicles.subtitle}
            </p>
          </div>
          <Button variant="navy" size="lg" asChild>
            <Link to="/vehicles" className="group">
              {t.vehicles.viewAll}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className={cn(
                "group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${index * 150}ms` : '0ms' }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold",
                    vehicle.category === 'new'
                      ? "bg-accent text-accent-foreground"
                      : "bg-foreground text-background"
                  )}>
                    {vehicle.category === 'new' ? t.vehicles.filter.new : t.vehicles.filter.used}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-accent font-bold text-2xl mt-1">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Droplets className="w-4 h-4" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  {vehicle.mileage && (
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4" />
                      <span>{vehicle.mileage.toLocaleString()} km</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Button variant="navy" className="w-full" asChild>
                  <Link to={`/request?vehicle=${vehicle.brand} ${vehicle.model}`}>
                    {t.vehicles.cta}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehiclesSection;
