import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const { language } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const content = {
    fr: {
      title: 'Questions Fréquentes',
      subtitle: 'Tout ce que vous devez savoir sur l\'exportation de véhicules',
      faqs: [
        {
          question: 'Combien de temps prend l\'exportation d\'un véhicule ?',
          answer: 'Le processus complet prend généralement entre 2 à 4 semaines, selon le véhicule choisi et les formalités douanières. Nous vous tenons informé à chaque étape.',
        },
        {
          question: 'Quels documents sont nécessaires pour l\'importation en Algérie ?',
          answer: 'Vous aurez besoin de votre carte d\'identité, d\'un justificatif de domicile, et du certificat de conformité du véhicule. Nous nous occupons de tous les documents côté français.',
        },
        {
          question: 'Comment se passe le paiement ?',
          answer: 'Nous proposons un paiement sécurisé en plusieurs étapes : un acompte à la commande, puis le solde avant l\'expédition. Tous les paiements sont traçables et sécurisés.',
        },
        {
          question: 'Puis-je choisir n\'importe quel véhicule ?',
          answer: 'Oui, nous pouvons sourcer n\'importe quel véhicule disponible en France selon vos critères (marque, modèle, année, kilométrage, budget). Nous vérifions l\'historique et l\'état de chaque véhicule.',
        },
        {
          question: 'Y a-t-il une garantie sur les véhicules ?',
          answer: 'Les véhicules neufs bénéficient de la garantie constructeur. Pour les occasions, nous fournissons un rapport détaillé de l\'état du véhicule et pouvons proposer une extension de garantie.',
        },
        {
          question: 'Dans quelles wilayas livrez-vous ?',
          answer: 'Nous livrons dans toutes les wilayas d\'Algérie. Le véhicule arrive au port d\'Alger et peut être acheminé vers votre wilaya selon vos préférences.',
        },
      ],
    },
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'كل ما تحتاج معرفته عن تصدير السيارات',
      faqs: [
        {
          question: 'كم من الوقت يستغرق تصدير سيارة؟',
          answer: 'تستغرق العملية الكاملة عادةً من 2 إلى 4 أسابيع، حسب السيارة المختارة والإجراءات الجمركية. نبقيك على اطلاع في كل مرحلة.',
        },
        {
          question: 'ما هي الوثائق المطلوبة للاستيراد إلى الجزائر؟',
          answer: 'ستحتاج إلى بطاقة الهوية الخاصة بك، وإثبات العنوان، وشهادة مطابقة السيارة. نحن نتولى جميع الوثائق من الجانب الفرنسي.',
        },
        {
          question: 'كيف يتم الدفع؟',
          answer: 'نقدم دفعًا آمنًا على عدة مراحل: دفعة أولى عند الطلب، ثم الرصيد قبل الشحن. جميع المدفوعات قابلة للتتبع وآمنة.',
        },
        {
          question: 'هل يمكنني اختيار أي سيارة؟',
          answer: 'نعم، يمكننا توفير أي سيارة متاحة في فرنسا وفقًا لمعاييرك (العلامة التجارية، الموديل، السنة، المسافة المقطوعة، الميزانية). نتحقق من تاريخ وحالة كل سيارة.',
        },
        {
          question: 'هل هناك ضمان على السيارات؟',
          answer: 'تستفيد السيارات الجديدة من ضمان الشركة المصنعة. بالنسبة للسيارات المستعملة، نقدم تقريرًا مفصلاً عن حالة السيارة ويمكننا تقديم تمديد للضمان.',
        },
        {
          question: 'في أي ولايات تقومون بالتوصيل؟',
          answer: 'نقوم بالتوصيل إلى جميع ولايات الجزائر. تصل السيارة إلى ميناء الجزائر ويمكن نقلها إلى ولايتك حسب تفضيلاتك.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-12 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className={cn(
          "max-w-3xl mx-auto transition-all duration-700 delay-200",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Accordion type="single" collapsible className="space-y-4">
            {t.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border/50 shadow-glass px-6 data-[state=open]:shadow-glass-hover transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-accent py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
