export type Language = 'fr' | 'ar';

export const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      vehicles: 'Véhicules',
      services: 'Services',
      howItWorks: 'Comment ça marche',
      contact: 'Contact',
      requestQuote: 'Demander un devis',
    },
    hero: {
      title: 'Exporter votre véhicule de France vers le Maghreb',
      subtitle: 'Algérie, Tunisie, Maroc',
      description: 'Nous vous accompagnons dans l\'achat et l\'exportation de votre véhicule depuis la France vers l\'Algérie, la Tunisie et le Maroc. Transparence, expertise et service personnalisé.',
      cta1: 'Voir les véhicules',
      cta2: 'Demander un devis',
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Un accompagnement complet pour votre projet d\'importation',
      items: [
        { title: 'Recherche de véhicule', description: 'Nous trouvons le véhicule idéal selon vos critères et votre budget.' },
        { title: 'Achat en France', description: 'Négociation et achat sécurisé auprès de vendeurs vérifiés.' },
        { title: 'Démarches administratives', description: 'Gestion complète des documents et formalités douanières.' },
        { title: 'Mécanique Rapide', description: 'Entretien et réparations rapides pour votre véhicule.' },
      ],
    },
    vehicles: {
      title: 'Nos Véhicules',
      subtitle: 'Découvrez notre sélection de véhicules neufs et d\'occasion',
      filter: {
        all: 'Tous',
        new: 'Neuf',
        used: 'Occasion',
        brand: 'Marque',
        year: 'Année',
        fuel: 'Carburant',
      },
      cta: 'Demander ce véhicule',
      viewAll: 'Voir tous les véhicules',
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Un processus simple et transparent en 2 étapes',
      steps: [
        { number: '01', title: 'Choix du véhicule', description: 'Sélectionnez votre véhicule dans notre catalogue ou faites une demande personnalisée.' },
        { number: '02', title: 'Achat en France', description: 'Nous procédons à l\'achat sécurisé du véhicule après votre validation.' },
      ],
    },
    whyUs: {
      title: 'Pourquoi nous choisir',
      subtitle: 'Des années d\'expertise à votre service',
      items: [
        { title: 'Expertise France–Maghreb', description: 'Une expertise solide dans l\'export automobile.' },
        { title: 'Transparence des prix', description: 'Devis détaillé sans frais cachés, tout compris.' },
        { title: 'Accompagnement complet', description: 'Un interlocuteur unique du début à la fin.' },
        { title: 'Clients satisfaits', description: 'Des centaines de véhicules exportés avec succès.' },
        { title: 'Communication claire', description: 'Suivi en temps réel et disponibilité permanente.' },
      ],
    },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'Leur satisfaction est notre priorité',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Nous sommes à votre disposition pour toute question',
      phone: 'Téléphone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Adresse',
    },
    form: {
      title: 'Demande de devis',
      subtitle: 'Remplissez le formulaire pour recevoir une offre personnalisée',
      name: 'Nom complet',
      phone: 'Téléphone',
      email: 'Email',
      vehicle: 'Véhicule souhaité',
      budget: 'Budget estimé',
      message: 'Message',
      submit: 'Envoyer la demande',
      success: 'Votre demande a bien été reçue. Nous vous contacterons dans les plus brefs délais.',
    },
    footer: {
      description: 'Votre partenaire de confiance pour l\'exportation de véhicules de France vers l\'Algérie, la Tunisie et le Maroc.',
      links: 'Liens rapides',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions générales',
      rights: 'Tous droits réservés.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      vehicles: 'السيارات',
      services: 'الخدمات',
      howItWorks: 'كيف يعمل',
      contact: 'اتصل بنا',
      requestQuote: 'طلب عرض أسعار',
    },
    hero: {
      title: 'نصدّر سيارتك من فرنسا إلى المغرب العربي',
      subtitle: 'الجزائر، تونس، المغرب',
      description: 'نرافقك في شراء وتصدير سيارتك من فرنسا إلى الجزائر وتونس والمغرب. شفافية وخبرة وخدمة شخصية.',
      cta1: 'عرض السيارات',
      cta2: 'طلب عرض أسعار',
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'مرافقة كاملة لمشروع الاستيراد الخاص بك',
      items: [
        { title: 'البحث عن السيارة', description: 'نجد السيارة المثالية حسب معاييرك وميزانيتك.' },
        { title: 'الشراء من فرنسا', description: 'تفاوض وشراء آمن من بائعين موثوقين.' },
        { title: 'الإجراءات الإدارية', description: 'إدارة كاملة للوثائق والإجراءات الجمركية.' },
        { title: 'ميكانيك سريع', description: 'صيانة وإصلاحات سريعة لسيارتك.' },
      ],
    },
    vehicles: {
      title: 'سياراتنا',
      subtitle: 'اكتشف مجموعتنا من السيارات الجديدة والمستعملة',
      filter: {
        all: 'الكل',
        new: 'جديد',
        used: 'مستعمل',
        brand: 'الماركة',
        year: 'السنة',
        fuel: 'الوقود',
      },
      cta: 'طلب هذه السيارة',
      viewAll: 'عرض جميع السيارات',
    },
    howItWorks: {
      title: 'كيف يعمل',
      subtitle: 'عملية بسيطة وشفافة في 2 خطوات',
      steps: [
        { number: '01', title: 'اختيار السيارة', description: 'اختر سيارتك من الكتالوج أو قدم طلبًا مخصصًا.' },
        { number: '02', title: 'الشراء من فرنسا', description: 'نقوم بشراء السيارة بأمان بعد موافقتك.' },
      ],
    },
    whyUs: {
      title: 'لماذا تختارنا',
      subtitle: 'سنوات من الخبرة في خدمتك',
      items: [
        { title: 'خبرة فرنسا-المغرب العربي', description: 'خبرة قوية في تصدير السيارات.' },
        { title: 'شفافية الأسعار', description: 'عرض أسعار مفصل بدون رسوم مخفية.' },
        { title: 'مرافقة كاملة', description: 'محاور واحد من البداية إلى النهاية.' },
        { title: 'عملاء راضون', description: 'مئات السيارات تم تصديرها بنجاح.' },
        { title: 'تواصل واضح', description: 'متابعة في الوقت الحقيقي وتوافر دائم.' },
      ],
    },
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'رضاهم هو أولويتنا',
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'نحن في خدمتك لأي استفسار',
      phone: 'الهاتف',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      address: 'العنوان',
    },
    form: {
      title: 'طلب عرض أسعار',
      subtitle: 'املأ النموذج للحصول على عرض مخصص',
      name: 'الاسم الكامل',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      vehicle: 'السيارة المطلوبة',
      budget: 'الميزانية المقدرة',
      message: 'الرسالة',
      submit: 'إرسال الطلب',
      success: 'تم استلام طلبك بنجاح. سنتواصل معك في أقرب وقت ممكن.',
    },
    footer: {
      description: 'شريكك الموثوق لتصدير السيارات من فرنسا إلى الجزائر وتونس والمغرب.',
      links: 'روابط سريعة',
      legal: 'الإشعارات القانونية',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط العامة',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};

export const useTranslation = (lang: Language) => {
  return translations[lang];
};
