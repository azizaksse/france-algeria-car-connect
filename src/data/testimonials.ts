export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text_fr: string;
  text_ar: string;
  rating: number;
  vehicle: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Karim B.',
    location: 'Alger',
    text_fr: 'Service impeccable du début à la fin. J\'ai reçu ma Peugeot 3008 en parfait état, exactement comme promis. Je recommande vivement.',
    text_ar: 'خدمة ممتازة من البداية إلى النهاية. استلمت سيارتي بيجو 3008 في حالة ممتازة، تمامًا كما وُعدت. أنصح بشدة.',
    rating: 5,
    vehicle: 'Peugeot 3008',
  },
  {
    id: '2',
    name: 'Ahmed M.',
    location: 'Oran',
    text_fr: 'Très professionnel et transparent. Les prix sont clairs, pas de mauvaises surprises. Livraison rapide à Oran.',
    text_ar: 'محترف جدًا وشفاف. الأسعار واضحة، بدون مفاجآت سيئة. التسليم كان سريعًا في وهران.',
    rating: 5,
    vehicle: 'Renault Clio V',
  },
  {
    id: '3',
    name: 'Fatima Z.',
    location: 'Constantine',
    text_fr: 'Équipe réactive et disponible. Ils ont trouvé le véhicule exact que je cherchais. Merci pour votre professionnalisme.',
    text_ar: 'فريق متجاوب ومتاح. وجدوا السيارة التي كنت أبحث عنها بالضبط. شكرًا على احترافيتكم.',
    rating: 5,
    vehicle: 'Mercedes Classe A',
  },
  {
    id: '4',
    name: 'Youcef D.',
    location: 'Annaba',
    text_fr: 'Première expérience d\'import et tout s\'est très bien passé. Accompagnement complet pour les papiers.',
    text_ar: 'أول تجربة استيراد وكل شيء سار على ما يرام. مرافقة كاملة للأوراق.',
    rating: 5,
    vehicle: 'Volkswagen Golf 8',
  },
];
