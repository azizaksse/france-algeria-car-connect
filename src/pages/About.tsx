import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import { Shield, Users, Award, Heart, Target, Lightbulb } from 'lucide-react';
import SEO from '@/components/SEO';

const About = () => {
  const { language } = useLanguage();
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: storyRef, isInView: storyInView } = useInView({ threshold: 0.1 });
  const { ref: valuesRef, isInView: valuesInView } = useInView({ threshold: 0.1 });

  const content = {
    fr: {
      title: 'À Propos de Nous',
      subtitle: 'Votre partenaire de confiance depuis plus de 10 ans',
      story: {
        title: 'Notre Histoire',
        p1: 'AA AUTO EXPORT est née d\'une passion pour l\'automobile et d\'une volonté d\'accompagner la diaspora algérienne en France dans leurs projets d\'acquisition de véhicules.',
        p2: 'Depuis plus de 10 ans, nous avons construit une expertise solide dans l\'exportation de véhicules de France vers l\'Algérie, en développant un réseau de partenaires fiables et en perfectionnant nos processus.',
        p3: 'Aujourd\'hui, nous sommes fiers d\'avoir accompagné des centaines de clients satisfaits et de continuer à leur offrir un service d\'excellence.',
      },
      mission: {
        title: 'Notre Mission',
        description: 'Rendre l\'exportation de véhicules simple, transparente et accessible à tous.',
      },
      values: {
        title: 'Nos Valeurs',
        items: [
          { icon: Shield, title: 'Confiance', description: 'Nous construisons des relations durables basées sur l\'honnêteté et la fiabilité.' },
          { icon: Users, title: 'Proximité', description: 'Un interlocuteur unique vous accompagne du début à la fin de votre projet.' },
          { icon: Award, title: 'Excellence', description: 'Nous visons l\'excellence dans chaque aspect de notre service.' },
          { icon: Heart, title: 'Passion', description: 'Notre passion pour l\'automobile guide chacune de nos actions.' },
          { icon: Target, title: 'Engagement', description: 'Nous nous engageons à respecter nos délais et nos promesses.' },
          { icon: Lightbulb, title: 'Innovation', description: 'Nous améliorons constamment nos processus pour mieux vous servir.' },
        ],
      },
      stats: [
        { value: '10+', label: 'Années d\'expérience' },
        { value: '500+', label: 'Véhicules exportés' },
        { value: '100%', label: 'Clients satisfaits' },
        { value: '48', label: 'Wilayas desservies' },
      ],
    },
    ar: {
      title: 'من نحن',
      subtitle: 'شريكك الموثوق منذ أكثر من 10 سنوات',
      story: {
        title: 'قصتنا',
        p1: 'ولدت AA AUTO EXPORT من شغف بالسيارات ورغبة في مساعدة الجالية الجزائرية في فرنسا في مشاريع شراء السيارات.',
        p2: 'منذ أكثر من 10 سنوات، بنينا خبرة قوية في تصدير السيارات من فرنسا إلى الجزائر، من خلال تطوير شبكة من الشركاء الموثوقين وتحسين عملياتنا.',
        p3: 'اليوم، نحن فخورون بمرافقة مئات العملاء الراضين والاستمرار في تقديم خدمة متميزة لهم.',
      },
      mission: {
        title: 'مهمتنا',
        description: 'جعل تصدير السيارات بسيطًا وشفافًا ومتاحًا للجميع.',
      },
      values: {
        title: 'قيمنا',
        items: [
          { icon: Shield, title: 'الثقة', description: 'نبني علاقات دائمة مبنية على الصدق والموثوقية.' },
          { icon: Users, title: 'القرب', description: 'محاور واحد يرافقك من البداية إلى نهاية مشروعك.' },
          { icon: Award, title: 'التميز', description: 'نسعى للتميز في كل جانب من خدمتنا.' },
          { icon: Heart, title: 'الشغف', description: 'شغفنا بالسيارات يوجه كل تصرفاتنا.' },
          { icon: Target, title: 'الالتزام', description: 'نلتزم باحترام مواعيدنا ووعودنا.' },
          { icon: Lightbulb, title: 'الابتكار', description: 'نحسن عملياتنا باستمرار لخدمتك بشكل أفضل.' },
        ],
      },
      stats: [
        { value: '10+', label: 'سنوات من الخبرة' },
        { value: '500+', label: 'سيارة مصدرة' },
        { value: '100%', label: 'عملاء راضون' },
        { value: '48', label: 'ولاية مخدومة' },
      ],
    },
  };

  const t = content[language];

  return (
    <Layout>
      <SEO 
        title={language === 'fr' ? 'À Propos | AA AUTO EXPORT' : 'من نحن | AA AUTO EXPORT'}
        description={language === 'fr' 
          ? 'Découvrez AA AUTO EXPORT, votre partenaire de confiance pour l\'exportation de véhicules de France vers l\'Algérie depuis plus de 10 ans.'
          : 'اكتشف AA AUTO EXPORT، شريكك الموثوق لتصدير السيارات من فرنسا إلى الجزائر منذ أكثر من 10 سنوات.'
        }
      />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className={cn(
            "text-center max-w-3xl mx-auto transition-all duration-700",
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {t.title}
            </h1>
            <p className="text-primary-foreground/70 text-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-300",
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {t.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-primary-foreground/5 backdrop-blur-sm rounded-2xl border border-primary-foreground/10"
              >
                <div className="font-heading font-bold text-4xl text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/60 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={cn(
              "transition-all duration-700",
              storyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}>
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"
                  alt="Car showroom"
                  className="relative rounded-2xl shadow-glass w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>

            <div className={cn(
              "transition-all duration-700 delay-200",
              storyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t.story.title}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t.story.p1}</p>
                <p>{t.story.p2}</p>
                <p>{t.story.p3}</p>
              </div>

              <div className="mt-8 p-6 bg-accent/10 rounded-2xl border border-accent/20">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {t.mission.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.mission.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-12 transition-all duration-700",
            valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.values.items.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "bg-card p-6 rounded-2xl border border-border/50 shadow-glass transition-all duration-500 hover:shadow-glass-hover hover:-translate-y-2",
                  valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: valuesInView ? `${index * 100}ms` : '0ms' }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
