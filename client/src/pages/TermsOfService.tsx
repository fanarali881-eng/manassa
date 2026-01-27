import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsOfService() {
  const { language } = useLanguage();

  const content = language === 'ar' ? {
    title: 'شروط الاستخدام',
    lastUpdated: 'آخر تحديث: ديسمبر 2024',
    sections: [
      {
        title: 'قبول الشروط',
        content: 'باستخدامك لموقع برق وخدماته، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.',
      },
      {
        title: 'سياسة الدفع والحجز',
        content: '✅ الاستشارة مجانية: لا تحتاج لدفع أي مبلغ عند الاستفسار عن خدماتنا. ✅ إلغاء مجاني: يمكنك إلغاء طلبك في أي وقت قبل البدء بالمعاملة بدون أي رسوم أو غرامات. ✅ الدفع بعد الخدمة: يتم الدفع بعد إتمام المعاملة ورضاك التام. ✅ ضمان الجودة: إذا لم تكن راضياً عن الخدمة، لا تدفع! جميع الأسعار معلنة وواضحة في صفحة الأسعار.',
      },
      {
        title: 'الخدمات المقدمة',
        content: 'نقدم خدمات تعقيب المعاملات الحكومية بما في ذلك: تجديد الجوازات والهويات، استخراج الوثائق الرسمية، التصديقات، خدمات الأحوال المدنية، وجميع المعاملات الحكومية. جميع الخدمات تخضع للتوافر والإجراءات الحكومية المعتمدة.',
      },
      {
        title: 'تقديم الطلبات',
        content: 'يجب تقديم الطلبات من خلال الموقع الإلكتروني أو التواصل معنا مباشرة. يمكن إلغاء أو تعديل الطلبات قبل البدء بإجراءات المعاملة. قد تطبق رسوم في حالة الإلغاء بعد البدء بالإجراءات.',
      },
      {
        title: 'المسؤولية',
        content: 'نحن نبذل قصارى جهدنا لتقديم خدمات تعقيب دقيقة وسريعة. ومع ذلك، فإننا لا نتحمل المسؤولية عن أي تأخير ناتج عن الجهات الحكومية أو عدم استيفاء العميل للمتطلبات اللازمة.',
      },
      {
        title: 'الدفع',
        content: 'يتم تحديد أسعار الخدمات وفقاً لنوع المعاملة المطلوبة. يجب دفع الرسوم المستحقة بعد إتمام المعاملة بنجاح. نحتفظ بالحق في تغيير الأسعار في أي وقت.',
      },
      {
        title: 'الملكية الفكرية',
        content: 'جميع المحتويات والعلامات التجارية والشعارات الموجودة على هذا الموقع هي ملك لبرق ومحمية بموجب قوانين الملكية الفكرية.',
      },
      {
        title: 'التعديلات',
        content: 'نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ آخر تعديل.',
      },
      {
        title: 'القانون الساري',
        content: 'تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية وتفسر وفقاً لها.',
      },
      {
        title: 'اتصل بنا',
        content: 'إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى الاتصال بنا على: info@barq.sa',
      },
    ],
  } : {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: December 2024',
    sections: [
      {
        title: 'Acceptance of Terms',
        content: 'By using the Barq website and services, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our services.',
      },
      {
        title: 'Payment and Booking Policy',
        content: '✅ Free Consultation: No payment required when inquiring about our services. ✅ Free Cancellation: You can cancel your request anytime before processing begins without any fees. ✅ Payment After Service: Payment is made after completing the transaction and your full satisfaction. ✅ Quality Guarantee: If you are not satisfied with the service, you do not pay! All prices are clearly displayed on the pricing page.',
      },
      {
        title: 'Services Provided',
        content: 'We provide government transaction processing services including: Passport and ID renewal, Official document issuance, Certifications, Civil affairs services, and all government transactions. All services are subject to availability and approved government procedures.',
      },
      {
        title: 'Request Submission',
        content: 'Requests must be submitted through the website or by contacting us directly. Requests can be cancelled or modified before processing begins. Fees may apply for cancellations after processing has started.',
      },
      {
        title: 'Liability',
        content: 'We strive to provide accurate and fast processing services. However, we are not liable for any delays caused by government agencies or the client not meeting the required requirements.',
      },
      {
        title: 'Payment',
        content: 'Service prices are determined according to the type of transaction requested. Fees must be paid after successful completion of the transaction. We reserve the right to change prices at any time.',
      },
      {
        title: 'Intellectual Property',
        content: 'All content, trademarks, and logos on this website are owned by Barq and protected under intellectual property laws.',
      },
      {
        title: 'Modifications',
        content: 'We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page with an updated last modified date.',
      },
      {
        title: 'Governing Law',
        content: 'These terms and conditions are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia.',
      },
      {
        title: 'Contact Us',
        content: 'If you have any questions about these Terms of Service, please contact us at: info@barq.sa',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{content.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{content.lastUpdated}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
