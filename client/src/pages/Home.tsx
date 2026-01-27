import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import EmergencyButton from '@/components/EmergencyButton';
import CookieConsent from '@/components/CookieConsent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { getBookingUrl, getBookingSettings } from '@/lib/countryCheck';
import { useState, useEffect } from 'react';
import { Ambulance, Calendar, CheckCircle, ClipboardCheck, MapPin, Shield, Sparkles, Truck, Users, Wrench, Zap } from 'lucide-react';
import { Link } from 'wouter';


export default function Home() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [bookingUrl, setBookingUrl] = useState('');

  useEffect(() => {
    // Fetch booking settings from Firestore and determine URL
    getBookingSettings().then(({ url, countries }) => {
      getBookingUrl(url, countries).then(setBookingUrl);
    });
  }, []);

  const services = [
    {
      icon: Calendar,
      title: t('periodicInspection'),
      description: t('periodicInspectionDesc'),
      color: 'text-blue-600',
    },
    {
      icon: ClipboardCheck,
      title: t('prePurchaseInspection'),
      description: t('prePurchaseInspectionDesc'),
      color: 'text-green-600',
    },
    {
      icon: Wrench,
      title: t('technicalInspection'),
      description: language === 'ar' ? 'فحص فني شامل لجميع أجزاء المركبة' : 'Comprehensive technical inspection of all vehicle parts',
      color: 'text-purple-600',
    },
    {
      icon: Ambulance,
      title: t('roadsideAssistance'),
      description: language === 'ar' ? 'مساعدة فورية على الطريق في حالات الطوارئ' : 'Immediate roadside assistance in emergencies',
      color: 'text-red-600',
    },
    {
      icon: Truck,
      title: t('vehicleTowing'),
      description: language === 'ar' ? 'نقل المركبات المعطلة بأمان إلى الوجهة المطلوبة' : 'Safe towing of broken vehicles to desired destination',
      color: 'text-yellow-600',
    },
    {
      icon: Zap,
      title: t('onSiteRepair'),
      description: language === 'ar' ? 'تصليح سريع في موقعك دون الحاجة للتوجه للكراج' : 'Quick repair at your location without going to garage',
      color: 'text-cyan-600',
    },
    {
      icon: Wrench,
      title: t('garageRepair'),
      description: language === 'ar' ? 'تصليح شامل في كراجاتنا المجهزة بأحدث المعدات' : 'Comprehensive repair in our garages equipped with latest tools',
      color: 'text-indigo-600',
    },
    {
      icon: Zap,
      title: t('emergencyService'),
      description: language === 'ar' ? 'خدمة طوارئ سريعة متاحة 24/7 للحالات العاجلة' : 'Fast emergency service available 24/7 for urgent cases',
      color: 'text-rose-600',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: t('vehicleSafety'),
      description: t('vehicleSafetyDesc'),
    },
    {
      icon: Sparkles,
      title: t('environmentalProtection'),
      description: t('environmentalProtectionDesc'),
    },
    {
      icon: CheckCircle,
      title: t('earlyDetection'),
      description: t('earlyDetectionDesc'),
    },
    {
      icon: Users,
      title: t('professionalTeam'),
      description: t('professionalTeamDesc'),
    },
  ];

  const stats = [
    { value: '150+', label: t('stationsCount') },
    { value: '500+', label: t('engineersCount') },
    { value: '15+', label: t('experienceYears') },
  ];

  const steps = [
    {
      number: '1',
      title: t('step1'),
      description: t('step1Desc'),
    },
    {
      number: '2',
      title: t('step2'),
      description: t('step2Desc'),
    },
    {
      number: '3',
      title: t('step3'),
      description: t('step3Desc'),
    },
    {
      number: '4',
      title: t('step4'),
      description: t('step4Desc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WhatsAppButton />
      <EmergencyButton />
      <CookieConsent />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-green-500/10" />
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {t('heroTitle')}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {bookingUrl ? (
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="w-full sm:w-auto">
                        {t('bookNow')}
                      </Button>
                    </a>
                  ) : (
                    <Link href="/book">
                      <Button size="lg" className="w-full sm:w-auto">
                        {t('bookNow')}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/hero-inspection-new.png"
                  alt="Car Inspection Station"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <service.icon className={`h-12 w-12 ${service.color} mb-4`} />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{language === 'ar' ? 'مواقع الفحص الفني الدوري' : 'Periodic Inspection Locations'}</h2>
            </div>
            <div className="flex justify-center">
              <img src="/images/map-saudi.png" alt="Saudi Arabia Map" className="w-full max-w-4xl rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('whyTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('howItWorksTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 start-full w-full h-0.5 bg-border" style={{ width: 'calc(100% - 4rem)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Policy Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('paymentPolicy')}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {t('paymentPolicyDesc')}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t('freeBooking')}
                    </h3>
                    <p className="text-gray-600">
                      {t('noPaymentRequired')}
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t('freeCancellation')}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'ar' ? 'إلغِ حجزك في أي وقت بدون أي رسوم' : 'Cancel your booking anytime without any fees'}
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-teal-50 rounded-xl">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t('payAfterService')}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'ar' ? 'ادفع فقط بعد رضاك التام' : 'Pay only after your complete satisfaction'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t('qualityGuarantee')}
                      </h3>
                      <p className="text-gray-700">
                        {t('qualityGuaranteeDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'ar' ? 'جاهز لفحص مركبتك؟' : 'Ready to Inspect Your Vehicle?'}
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'احجز موعدك الآن واحصل على فحص شامل لمركبتك من قبل فريق محترف'
                : 'Book your appointment now and get a comprehensive inspection by our professional team'}
            </p>
            {bookingUrl ? (
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  {t('bookNow')}
                </Button>
              </a>
            ) : (
              <Link href="/book">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  {t('bookNow')}
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
