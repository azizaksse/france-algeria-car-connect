import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const HowItWorks = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const faqFr = [
    {
      question: 'Quels types de véhicules pouvez-vous exporter ?',
      answer: 'Nous exportons tous types de véhicules : neufs, occasion, particuliers et utilitaires. Voitures, SUV, pick-up, camionnettes.',
    },
    {
      question: 'Combien de temps prend l\'exportation ?',
      answer: 'Le délai moyen est de 2 à 4 semaines après l\'achat du véhicule, incluant le transport maritime et les formalités douanières.',
    },
    {
      question: 'Quels sont les documents nécessaires ?',
      answer: 'Nous nous occupons de tous les documents : carte grise, certificat de conformité, documents douaniers. Vous n\'avez rien à faire.',
    },
    {
      question: 'Le prix inclut-il toutes les taxes ?',
      answer: 'Nos devis sont complets et transparents. Ils incluent l\'achat, le transport, l\'assurance et les frais de dédouanement.',
    },
  ];

  const faqAr = [
    {
      question: 'ما هي أنواع السيارات التي يمكنكم تصديرها؟',
      answer: 'نصدر جميع أنواع السيارات: جديدة، مستعملة، خاصة ونفعية. سيارات، SUV، بيك أب، شاحنات صغيرة.',
    },
    {
      question: 'كم من الوقت يستغرق التصدير؟',
      answer: 'المدة المتوسطة هي 2 إلى 4 أسابيع بعد شراء السيارة، بما في ذلك النقل البحري والإجراءات الجمركية.',
    },
    {
      question: 'ما هي الوثائق المطلوبة؟',
      answer: 'نحن نتولى جميع الوثائق: البطاقة الرمادية، شهادة المطابقة، الوثائق الجمركية. لا يتوجب عليك فعل أي شيء.',
    },
    {
      question: 'هل السعر يشمل جميع الضرائب؟',
      answer: 'عروضنا كاملة وشفافة. تشمل الشراء والنقل والتأمين ورسوم التخليص الجمركي.',
    },
  ];

  const faq = language === 'fr' ? faqFr : faqAr;

  return (
    <>
      <Helmet>
        <title>
          {language === 'fr' ? 'Comment ça marche - AutoExportDZ' : 'كيف يعمل - AutoExportDZ'}
        </title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? "Découvrez le processus simple et transparent d'exportation de véhicules de France vers l'Algérie en 4 étapes."
              : 'اكتشف عملية تصدير السيارات البسيطة والشفافة من فرنسا إلى الجزائر في 4 خطوات.'
          }
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.howItWorks.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg">
                {t.howItWorks.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section ref={ref} className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {t.howItWorks.steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex gap-8 pb-16 last:pb-0 transition-all duration-700",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: isInView ? `${index * 150}ms` : '0ms' }}
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shrink-0 z-10">
                      <span className="font-heading font-bold text-2xl text-accent-foreground">
                        {step.number}
                      </span>
                    </div>
                    {index < t.howItWorks.steps.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {language === 'fr' ? 'Questions fréquentes' : 'الأسئلة الشائعة'}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
                >
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
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

export default HowItWorks;
