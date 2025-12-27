import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, Droplets, CalendarDays, Activity, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { brands, years, fuels, Vehicle } from '@/data/vehicles';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Vehicles = () => {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState<'all' | 'new' | 'used'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*');

        if (error) throw error;

        if (data) {
          // Map DB fields back to frontend interface
          const mappedVehicles: Vehicle[] = data.map(v => ({
            id: v.id,
            brand: v.brand,
            model: v.model,
            year: v.year,
            fuel: v.fuel,
            price: v.price,
            image: v.image,
            category: v.category,
            mileage: v.mileage,
            available: v.available,
            transmission: v.transmission,
            reference: v.reference,
            bodyType: v.body_type,
            exteriorColor: v.exterior_color,
            motorisation: v.motorisation,
            status: v.status
          }));
          setVehicles(mappedVehicles);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
                  <SlidersHorizontal className="w-4 h-4" />
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
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Chargement des véhicules...</p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

const VehicleCard = ({ vehicle, index, formatPrice, t }: { vehicle: Vehicle; index: number; formatPrice: (price: number) => string; t: any }) => {
  const language = t.nav.home === 'Accueil' ? 'fr' : 'ar';

  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2 animate-fade-in-up flex flex-col h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={cn(
            "px-3 py-1 rounded text-xs font-bold uppercase",
            vehicle.category === 'new'
              ? "bg-accent text-accent-foreground"
              : "bg-foreground text-background"
          )}>
            {vehicle.category === 'new' ? t.vehicles.filter.new : t.vehicles.filter.used}
          </span>
          {vehicle.status && (
            <span className={cn(
              "px-3 py-1 rounded text-xs font-bold uppercase",
              vehicle.status === 'arriving' ? "bg-blue-500 text-white" :
                vehicle.status === 'delivered' ? "bg-green-500 text-white" :
                  vehicle.status === 'sold' ? "bg-red-500 text-white" :
                    "bg-primary text-primary-foreground"
            )}>
              {vehicle.status === 'arriving' ? (language === 'fr' ? 'En Arrivage' : 'في الطريق') :
                vehicle.status === 'delivered' ? (language === 'fr' ? 'Livré' : 'تم التوصيل') :
                  vehicle.status === 'sold' ? (language === 'fr' ? 'Vendu' : 'مباع') :
                    (language === 'fr' ? 'Disponible' : 'متاح')}
            </span>
          )}
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="text-2xl font-bold text-white drop-shadow-lg">
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex flex-col flex-1">
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
            <span className="text-muted-foreground">{language === 'fr' ? 'N° Référence' : 'رقم المرجع'}</span>
            <span className="font-semibold text-foreground">{vehicle.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'fr' ? 'Carburant' : 'الوقود'}</span>
            <span className="font-semibold text-foreground">{vehicle.fuel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'fr' ? 'Motorisation' : 'المحرك'}</span>
            <span className="font-semibold text-foreground">{vehicle.motorisation || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'fr' ? 'Transmission' : 'ناقل الحركة'}</span>
            <span className="font-semibold text-foreground">{vehicle.transmission}</span>
          </div>
        </div>

        {/* CTA */}
        <Button variant="navy" className="w-full mt-auto">
          {language === 'fr' ? 'Voir les détails' : 'عرض التفاصيل'}
        </Button>
      </div>
    </Link>
  );
};

export default Vehicles;
