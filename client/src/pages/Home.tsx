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
import { FileText, Calendar, CheckCircle, ClipboardCheck, MapPin, Shield, Sparkles, Stamp, Users, Zap, FileCheck, Award, Building2, RefreshCw, Type, Edit, FileSpreadsheet, FileBadge, RotateCw, BadgeCheck } from 'lucide-react';
import { Link } from 'wouter';


export default function Home() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  

  // Old services (government services)
  const oldServices = [
    {
      icon: FileText,
      title: language === 'ar' ? 'تجديد جواز السفر' : 'Passport Renewal',
      description: language === 'ar' ? 'خدمة تجديد جواز السفر بكل سهولة ويسر' : 'Easy and convenient passport renewal service',
      color: 'text-blue-600',
    },
    {
      icon: ClipboardCheck,
      title: language === 'ar' ? 'تجديد الهوية' : 'ID Renewal',
      description: language === 'ar' ? 'خدمة تجديد الهوية الوطنية بسرعة وكفاءة' : 'Fast and efficient national ID renewal service',
      color: 'text-green-600',
    },
    {
      icon: Calendar,
      title: language === 'ar' ? 'تجديد الرخصة' : 'License Renewal',
      description: language === 'ar' ? 'خدمة تجديد رخصة القيادة بكل سهولة' : 'Easy driving license renewal service',
      color: 'text-purple-600',
    },
    {
      icon: FileCheck,
      title: language === 'ar' ? 'استخراج شهادة ولادة' : 'Birth Certificate',
      description: language === 'ar' ? 'استخراج شهادة ولادة بسرعة وكفاءة' : 'Fast and efficient birth certificate extraction',
      color: 'text-red-600',
    },
    {
      icon: Stamp,
      title: language === 'ar' ? 'تصديقات رسمية' : 'Official Certifications',
      description: language === 'ar' ? 'تصديقات رسمية لجميع أنواع الوثائق' : 'Official certifications for all document types',
      color: 'text-yellow-600',
    },
    {
      icon: FileText,
      title: language === 'ar' ? 'استخراج وثائق' : 'Document Extraction',
      description: language === 'ar' ? 'استخراج جميع أنواع الوثائق الرسمية' : 'Extraction of all official documents',
      color: 'text-cyan-600',
    },
    {
      icon: Award,
      title: language === 'ar' ? 'خدمات الأحوال المدنية' : 'Civil Affairs Services',
      description: language === 'ar' ? 'خدمات الأحوال المدنية الشاملة' : 'Comprehensive civil affairs services',
      color: 'text-indigo-600',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'خدمات الجوازات' : 'Passport Services',
      description: language === 'ar' ? 'خدمات الجوازات السريعة والمتكاملة' : 'Fast and complete passport services',
      color: 'text-rose-600',
    },
  ];

  // New services (commercial registry services)
  const newServices = [
    {
      icon: Building2,
      title: language === 'ar' ? 'قيد سجل تجاري' : 'Commercial Registration',
      description: language === 'ar' ? 'إصدار سجل تجاري جديد لمؤسسة فردية' : 'Issue new commercial registration for individual establishment',
      color: 'text-blue-600',
    },
    {
      icon: RefreshCw,
      title: language === 'ar' ? 'تجديد سجل تجاري' : 'Renew Commercial Registration',
      description: language === 'ar' ? 'تجديد صلاحية السجل التجاري القائم' : 'Renew existing commercial registration validity',
      color: 'text-green-600',
    },
    {
      icon: Type,
      title: language === 'ar' ? 'حجز اسم تجاري' : 'Reserve Trade Name',
      description: language === 'ar' ? 'حجز اسم تجاري جديد قبل إصدار السجل' : 'Reserve new trade name before registration',
      color: 'text-purple-600',
    },
    {
      icon: Edit,
      title: language === 'ar' ? 'تعديل سجل تجاري' : 'Modify Commercial Registration',
      description: language === 'ar' ? 'تعديل بيانات السجل التجاري الحالي' : 'Modify current commercial registration data',
      color: 'text-orange-600',
    },
    {
      icon: FileSpreadsheet,
      title: language === 'ar' ? 'مستخرج سجل تجاري / الإفادة التجارية' : 'Commercial Registration Extract',
      description: language === 'ar' ? 'الحصول على مستخرج رسمي لبيانات السجل التجاري' : 'Get official extract of commercial registration data',
      color: 'text-cyan-600',
    },
    {
      icon: FileBadge,
      title: language === 'ar' ? 'إصدار رخصة تجارية' : 'Issue Commercial License',
      description: language === 'ar' ? 'إصدار رخصة لمزاولة النشاط التجاري' : 'Issue license for commercial activity',
      color: 'text-indigo-600',
    },
    {
      icon: RotateCw,
      title: language === 'ar' ? 'تجديد رخصة تجارية' : 'Renew Commercial License',
      description: language === 'ar' ? 'تجديد صلاحية الرخصة التجارية المنتهية' : 'Renew expired commercial license validity',
      color: 'text-teal-600',
    },
    {
      icon: BadgeCheck,
      title: language === 'ar' ? 'تسجيل علامة تجارية' : 'Register Trademark',
      description: language === 'ar' ? 'تسجيل وحماية العلامة التجارية الخاصة بك' : 'Register and protect your trademark',
      color: 'text-rose-600',
    },
  ];

  // Combine all services
  const services = [...newServices, ...oldServices];

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
                  <Link href="/book">
                      <Button size="lg" className="w-full sm:w-auto">
                        <Calendar className="mr-2 h-5 w-5" />
                        {t('bookNow')}
                      </Button>
                    </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Sparkles className="h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Policy Banner */}
        <section className="py-8 bg-primary/5 border-y">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-semibold">{t('freeBooking')}</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-semibold">{t('freeCancellation')}</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-semibold">{t('payAfterService')}</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-semibold">{t('qualityGuarantee')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'نقدم مجموعة شاملة من خدمات تعقيب المعاملات الحكومية والسجل التجاري'
                  : 'We offer a comprehensive range of government transaction and commercial registration services'}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <service.icon className={`h-12 w-12 ${service.color} mb-4`} />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('whyTitle')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('statsTitle')}</h2>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('howItWorksTitle')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'جاهز لإنجاز معاملتك؟' : 'Ready to Complete Your Transaction?'}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {language === 'ar' 
                  ? 'تواصل معنا الآن وسنساعدك في إنجاز معاملتك بسرعة واحترافية'
                  : 'Contact us now and we will help you complete your transaction quickly and professionally'}
              </p>
              <Link href="/book">
                  <Button size="lg" variant="secondary">
                    {t('bookNow')}
                  </Button>
                </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
