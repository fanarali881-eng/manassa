import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { getBookingSettings, getBookingUrl } from '@/lib/countryCheck';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EmergencyButton from '@/components/EmergencyButton';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'wouter';


export default function PricingPage() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [bookingUrl, setBookingUrl] = useState('');

  useEffect(() => {
    getBookingSettings().then(({ url, countries }) => {
      getBookingUrl(url, countries).then(setBookingUrl);
    });
  }, []);

  const pricingPlans = [
    {
      name: language === 'ar' ? 'تجديد جواز السفر' : 'Passport Renewal',
      price: language === 'ar' ? '200 ريال' : '200 SAR',
      features: [
        language === 'ar' ? 'استلام الوثائق' : 'Document collection',
        language === 'ar' ? 'مراجعة الجوازات' : 'Passport office visit',
        language === 'ar' ? 'متابعة الإجراءات' : 'Process follow-up',
        language === 'ar' ? 'استلام الجواز الجديد' : 'New passport delivery',
        language === 'ar' ? 'خدمة سريعة' : 'Fast service',
      ],
    },
    {
      name: language === 'ar' ? 'تجديد الهوية الوطنية' : 'National ID Renewal',
      price: language === 'ar' ? '150 ريال' : '150 SAR',
      popular: true,
      features: [
        language === 'ar' ? 'استلام الوثائق' : 'Document collection',
        language === 'ar' ? 'مراجعة الأحوال المدنية' : 'Civil affairs visit',
        language === 'ar' ? 'متابعة الإجراءات' : 'Process follow-up',
        language === 'ar' ? 'استلام الهوية الجديدة' : 'New ID delivery',
        language === 'ar' ? 'خدمة في نفس اليوم' : 'Same-day service',
      ],
    },
    {
      name: language === 'ar' ? 'تجديد رخصة القيادة' : 'Driver License Renewal',
      price: language === 'ar' ? '180 ريال' : '180 SAR',
      features: [
        language === 'ar' ? 'استلام الوثائق' : 'Document collection',
        language === 'ar' ? 'مراجعة المرور' : 'Traffic department visit',
        language === 'ar' ? 'الفحص الطبي' : 'Medical examination',
        language === 'ar' ? 'متابعة الإجراءات' : 'Process follow-up',
        language === 'ar' ? 'استلام الرخصة الجديدة' : 'New license delivery',
      ],
    },
  ];

  const additionalServices = [
    {
      name: language === 'ar' ? 'استخراج شهادة ولادة' : 'Birth Certificate',
      price: language === 'ar' ? 'من 120 ريال' : 'From 120 SAR',
    },
    {
      name: language === 'ar' ? 'تصديقات رسمية' : 'Official Certifications',
      price: language === 'ar' ? 'من 100 ريال' : 'From 100 SAR',
    },
    {
      name: language === 'ar' ? 'استخراج وثائق' : 'Document Extraction',
      price: language === 'ar' ? 'حسب الخدمة' : 'Per Service',
    },
    {
      name: language === 'ar' ? 'خدمات الأحوال المدنية' : 'Civil Affairs Services',
      price: language === 'ar' ? 'حسب الخدمة' : 'Per Service',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WhatsAppButton />
      <EmergencyButton />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('pricing')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {language === 'ar' 
                  ? 'أسعار تنافسية وخدمات احترافية لتعقيب معاملاتك الحكومية'
                  : 'Competitive prices and professional services for your government transactions'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl border-2 p-8 ${
                    plan.popular
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      {language === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-6">
                    {plan.price}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {bookingUrl ? (
                    <a href={bookingUrl} target="_blank">
                      <Button className="w-full" size="lg">
                        {t('bookNow')}
                      </Button>
                    </a>
                  ) : (
                    <Link href="/book">
                      <Button className="w-full" size="lg">
                        {t('bookNow')}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {language === 'ar' ? 'خدمات إضافية' : 'Additional Services'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {additionalServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                      <span className="text-lg font-bold text-primary">
                        {service.price}
                      </span>
                    </div>
                    
                    {bookingUrl ? (
                      <a href={bookingUrl} target="_blank">
                        <Button className="w-full">
                          {t('bookNow')}
                        </Button>
                      </a>
                    ) : (
                      <Link href="/book">
                        <Button className="w-full">
                          {t('bookNow')}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Payment Policy */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                {t('paymentPolicy')}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="font-semibold mb-2">{t('freeBooking')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('noPaymentRequired')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-3">❌</div>
                  <h3 className="font-semibold mb-2">{t('freeCancellation')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'إلغاء مجاني في أي وقت'
                      : 'Free cancellation anytime'
                    }
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-semibold mb-2">{t('payAfterService')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'الدفع بعد إنجاز المعاملة'
                      : 'Pay after transaction completion'
                    }
                  </p>
                </div>
              </div>
              
              <p className="text-center text-muted-foreground">
                {t('paymentPolicyDesc')}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
