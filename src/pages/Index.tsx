import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import VehiclesSection from '@/components/home/VehiclesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          {language === 'fr'
            ? 'AA AUTO EXPORT - Export de véhicules France vers Algérie'
            : 'AA AUTO EXPORT - تصدير السيارات من فرنسا إلى الجزائر'}
        </title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? "Votre partenaire de confiance pour l'exportation de véhicules de France vers l'Algérie. Service complet, prix transparents, livraison garantie."
              : 'شريكك الموثوق لتصدير السيارات من فرنسا إلى الجزائر. خدمة كاملة، أسعار شفافة، توصيل مضمون.'
          }
        />
        <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      </Helmet>

      <Layout>
        <HeroSection />
        <ServicesSection />
        <VehiclesSection />
        <HowItWorksSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ContactSection />
      </Layout>
    </>
  );
};

export default Index;
