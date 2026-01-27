import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { getBookingUrl } from '@/lib/countryCheck';
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
  
  // Read external booking URL and allowed countries from window object
  const externalBookingUrl = (window as any).EXTERNAL_BOOKING_URL || '';
  const allowedCountries = (window as any).ALLOWED_COUNTRIES || [];

  useEffect(() => {
    // Check user's country and set appropriate booking URL
    getBookingUrl(externalBookingUrl, allowedCountries).then(setBookingUrl);
  }, [externalBookingUrl, allowedCountries]);

  const pricingPlans = [
    {
      name: language === 'ar' ? 'الفحص الدوري' : 'Periodic Inspection',
      price: language === 'ar' ? '150 ريال' : '150 SAR',
      features: [
        language === 'ar' ? 'فحص شامل للمركبة' : 'Comprehensive vehicle inspection',
        language === 'ar' ? 'فحص نظام الفرامل' : 'Brake system inspection',
        language === 'ar' ? 'فحص الإطارات والعجلات' : 'Tire and wheel inspection',
        language === 'ar' ? 'فحص الإضاءة' : 'Lighting inspection',
        language === 'ar' ? 'فحص الانبعاثات' : 'Emissions inspection',
        language === 'ar' ? 'تقرير مفصل' : 'Detailed report',
      ],
    },
    {
      name: language === 'ar' ? 'فحص قبل الشراء' : 'Pre-Purchase Inspection',
      price: language === 'ar' ? '300 ريال' : '300 SAR',
      popular: true,
      features: [
        language === 'ar' ? 'فحص شامل للمركبة' : 'Comprehensive vehicle inspection',
        language === 'ar' ? 'فحص المحرك والناقل' : 'Engine and transmission inspection',
        language === 'ar' ? 'فحص الهيكل والصدمات' : 'Body and collision inspection',
        language === 'ar' ? 'فحص الكهرباء والإلكترونيات' : 'Electrical and electronics inspection',
        language === 'ar' ? 'اختبار قيادة' : 'Test drive',
        language === 'ar' ? 'تقرير مفصل مع صور' : 'Detailed report with photos',
        language === 'ar' ? 'تقييم السعر العادل' : 'Fair price evaluation',
      ],
    },
    {
      name: language === 'ar' ? 'الفحص الفني الشامل' : 'Comprehensive Technical Inspection',
      price: language === 'ar' ? '500 ريال' : '500 SAR',
      features: [
        language === 'ar' ? 'جميع ميزات الفحص قبل الشراء' : 'All pre-purchase inspection features',
        language === 'ar' ? 'فحص تفصيلي للمحرك' : 'Detailed engine inspection',
        language === 'ar' ? 'فحص نظام التكييف' : 'A/C system inspection',
        language === 'ar' ? 'فحص نظام التعليق' : 'Suspension system inspection',
        language === 'ar' ? 'فحص بالكمبيوتر (OBD)' : 'Computer diagnostics (OBD)',
        language === 'ar' ? 'فحص السوائل والزيوت' : 'Fluids and oils inspection',
        language === 'ar' ? 'ضمان 30 يوم' : '30-day warranty',
      ],
    },
  ];

  const additionalServices = [
    {
      name: language === 'ar' ? 'المساعدة على الطريق' : 'Roadside Assistance',
      price: language === 'ar' ? 'من 100 ريال' : 'From 100 SAR',
    },
    {
      name: language === 'ar' ? 'نقل المركبات المعطلة' : 'Vehicle Towing',
      price: language === 'ar' ? 'من 200 ريال' : 'From 200 SAR',
    },
    {
      name: language === 'ar' ? 'التصليح الميداني' : 'On-site Repair',
      price: language === 'ar' ? 'حسب الخدمة' : 'Per Service',
    },
    {
      name: language === 'ar' ? 'التصليح في الكراجات' : 'Garage Repair',
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
                {language === 'ar' ? 'الأسعار والباقات' : 'Pricing & Packages'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === 'ar'
                  ? 'اختر الباقة المناسبة لاحتياجاتك - أسعار شفافة وعادلة'
                  : 'Choose the package that suits your needs - transparent and fair prices'}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-card rounded-lg border p-8 ${
                    plan.popular ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        {language === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {plan.price}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {bookingUrl ? (
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        {t('bookNow')}
                      </Button>
                    </a>
                  ) : (
                    <Link href="/book">
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'خدمات إضافية' : 'Additional Services'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === 'ar'
                  ? 'خدمات أخرى نقدمها لراحتك وسلامتك'
                  : 'Other services we provide for your comfort and safety'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-card rounded-lg border p-6 text-center">
                  <h3 className="font-bold mb-2">{service.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                  {bookingUrl ? (
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                      </Button>
                    </a>
                  ) : (
                    <Link href="/book">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact for Custom Quote */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center bg-primary/10 rounded-lg p-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'تحتاج عرض سعر مخصص؟' : 'Need a Custom Quote?'}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'ar'
                  ? 'اتصل بنا للحصول على عرض سعر مخصص لاحتياجاتك الخاصة'
                  : 'Contact us for a custom quote tailored to your specific needs'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:00966541331452">
                    {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/966541331452" target="_blank" rel="noopener noreferrer">
                    {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
