import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Car,
  Palette,
  Hash,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Vehicle } from '@/data/vehicles';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          const mappedVehicle: Vehicle = {
            id: data.id,
            brand: data.brand,
            model: data.model,
            year: data.year,
            fuel: data.fuel,
            price: data.price,
            image: data.image,
            category: data.category,
            mileage: data.mileage,
            available: data.available,
            transmission: data.transmission,
            reference: data.reference,
            bodyType: data.body_type,
            exteriorColor: data.exterior_color,
            motorisation: data.motorisation,
            status: data.status
          };
          setVehicle(mappedVehicle);
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Véhicule non trouvé' : 'السيارة غير موجودة'}
            </h1>
            <Button variant="navy" asChild>
              <Link to="/vehicles">
                {language === 'fr' ? 'Retour aux véhicules' : 'العودة إلى السيارات'}
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Mock gallery images (in real app, this would come from vehicle data)
  const galleryImages = [
    vehicle.image,
    vehicle.image.replace('w=800', 'w=801'),
    vehicle.image.replace('w=800', 'w=802'),
    vehicle.image.replace('w=800', 'w=803'),
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'ar-DZ', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const whatsappMessage = encodeURIComponent(
    language === 'fr'
      ? `Bonjour, je suis intéressé par le véhicule: ${vehicle.brand} ${vehicle.model} (Réf: ${vehicle.reference}) à ${formatPrice(vehicle.price)}`
      : `مرحبا، أنا مهتم بالسيارة: ${vehicle.brand} ${vehicle.model} (المرجع: ${vehicle.reference}) بسعر ${formatPrice(vehicle.price)}`
  );

  const emailSubject = encodeURIComponent(
    language === 'fr'
      ? `Demande d'information - ${vehicle.brand} ${vehicle.model}`
      : `طلب معلومات - ${vehicle.brand} ${vehicle.model}`
  );

  const emailBody = encodeURIComponent(
    language === 'fr'
      ? `Bonjour,\n\nJe suis intéressé par le véhicule suivant:\n\nMarque: ${vehicle.brand}\nModèle: ${vehicle.model}\nAnnée: ${vehicle.year}\nPrix: ${formatPrice(vehicle.price)}\nRéférence: ${vehicle.reference}\n\nMerci de me recontacter pour plus d'informations.\n\nCordialement`
      : `مرحبا،\n\nأنا مهتم بالسيارة التالية:\n\nالماركة: ${vehicle.brand}\nالموديل: ${vehicle.model}\nالسنة: ${vehicle.year}\nالسعر: ${formatPrice(vehicle.price)}\nالمرجع: ${vehicle.reference}\n\nيرجى الاتصال بي لمزيد من المعلومات.\n\nمع التحية`
  );

  const specs = [
    {
      label: language === 'fr' ? 'Année' : 'السنة',
      value: vehicle.year,
      icon: Calendar
    },
    {
      label: language === 'fr' ? 'Marque' : 'الماركة',
      value: vehicle.brand,
      icon: Car
    },
    {
      label: language === 'fr' ? 'Modèle' : 'الموديل',
      value: vehicle.model.split(' ')[0],
      icon: Car
    },
    {
      label: language === 'fr' ? 'Carrosserie' : 'نوع الهيكل',
      value: vehicle.bodyType || 'Berline',
      icon: Car
    },
    {
      label: language === 'fr' ? 'État' : 'الحالة',
      value: vehicle.category === 'new' ? (language === 'fr' ? 'Neuf' : 'جديد') : (language === 'fr' ? 'Occasion' : 'مستعمل'),
      icon: CheckCircle
    },
    {
      label: language === 'fr' ? 'Kilométrage' : 'المسافة المقطوعة',
      value: `${vehicle.mileage?.toLocaleString() || 0} km`,
      icon: Gauge
    },
    {
      label: language === 'fr' ? 'Transmission' : 'ناقل الحركة',
      value: vehicle.transmission,
      icon: Settings
    },
    {
      label: language === 'fr' ? 'Carburant' : 'الوقود',
      value: vehicle.fuel,
      icon: Fuel
    },
    {
      label: language === 'fr' ? 'Motorisation' : 'المحرك',
      value: vehicle.motorisation || 'N/A',
      icon: Settings
    },
    {
      label: language === 'fr' ? 'Exterior Color' : 'اللون الخارجي',
      value: vehicle.exteriorColor || 'N/A',
      icon: Palette
    },
    {
      label: language === 'fr' ? 'N° Référence' : 'رقم المرجع',
      value: vehicle.reference,
      icon: Hash
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      <Helmet>
        <title>{`${vehicle.brand} ${vehicle.model} - AA AUTO EXPORT`}</title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${formatPrice(vehicle.price)}. Disponible à l'export vers l'Algérie.`
              : `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${formatPrice(vehicle.price)}. متاح للتصدير إلى الجزائر.`
          }
        />
      </Helmet>

      <Layout>
        {/* Breadcrumb */}
        <section className="pt-28 pb-4 bg-background">
          <div className="container-custom">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'fr' ? 'Retour' : 'رجوع'}</span>
            </button>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={galleryImages[currentImageIndex]}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-4 py-2 rounded text-sm font-bold uppercase",
                      vehicle.category === 'new'
                        ? "bg-accent text-accent-foreground"
                        : "bg-foreground text-background"
                    )}>
                      {vehicle.category === 'new' ? 'NEUF' : 'OCCASION'}
                    </span>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-accent"
                          : "border-transparent hover:border-border"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${vehicle.brand} ${vehicle.model} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="space-y-6">
                {/* Title & Price */}
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-muted-foreground">
                    {vehicle.year} • {vehicle.brand} • {vehicle.model.split(' ')[0]}
                  </p>
                </div>

                {/* Price */}
                <div className="border-t border-b border-border py-4">
                  <p className="text-accent font-bold text-3xl md:text-4xl">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={`https://wa.me/33748424375?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:contact@aaautoexport.com?subject=${emailSubject}&body=${emailBody}`}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                </div>

                {/* Description Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-bold text-lg text-foreground">
                      Description
                    </h2>
                    <div className="flex-1 h-0.5 bg-accent" />
                  </div>

                  {/* Specs Grid */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      {specs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-border last:border-0"
                        >
                          <span className="text-muted-foreground font-medium">
                            {spec.label}
                          </span>
                          <span className="text-foreground font-semibold">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Request Quote Button */}
                <Button variant="navy" size="lg" className="w-full" asChild>
                  <Link to={`/request?vehicle=${encodeURIComponent(`${vehicle.brand} ${vehicle.model}`)}`}>
                    {language === 'fr' ? 'Demander un devis' : 'طلب عرض أسعار'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default VehicleDetail;