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
        content: 'باستخدامك لموقع سلامات وخدماته، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.',
      },
      {
        title: 'سياسة الدفع والحجز',
        content: '✅ الحجز مجاني بالكامل: لا تحتاج لدفع أي مبلغ عند حجز موعد الفحص. ✅ إلغاء مجاني: يمكنك إلغاء الحجز في أي وقت بدون أي رسوم أو غرامات. ✅ الدفع بعد الخدمة: يتم الدفع نقداً فقط بعد إتمام الفحص ورضاك التام. ✅ ضمان الجودة: إذا لم تكن راضياً عن الخدمة، لا تدفع! جميع الأسعار معلنة وواضحة في صفحة الأسعار.',
      },
      {
        title: 'الخدمات المقدمة',
        content: 'نقدم خدمات الفحص الفني للمركبات بما في ذلك: الفحص الدوري، فحص ما قبل الشراء، الفحص على الطريق. جميع الخدمات تخضع للتوافر والجدولة المسبقة.',
      },
      {
        title: 'الحجز والإلغاء',
        content: 'يجب حجز المواعيد مسبقاً من خلال الموقع الإلكتروني. يمكن إلغاء أو إعادة جدولة المواعيد قبل 24 ساعة على الأقل من الموعد المحدد. قد تطبق رسوم إلغاء في حالة الإلغاء المتأخر.',
      },
      {
        title: 'المسؤولية',
        content: 'نحن نبذل قصارى جهدنا لتقديم خدمات فحص دقيقة وشاملة. ومع ذلك، فإننا لا نتحمل المسؤولية عن أي أضرار أو خسائر قد تنتج عن استخدام خدماتنا أو الاعتماد على نتائج الفحص.',
      },
      {
        title: 'الدفع',
        content: 'يتم تحديد أسعار الخدمات وفقاً لنوع الفحص المطلوب. يجب دفع الرسوم المستحقة قبل أو بعد إجراء الفحص حسب السياسة المعتمدة. نحتفظ بالحق في تغيير الأسعار في أي وقت.',
      },
      {
        title: 'الملكية الفكرية',
        content: 'جميع المحتويات والعلامات التجارية والشعارات الموجودة على هذا الموقع هي ملك لسلامات ومحمية بموجب قوانين الملكية الفكرية.',
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
        content: 'إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى الاتصال بنا على: info@salamat.sa',
      },
    ],
  } : {
    title: 'Terms of Service',
    lastUpdated: 'Last Updated: December 2024',
    sections: [
      {
        title: 'Acceptance of Terms',
        content: 'By using the Salamat website and services, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our services.',
      },
      {
        title: 'Services Provided',
        content: 'We provide vehicle technical inspection services including: Periodic inspection, Pre-purchase inspection, Roadside inspection. All services are subject to availability and prior scheduling.',
      },
      {
        title: 'Booking and Cancellation',
        content: 'Appointments must be booked in advance through the website. Appointments can be cancelled or rescheduled at least 24 hours before the scheduled time. Cancellation fees may apply for late cancellations.',
      },
      {
        title: 'Liability',
        content: 'We strive to provide accurate and comprehensive inspection services. However, we are not liable for any damages or losses that may result from using our services or relying on inspection results.',
      },
      {
        title: 'Payment',
        content: 'Service prices are determined according to the type of inspection requested. Fees must be paid before or after the inspection according to the approved policy. We reserve the right to change prices at any time.',
      },
      {
        title: 'Intellectual Property',
        content: 'All content, trademarks, and logos on this website are owned by Salamat and protected under intellectual property laws.',
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
        content: 'If you have any questions about these Terms of Service, please contact us at: info@salamat.sa',
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
