import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import VehiclesSection from '@/components/home/VehiclesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <Layout>
      <SEO />
      <HeroSection />
      <ServicesSection />
      <VehiclesSection />
      <HowItWorksSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
