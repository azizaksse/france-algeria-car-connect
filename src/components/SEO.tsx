import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { Language } from '@/lib/i18n';

// Safe hook that returns default if outside provider
const useLanguageSafe = (): Language => {
  try {
    // Dynamic import to avoid circular dependency
    const { useLanguage } = require('@/contexts/LanguageContext');
    const { language } = useLanguage();
    return language;
  } catch {
    return 'fr';
  }
};

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  lang?: Language;
}

const SEO = ({
  title,
  description,
  image = '/logo-transparent.png',
  url = 'https://aaautoexport.com',
  type = 'website',
  lang
}: SEOProps) => {
  const contextLanguage = useLanguageSafe();
  const language = lang || contextLanguage;

  const defaultContent = {
    fr: {
      title: 'AA AUTO EXPORT | Export de véhicules France → Algérie',
      description: 'Expert en exportation de véhicules de France vers l\'Algérie. Plus de 10 ans d\'expérience, service clé en main, transparence des prix. Demandez votre devis gratuit.',
    },
    ar: {
      title: 'AA AUTO EXPORT | تصدير السيارات من فرنسا إلى الجزائر',
      description: 'خبراء في تصدير السيارات من فرنسا إلى الجزائر. أكثر من 10 سنوات من الخبرة، خدمة شاملة، شفافية الأسعار. اطلب عرض أسعارك المجاني.',
    },
  };

  const finalTitle = title || defaultContent[language].title;
  const finalDescription = description || defaultContent[language].description;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'AA AUTO EXPORT',
    description: finalDescription,
    url: url,
    telephone: '+33748424375',
    email: 'contact@aaautoexport.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    areaServed: ['France', 'Algeria'],
    priceRange: '€€€',
    openingHours: 'Mo-Sa 09:00-18:00',
    sameAs: [
      'https://www.facebook.com/share/1cHstDK31X/',
      'https://www.tiktok.com/@aa.auto.export',
    ],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AA AUTO EXPORT" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'ar_DZ'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
