import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EmergencyButton from '@/components/EmergencyButton';
import { Award, Users, Target, Eye, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const stats = [
    { number: '150+', label: language === 'ar' ? 'محطة فحص' : 'Inspection Stations' },
    { number: '500+', label: language === 'ar' ? 'فني محترف' : 'Professional Technicians' },
    { number: '15+', label: language === 'ar' ? 'عام خبرة' : 'Years of Experience' },
    { number: '50,000+', label: language === 'ar' ? 'عميل راضٍ' : 'Satisfied Customers' },
  ];

  const values = [
    {
      icon: Award,
      title: language === 'ar' ? 'الجودة والتميز' : 'Quality & Excellence',
      desc: language === 'ar' 
        ? 'نلتزم بأعلى معايير الجودة في جميع خدماتنا'
        : 'We commit to the highest quality standards in all our services'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'فريق محترف' : 'Professional Team',
      desc: language === 'ar'
        ? 'فنيون ومهندسون سعوديون مدربون على أعلى مستوى'
        : 'Saudi technicians and engineers trained to the highest level'
    },
    {
      icon: CheckCircle2,
      title: language === 'ar' ? 'الشفافية والمصداقية' : 'Transparency & Credibility',
      desc: language === 'ar'
        ? 'نقدم تقارير دقيقة وشفافة لجميع عملائنا'
        : 'We provide accurate and transparent reports to all our clients'
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
                {language === 'ar' ? 'من نحن' : 'About Us'}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'سلامات هي الشركة الرائدة في مجال فحص سلامة المركبات في المملكة العربية السعودية. نعمل منذ أكثر من 15 عاماً على رفع مستوى السلامة المرورية من خلال تقديم خدمات فحص فني شامل ومتخصص.'
                  : 'Salamat is the leading company in vehicle safety inspection in Saudi Arabia. For over 15 years, we have been working to raise road safety standards through comprehensive and specialized technical inspection services.'}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'ar'
                    ? 'أن نكون الخيار الأول والأكثر موثوقية في مجال فحص سلامة المركبات في المملكة العربية السعودية ودول الخليج، من خلال تقديم خدمات عالية الجودة تساهم في تحقيق رؤية المملكة 2030 للسلامة المرورية.'
                    : 'To be the first and most reliable choice in vehicle safety inspection in Saudi Arabia and the Gulf countries, by providing high-quality services that contribute to achieving the Kingdom\'s Vision 2030 for road safety.'}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {language === 'ar'
                    ? 'تقديم خدمات فحص فني شامل ودقيق للمركبات باستخدام أحدث التقنيات والمعدات، مع فريق من المهندسين والفنيين المؤهلين، لضمان سلامة المركبات على الطرق والمساهمة في الحد من الحوادث المرورية وحماية البيئة.'
                    : 'Providing comprehensive and accurate technical inspection services for vehicles using the latest technologies and equipment, with a team of qualified engineers and technicians, to ensure vehicle safety on roads and contribute to reducing traffic accidents and protecting the environment.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'قيمنا' : 'Our Values'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'القيم التي نؤمن بها ونلتزم بها في جميع أعمالنا'
                  : 'The values we believe in and commit to in all our work'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-card p-8 rounded-lg border hover:shadow-lg transition-shadow">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'الشهادات والتراخيص' : 'Certifications & Licenses'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'معتمدون من الجهات الرسمية في المملكة'
                  : 'Certified by official authorities in the Kingdom'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg border text-center">
                <div className="mb-4">
                  <img src="/license.png" alt="License" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {language === 'ar' ? 'ترخيص وزارة التجارة' : 'Ministry of Commerce License'}
                </h3>
                <p className="text-sm text-muted-foreground font-semibold">
                  {language === 'ar' ? 'رقم الترخيص: 1-1-YV5YA' : 'License No: 1-1-YV5YA'}
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border text-center">
                <div className="p-4 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {language === 'ar' ? 'شهادة الأيزو 9001' : 'ISO 9001 Certificate'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إدارة الجودة' : 'Quality Management'}
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border text-center">
                <div className="p-4 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {language === 'ar' ? 'عضوية الغرفة التجارية' : 'Chamber of Commerce Membership'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'رقم العضوية: CC-XXXX' : 'Membership No: CC-XXXX'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
