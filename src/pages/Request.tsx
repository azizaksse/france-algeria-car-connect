import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CircleCheck, SendHorizonal, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
  'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
  'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda',
  'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem',
  'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj',
  'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
  'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane'
];

const Request = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    budget: '',
    wilaya: '',
    message: '',
  });

  useEffect(() => {
    const vehicle = searchParams.get('vehicle');
    if (vehicle) {
      setFormData((prev) => ({ ...prev, vehicle: decodeURIComponent(vehicle) }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: language === 'fr' ? 'Demande envoyée !' : 'تم إرسال الطلب!',
      description: t.form.success,
    });
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>{language === 'fr' ? 'Demande envoyée - AutoExportDZ' : 'تم إرسال الطلب - AutoExportDZ'}</title>
        </Helmet>
        <Layout>
          <section className="pt-32 pb-16 min-h-screen bg-secondary/30 flex items-center">
            <div className="container-custom">
              <div className="max-w-lg mx-auto text-center animate-scale-in">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CircleCheck className="w-10 h-10 text-accent" />
                </div>
                <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                  {language === 'fr' ? 'Demande reçue !' : 'تم استلام الطلب!'}
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {t.form.success}
                </p>
                <Button variant="navy" size="lg" onClick={() => setIsSuccess(false)}>
                  {language === 'fr' ? 'Nouvelle demande' : 'طلب جديد'}
                </Button>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{language === 'fr' ? 'Demander un devis - AutoExportDZ' : 'طلب عرض أسعار - AutoExportDZ'}</title>
        <meta
          name="description"
          content={
            language === 'fr'
              ? "Demandez un devis personnalisé pour l'exportation de votre véhicule vers l'Algérie."
              : 'اطلب عرض أسعار مخصص لتصدير سيارتك إلى الجزائر.'
          }
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t.form.title}
              </h1>
              <p className="text-primary-foreground/70 text-lg">
                {t.form.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-soft animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.form.name} *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={language === 'fr' ? 'Votre nom complet' : 'اسمك الكامل'}
                      className="h-12"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.form.phone} *</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+33 6 12 34 56 78"
                      className="h-12"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">{t.form.email} *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@exemple.com"
                      className="h-12"
                    />
                  </div>

                  {/* Vehicle */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.form.vehicle}</label>
                    <Input
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      placeholder={language === 'fr' ? 'Ex: Peugeot 3008' : 'مثال: بيجو 3008'}
                      className="h-12"
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.form.budget}</label>
                    <Input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder={language === 'fr' ? 'Ex: 20 000 - 30 000 €' : 'مثال: 20,000 - 30,000 €'}
                      className="h-12"
                    />
                  </div>

                  {/* Wilaya */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">{t.form.wilaya}</label>
                    <select
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">{language === 'fr' ? 'Sélectionner une wilaya' : 'اختر ولاية'}</option>
                      {wilayas.map((wilaya) => (
                        <option key={wilaya} value={wilaya}>{wilaya}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">{t.form.message}</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={language === 'fr' ? 'Décrivez votre projet...' : 'صف مشروعك...'}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="accent"
                  size="xl"
                  className="w-full mt-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      <span>{language === 'fr' ? 'Envoi en cours...' : 'جاري الإرسال...'}</span>
                    </>
                  ) : (
                    <>
                      <SendHorizonal className="w-5 h-5" />
                      <span>{t.form.submit}</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Request;
