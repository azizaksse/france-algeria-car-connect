import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScanSearch, ShoppingBag, ScrollText, Ship, Navigation, ArrowRight, CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const Services = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const icons = [ScanSearch, ShoppingBag, ScrollText];

  const detailedServices = [
    {
      icon: ScanSearch,
      titleFr: 'Recherche de véhicule',
      titleAr: 'البحث عن السيارة',
      descriptionFr: 'Nous trouvons le véhicule idéal selon vos critères et votre budget.',
      descriptionAr: 'نجد السيارة المثالية حسب معاييرك وميزانيتك.',
      featuresFr: [
        'Recherche personnalisée selon vos besoins',
        'Accès à un large réseau de concessionnaires',
        'Vérification de l\'historique du véhicule',
        'Photos et vidéos détaillées',
      ],
      featuresAr: [
        'بحث مخصص حسب احتياجاتك',
        'الوصول إلى شبكة واسعة من الوكلاء',
        'التحقق من تاريخ السيارة',
        'صور وفيديوهات مفصلة',
      ],
    },
    {
      icon: ShoppingBag,
      titleFr: 'Achat en France',
      titleAr: 'الشراء من فرنسا',
      descriptionFr: 'Négociation et achat sécurisé auprès de vendeurs vérifiés.',
      descriptionAr: 'تفاوض وشراء آمن من بائعين موثوقين.',
      featuresFr: [
        'Négociation du meilleur prix',
        'Paiement sécurisé',
        'Inspection complète avant achat',
        'Garantie de conformité',
      ],
      featuresAr: [
        'التفاوض على أفضل سعر',
        'دفع آمن',
        'فحص كامل قبل الشراء',
        'ضمان المطابقة',
      ],
    },
    {
      icon: ScrollText,
      titleFr: 'Démarches administratives',
      titleAr: 'الإجراءات الإدارية',
      descriptionFr: 'Gestion complète des documents et formalités douanières.',
      descriptionAr: 'إدارة كاملة للوثائق والإجراءات الجمركية.',
      featuresFr: [
        'Préparation de tous les documents',
        'Certificat de conformité',
        'Formalités d\'exportation France',
        'Dédouanement Algérie',
      ],
      featuresAr: [
        'إعداد جميع الوثائق',
        'شهادة المطابقة',
        'إجراءات التصدير من فرنسا',
        'التخليص الجمركي بالجزائر',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {language === 'fr' ? 'Nos Services - AutoExportDZ' : 'خدماتنا - AutoExportDZ'}
        </title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? "Découvrez nos services d'exportation de véhicules : recherche, achat, démarches administratives, transport et livraison en Algérie."
              : 'اكتشف خدمات تصدير السيارات: البحث، الشراء، الإجراءات الإدارية، النقل والتسليم في الجزائر.'
          }
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.services.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg">
                {t.services.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section ref={ref} className="section-padding bg-background">
          <div className="container-custom">
            <div className="space-y-16">
              {detailedServices.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={cn(
                      "grid lg:grid-cols-2 gap-12 items-center transition-all duration-700",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: isInView ? `${index * 150}ms` : '0ms' }}
                  >
                    {/* Content */}
                    <div className={cn(isEven ? 'lg:order-1' : 'lg:order-2')}>
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {language === 'fr' ? service.titleFr : service.titleAr}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-6">
                        {language === 'fr' ? service.descriptionFr : service.descriptionAr}
                      </p>
                      <ul className="space-y-3">
                        {(language === 'fr' ? service.featuresFr : service.featuresAr).map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CircleCheckBig className="w-5 h-5 text-accent shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className={cn(
                      "relative",
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    )}>
                      <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
                      <div className="relative bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-12 flex items-center justify-center aspect-square">
                        <div className="w-32 h-32 bg-accent/10 rounded-3xl flex items-center justify-center">
                          <Icon className="w-16 h-16 text-accent" />
                        </div>
                        <div className="absolute top-6 left-6 bg-card px-4 py-2 rounded-lg shadow-soft">
                          <span className="text-accent font-bold text-2xl">0{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <Button variant="accent" size="xl" asChild>
                <a href="https://wa.me/33748424375" target="_blank" rel="noopener noreferrer" className="group">
                  {t.nav.requestQuote}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
