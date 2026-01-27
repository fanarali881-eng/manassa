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
      question: 'ما هي مدة إنجاز المعاملة؟',
      answer: 'تختلف مدة الإنجاز حسب نوع المعاملة. المعاملات البسيطة تستغرق من يوم إلى 3 أيام، بينما المعاملات المعقدة قد تستغرق من أسبوع إلى أسبوعين حسب الجهة الحكومية.'
    },
    {
      question: 'هل أحتاج إلى حجز موعد مسبق؟',
      answer: 'لا، يمكنك التواصل معنا مباشرة عبر الموقع أو الواتساب وسنبدأ بمعاملتك فوراً. نعمل على مدار الساعة لخدمتك.'
    },
    {
      question: 'ما هي المستندات المطلوبة؟',
      answer: 'تختلف المستندات حسب نوع المعاملة. عادة نحتاج صورة الهوية الوطنية أو الإقامة، وأي مستندات إضافية سنخبرك بها عند تقديم الطلب.'
    },
    {
      question: 'كيف أتابع حالة معاملتي؟',
      answer: 'سنرسل لك تحديثات مستمرة عبر الواتساب أو الهاتف عن حالة معاملتك. كما يمكنك التواصل معنا في أي وقت للاستفسار.'
    },
    {
      question: 'ماذا لو تم رفض المعاملة؟',
      answer: 'في حالة الرفض، سنخبرك بالأسباب ونساعدك في تصحيح الأوراق وإعادة تقديم المعاملة. لا تقلق، نحن معك حتى إتمام المعاملة بنجاح.'
    },
    {
      question: 'هل تقدمون خدمات للشركات؟',
      answer: 'نعم، نقدم خدمات تعقيب شاملة للشركات والمؤسسات تشمل: تجديد السجلات التجارية، رخص العمل، التأشيرات، وجميع المعاملات الحكومية للشركات.'
    },
    {
      question: 'هل خدماتكم متاحة في جميع مناطق المملكة؟',
      answer: 'نعم، نقدم خدماتنا في جميع مناطق المملكة العربية السعودية. يمكننا إنجاز معاملاتك في أي جهة حكومية.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل الدفع نقداً، التحويل البنكي، وجميع بطاقات الائتمان والخصم (Visa, Mastercard, Mada). الدفع يتم بعد إتمام المعاملة بنجاح.'
    },
    {
      question: 'هل هناك ضمان على الخدمة؟',
      answer: 'نعم، نضمن لك إنجاز معاملتك بنجاح أو استرداد أموالك. رضاك هو أولويتنا.'
    },
    {
      question: 'كيف أتواصل معكم؟',
      answer: 'يمكنك التواصل معنا عبر الواتساب أو الاتصال على الرقم 00966-566704414، أو من خلال نموذج التواصل في الموقع. نحن متاحون 24/7.'
    },
  ] : [
    {
      question: 'How long does it take to complete a transaction?',
      answer: 'Processing time varies by transaction type. Simple transactions take 1-3 days, while complex ones may take 1-2 weeks depending on the government agency.'
    },
    {
      question: 'Do I need to book an appointment?',
      answer: 'No, you can contact us directly through the website or WhatsApp and we will start your transaction immediately. We work around the clock to serve you.'
    },
    {
      question: 'What documents are required?',
      answer: 'Documents vary by transaction type. Usually we need a copy of your national ID or Iqama, and we will inform you of any additional documents when you submit your request.'
    },
    {
      question: 'How can I track my transaction status?',
      answer: 'We will send you continuous updates via WhatsApp or phone about your transaction status. You can also contact us anytime for inquiries.'
    },
    {
      question: 'What if my transaction is rejected?',
      answer: 'In case of rejection, we will inform you of the reasons and help you correct the documents and resubmit. Don\'t worry, we are with you until the transaction is successfully completed.'
    },
    {
      question: 'Do you provide services for companies?',
      answer: 'Yes, we provide comprehensive processing services for companies and institutions including: commercial registration renewal, work permits, visas, and all government transactions for businesses.'
    },
    {
      question: 'Are your services available in all regions of the Kingdom?',
      answer: 'Yes, we provide our services in all regions of Saudi Arabia. We can complete your transactions at any government agency.'
    },
    {
      question: 'What payment methods are available?',
      answer: 'We accept cash, bank transfer, and all credit and debit cards (Visa, Mastercard, Mada). Payment is made after successful completion of the transaction.'
    },
    {
      question: 'Is there a guarantee on the service?',
      answer: 'Yes, we guarantee successful completion of your transaction or your money back. Your satisfaction is our priority.'
    },
    {
      question: 'How can I contact you?',
      answer: 'You can contact us via WhatsApp or call 00966-566704414, or through the contact form on the website. We are available 24/7.'
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
                  href="tel:00966566704414"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                </a>
                <a
                  href="https://wa.me/966566704414"
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
