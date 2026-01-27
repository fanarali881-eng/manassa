import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiePolicy() {
  const { language } = useLanguage();

  const content = language === 'ar' ? {
    title: 'سياسة ملفات تعريف الارتباط',
    lastUpdated: 'آخر تحديث: ديسمبر 2024',
    sections: [
      {
        title: 'ما هي ملفات تعريف الارتباط؟',
        content: 'ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا. تساعدنا هذه الملفات على تحسين تجربتك وتذكر تفضيلاتك.',
      },
      {
        title: 'أنواع ملفات تعريف الارتباط المستخدمة',
        content: 'نستخدم الأنواع التالية من ملفات تعريف الارتباط: ملفات تعريف الارتباط الضرورية (لتشغيل الموقع بشكل صحيح)، ملفات تعريف الارتباط الوظيفية (لتذكر تفضيلاتك مثل اللغة)، ملفات تعريف الارتباط التحليلية (لفهم كيفية استخدام الموقع).',
      },
      {
        title: 'كيف نستخدم ملفات تعريف الارتباط',
        content: 'نستخدم ملفات تعريف الارتباط لـ: تذكر تفضيلات اللغة الخاصة بك، تحسين أداء الموقع، فهم كيفية تفاعلك مع الموقع، تقديم محتوى مخصص.',
      },
      {
        title: 'إدارة ملفات تعريف الارتباط',
        content: 'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك. يمكنك حذف أو حظر ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على وظائف الموقع.',
      },
      {
        title: 'ملفات تعريف الارتباط الخاصة بأطراف ثالثة',
        content: 'قد نستخدم خدمات أطراف ثالثة مثل Google Analytics التي قد تضع ملفات تعريف الارتباط الخاصة بها على جهازك.',
      },
      {
        title: 'التحديثات على سياسة ملفات تعريف الارتباط',
        content: 'قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة.',
      },
      {
        title: 'اتصل بنا',
        content: 'إذا كان لديك أي أسئلة حول سياسة ملفات تعريف الارتباط، يرجى الاتصال بنا على: info@salamat.sa',
      },
    ],
  } : {
    title: 'Cookie Policy',
    lastUpdated: 'Last Updated: December 2024',
    sections: [
      {
        title: 'What are Cookies?',
        content: 'Cookies are small text files that are stored on your device when you visit our website. These files help us improve your experience and remember your preferences.',
      },
      {
        title: 'Types of Cookies We Use',
        content: 'We use the following types of cookies: Essential cookies (to operate the website properly), Functional cookies (to remember your preferences such as language), Analytical cookies (to understand how the website is used).',
      },
      {
        title: 'How We Use Cookies',
        content: 'We use cookies to: Remember your language preferences, Improve website performance, Understand how you interact with the website, Provide personalized content.',
      },
      {
        title: 'Managing Cookies',
        content: 'You can control cookies through your browser settings. You can delete or block cookies, but this may affect website functionality.',
      },
      {
        title: 'Third-Party Cookies',
        content: 'We may use third-party services such as Google Analytics that may place their own cookies on your device.',
      },
      {
        title: 'Updates to Cookie Policy',
        content: 'We may update this policy from time to time. Any changes will be posted on this page.',
      },
      {
        title: 'Contact Us',
        content: 'If you have any questions about this Cookie Policy, please contact us at: info@salamat.sa',
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
