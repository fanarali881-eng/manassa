import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  const content = language === 'ar' ? {
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: ديسمبر 2024',
    sections: [
      {
        title: 'المقدمة',
        content: 'نحن في سلامات نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا.',
      },
      {
        title: 'المعلومات التي نجمعها',
        content: 'نقوم بجمع المعلومات التالية: الاسم الكامل، البريد الإلكتروني، رقم الهاتف، معلومات المركبة (الصانع، الموديل، السنة، رقم اللوحة)، تاريخ ووقت الموعد المفضل، الموقع.',
      },
      {
        title: 'كيفية استخدام المعلومات',
        content: 'نستخدم معلوماتك لـ: معالجة حجوزات الفحص، التواصل معك بشأن مواعيدك، إرسال رموز التحقق عبر البريد الإلكتروني، تحسين خدماتنا، الامتثال للمتطلبات القانونية.',
      },
      {
        title: 'حماية المعلومات',
        content: 'نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.',
      },
      {
        title: 'مشاركة المعلومات',
        content: 'لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية: عند الحصول على موافقتك الصريحة، لتقديم الخدمات المطلوبة، للامتثال للقوانين واللوائح.',
      },
      {
        title: 'حقوقك',
        content: 'لديك الحق في: الوصول إلى معلوماتك الشخصية، تصحيح المعلومات غير الدقيقة، طلب حذف معلوماتك، الاعتراض على معالجة معلوماتك.',
      },
      {
        title: 'ملفات تعريف الارتباط',
        content: 'نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على موقعنا. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح الخاص بك.',
      },
      {
        title: 'التغييرات على سياسة الخصوصية',
        content: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة على هذه الصفحة.',
      },
      {
        title: 'اتصل بنا',
        content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على: info@salamat.sa',
      },
    ],
  } : {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: December 2024',
    sections: [
      {
        title: 'Introduction',
        content: 'At Salamat, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.',
      },
      {
        title: 'Information We Collect',
        content: 'We collect the following information: Full name, Email address, Phone number, Vehicle information (make, model, year, plate number), Preferred appointment date and time, Location.',
      },
      {
        title: 'How We Use Your Information',
        content: 'We use your information to: Process inspection bookings, Communicate with you about your appointments, Send verification codes via email, Improve our services, Comply with legal requirements.',
      },
      {
        title: 'Information Protection',
        content: 'We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.',
      },
      {
        title: 'Information Sharing',
        content: 'We do not sell, rent, or share your personal information with third parties except in the following cases: When we have your explicit consent, To provide requested services, To comply with laws and regulations.',
      },
      {
        title: 'Your Rights',
        content: 'You have the right to: Access your personal information, Correct inaccurate information, Request deletion of your information, Object to the processing of your information.',
      },
      {
        title: 'Cookies',
        content: 'We use cookies to improve your experience on our website. You can disable cookies from your browser settings.',
      },
      {
        title: 'Changes to Privacy Policy',
        content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.',
      },
      {
        title: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy, please contact us at: info@salamat.sa',
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
