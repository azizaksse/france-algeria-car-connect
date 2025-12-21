import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, CalendarDays, Activity, Settings } from 'lucide-react';
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
                "group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-glass transition-all duration-500 hover:shadow-glass-hover hover:-translate-y-3",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${index * 150}ms` : '0ms' }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-3 py-1 rounded text-xs font-bold uppercase",
                    vehicle.category === 'new'
                      ? "bg-accent text-accent-foreground"
                      : "bg-foreground text-background"
                  )}>
                    {vehicle.category === 'new' ? t.vehicles.filter.new : t.vehicles.filter.used}
                  </span>
                </div>
                {/* Price overlay */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-bold text-white drop-shadow-lg">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Category tag */}
                <span className="text-accent font-semibold text-sm uppercase">
                  {vehicle.category === 'new' ? 'NEUF' : 'OCCASION'}
                </span>

                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground line-clamp-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                </div>

                {/* Specs Table */}
                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Année' : 'السنة'}</span>
                    <span className="font-semibold text-foreground">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Marque' : 'الماركة'}</span>
                    <span className="font-semibold text-foreground">{vehicle.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Kilométrage' : 'المسافة المقطوعة'}</span>
                    <span className="font-semibold text-foreground">{vehicle.mileage?.toLocaleString() || 0} Km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Carburant' : 'الوقود'}</span>
                    <span className="font-semibold text-foreground">{vehicle.fuel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{language === 'fr' ? 'Transmission' : 'ناقل الحركة'}</span>
                    <span className="font-semibold text-foreground">{vehicle.transmission}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/vehicles/${vehicle.id}`}>
                      {language === 'fr' ? 'Détails' : 'التفاصيل'}
                    </Link>
                  </Button>
                  <Button variant="navy" className="flex-1" asChild>
                    <Link to={`/request?vehicle=${vehicle.brand} ${vehicle.model}`}>
                      {t.vehicles.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehiclesSection;
