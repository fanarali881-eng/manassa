import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import EmergencyButton from '@/components/EmergencyButton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  const { language } = useLanguage();

  const faqs = language === 'ar' ? [
    {
      question: 'ما هي مدة الفحص الدوري؟',
      answer: 'عادة يستغرق الفحص الدوري من 30 إلى 45 دقيقة، حسب حالة المركبة ونوع الفحص المطلوب.'
    },
    {
      question: 'هل أحتاج إلى حجز موعد مسبق؟',
      answer: 'نعم، ننصح بحجز موعد مسبق لضمان توفر الوقت المناسب لك. يمكنك الحجز عبر الموقع أو الاتصال بنا مباشرة.'
    },
    {
      question: 'ماذا أحتاج لإحضاره معي للفحص؟',
      answer: 'يجب إحضار رخصة القيادة، استمارة المركبة، وبطاقة الهوية الوطنية أو الإقامة.'
    },
    {
      question: 'كم مرة يجب فحص السيارة؟',
      answer: 'حسب نظام المرور السعودي، يجب فحص المركبات سنوياً. للمركبات القديمة (أكثر من 5 سنوات)، قد يتطلب الأمر فحصاً كل 6 أشهر.'
    },
    {
      question: 'ماذا يحدث إذا لم تجتز السيارة الفحص؟',
      answer: 'سنقدم لك تقريراً مفصلاً بالأعطال التي يجب إصلاحها. يمكنك إصلاحها في مركزنا أو في أي مركز آخر، ثم إعادة الفحص مجاناً خلال 30 يوماً.'
    },
    {
      question: 'هل تقدمون خدمة الفحص في الموقع؟',
      answer: 'نعم، نقدم خدمة الفحص الميداني في موقعك للشركات والأفراد. يرجى الاتصال بنا للحصول على عرض سعر.'
    },
    {
      question: 'هل خدمة الطوارئ متاحة على مدار الساعة؟',
      answer: 'نعم، خدمة الطوارئ والمساعدة على الطريق متاحة 24/7 طوال أيام الأسبوع.'
    },
    {
      question: 'كم تكلفة نقل المركبة المعطلة؟',
      answer: 'تبدأ تكلفة النقل من 200 ريال حسب المسافة ونوع المركبة. اتصل بنا للحصول على سعر دقيق.'
    },
    {
      question: 'هل تقبلون بطاقات الائتمان؟',
      answer: 'نعم، نقبل جميع بطاقات الائتمان والخصم (Visa, Mastercard, Mada)، بالإضافة إلى الدفع النقدي.'
    },
    {
      question: 'هل يوجد ضمان على الفحص؟',
      answer: 'نعم، نقدم ضماناً على دقة الفحص. إذا اكتشفت أي عطل لم يتم ذكره في التقرير خلال 7 أيام، سنقوم بإعادة الفحص مجاناً.'
    },
  ] : [
    {
      question: 'How long does a periodic inspection take?',
      answer: 'A periodic inspection usually takes 30 to 45 minutes, depending on the vehicle condition and type of inspection required.'
    },
    {
      question: 'Do I need to book an appointment?',
      answer: 'Yes, we recommend booking an appointment in advance to ensure availability. You can book through our website or call us directly.'
    },
    {
      question: 'What do I need to bring for the inspection?',
      answer: 'You need to bring your driver\'s license, vehicle registration (Istimara), and national ID or Iqama.'
    },
    {
      question: 'How often should I inspect my vehicle?',
      answer: 'According to Saudi traffic regulations, vehicles must be inspected annually. For older vehicles (more than 5 years), inspection may be required every 6 months.'
    },
    {
      question: 'What happens if my vehicle fails the inspection?',
      answer: 'We will provide you with a detailed report of the issues that need to be fixed. You can repair them at our center or elsewhere, then re-inspect for free within 30 days.'
    },
    {
      question: 'Do you offer on-site inspection services?',
      answer: 'Yes, we offer on-site field inspection services for businesses and individuals. Please contact us for a quote.'
    },
    {
      question: 'Is emergency service available 24/7?',
      answer: 'Yes, our emergency and roadside assistance service is available 24/7, seven days a week.'
    },
    {
      question: 'How much does vehicle towing cost?',
      answer: 'Towing costs start from 200 SAR depending on distance and vehicle type. Call us for an accurate quote.'
    },
    {
      question: 'Do you accept credit cards?',
      answer: 'Yes, we accept all credit and debit cards (Visa, Mastercard, Mada), as well as cash payment.'
    },
    {
      question: 'Is there a warranty on the inspection?',
      answer: 'Yes, we provide a warranty on inspection accuracy. If you discover any issue not mentioned in the report within 7 days, we will re-inspect for free.'
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
                {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === 'ar'
                  ? 'إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا'
                  : 'Answers to the most common questions about our services'}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'لا تزال لديك أسئلة؟' : 'Still Have Questions?'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === 'ar'
                  ? 'فريقنا جاهز للإجابة على جميع استفساراتك'
                  : 'Our team is ready to answer all your questions'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:00966541331452"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                </a>
                <a
                  href="https://wa.me/966541331452"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                >
                  {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
