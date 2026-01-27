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
import { FileText, Calendar, CheckCircle, ClipboardCheck, MapPin, Shield, Sparkles, Stamp, Users, Zap, FileCheck, Award } from 'lucide-react';
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
      icon: FileText,
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
      icon: Calendar,
      title: t('roadsideInspection'),
      description: t('roadsideInspectionDesc'),
      color: 'text-purple-600',
    },
    {
      icon: FileCheck,
      title: t('roadsideAssistance'),
      description: language === 'ar' ? 'استخراج شهادة ولادة بسرعة وكفاءة' : 'Fast and efficient birth certificate extraction',
      color: 'text-red-600',
    },
    {
      icon: Stamp,
      title: t('vehicleTowing'),
      description: language === 'ar' ? 'تصديقات رسمية لجميع أنواع الوثائق' : 'Official certifications for all document types',
      color: 'text-yellow-600',
    },
    {
      icon: FileText,
      title: t('onSiteRepair'),
      description: language === 'ar' ? 'استخراج جميع أنواع الوثائق الرسمية' : 'Extraction of all official documents',
      color: 'text-cyan-600',
    },
    {
      icon: Award,
      title: t('garageRepair'),
      description: language === 'ar' ? 'خدمات الأحوال المدنية الشاملة' : 'Comprehensive civil affairs services',
      color: 'text-indigo-600',
    },
    {
      icon: Zap,
      title: t('technicalInspection'),
      description: language === 'ar' ? 'خدمات الجوازات السريعة والمتكاملة' : 'Fast and complete passport services',
      color: 'text-rose-600',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: t('vehicleSafety'),
      description: t('vehicleSafetyDesc'),
    },
    {
      icon: Shield,
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
    { value: '5000+', label: t('stationsCount') },
    { value: '50+', label: t('engineersCount') },
    { value: '10+', label: t('experienceYears') },
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
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
                  src="/images/barq-logo.png"
                  alt="Barq Government Services"
                  className="w-full h-auto object-contain max-w-md mx-auto"
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
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'نقدم مجموعة شاملة من خدمات تعقيب المعاملات الحكومية بكل احترافية وسرعة'
                  : 'We provide a comprehensive range of government transaction services with professionalism and speed'
                }
              </p>
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

        {/* Why Choose Us Section */}
        <section id="about" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('whyTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'نتميز بالسرعة والاحترافية في إنجاز معاملاتك الحكومية'
                  : 'We excel in speed and professionalism in completing your government transactions'
                }
              </p>
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
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'خطوات بسيطة لإنجاز معاملتك'
                  : 'Simple steps to complete your transaction'
                }
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {language === 'ar' 
                  ? 'جاهز لإنجاز معاملتك؟'
                  : 'Ready to complete your transaction?'
                }
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === 'ar' 
                  ? 'قدم طلبك الآن ودع فريقنا المحترف يتولى الأمر'
                  : 'Submit your request now and let our professional team handle it'
                }
              </p>
              {bookingUrl ? (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    {t('bookNow')}
                  </Button>
                </a>
              ) : (
                <Link href="/book">
                  <Button size="lg">
                    {t('bookNow')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
