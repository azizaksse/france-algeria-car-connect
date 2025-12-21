import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Filter, Fuel, Calendar, Gauge, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicles, brands, years, fuels, Vehicle } from '@/data/vehicles';
import { cn } from '@/lib/utils';

const Vehicles = () => {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState<'all' | 'new' | 'used'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (category !== 'all' && vehicle.category !== category) return false;
      if (selectedBrand && vehicle.brand !== selectedBrand) return false;
      if (selectedYear && vehicle.year !== parseInt(selectedYear)) return false;
      if (selectedFuel && vehicle.fuel !== selectedFuel) return false;
      return true;
    });
  }, [category, selectedBrand, selectedYear, selectedFuel]);

  const clearFilters = () => {
    setCategory('all');
    setSelectedBrand('');
    setSelectedYear('');
    setSelectedFuel('');
  };

  const hasActiveFilters = category !== 'all' || selectedBrand || selectedYear || selectedFuel;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'ar-DZ', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>
          {language === 'fr'
            ? 'Véhicules disponibles - AutoExportDZ'
            : 'السيارات المتاحة - AutoExportDZ'}
        </title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? "Découvrez notre sélection de véhicules neufs et d'occasion disponibles à l'export vers l'Algérie."
              : 'اكتشف مجموعتنا من السيارات الجديدة والمستعملة المتاحة للتصدير إلى الجزائر.'
          }
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.vehicles.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg">
                {t.vehicles.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Vehicles Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-8">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex gap-2">
                  {['all', 'new', 'used'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat as 'all' | 'new' | 'used')}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        category === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      )}
                    >
                      {cat === 'all' ? t.vehicles.filter.all : cat === 'new' ? t.vehicles.filter.new : t.vehicles.filter.used}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filtres</span>
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm">{language === 'fr' ? 'Effacer' : 'مسح'}</span>
                  </button>
                )}
              </div>

              {/* Dropdown Filters */}
              <div className={cn(
                'grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300',
                showFilters ? 'block' : 'hidden md:grid'
              )}>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">{t.vehicles.filter.brand}</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">{t.vehicles.filter.year}</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">{t.vehicles.filter.fuel}</option>
                  {fuels.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-muted-foreground mb-6">
              {filteredVehicles.length} {language === 'fr' ? 'véhicule(s) trouvé(s)' : 'سيارة(ات) موجودة'}
            </p>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} formatPrice={formatPrice} t={t} />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {language === 'fr'
                    ? 'Aucun véhicule ne correspond à vos critères.'
                    : 'لا توجد سيارات تطابق معاييرك.'}
                </p>
                <Button variant="navy" className="mt-4" onClick={clearFilters}>
                  {language === 'fr' ? 'Effacer les filtres' : 'مسح المرشحات'}
                </Button>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

const VehicleCard = ({ vehicle, index, formatPrice, t }: { vehicle: Vehicle; index: number; formatPrice: (price: number) => string; t: any }) => {
  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
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
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4" />
            <span>{vehicle.fuel}</span>
          </div>
          {vehicle.mileage && (
            <div className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4" />
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Button variant="navy" className="w-full" asChild>
          <Link to={`/request?vehicle=${encodeURIComponent(`${vehicle.brand} ${vehicle.model}`)}`}>
            {t.vehicles.cta}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Vehicles;
