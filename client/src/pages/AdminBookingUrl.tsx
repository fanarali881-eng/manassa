import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Link, ExternalLink, Trash2, Save, Loader2, Globe } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminBookingUrl() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [url, setUrl] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [countriesInput, setCountriesInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    fetchCurrentUrl();
  }, []);

  const fetchCurrentUrl = async () => {
    try {
      const docRef = doc(db, 'settings', 'booking');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUrl(data.url || '');
        setCountries(data.countries || []);
        setCountriesInput((data.countries || []).join(', '));
      }
    } catch (error) {
      console.error('Error fetching URL:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    // Parse countries from input
    const countriesList = countriesInput
      .split(',')
      .map(c => c.trim().toUpperCase())
      .filter(c => c.length > 0);

    try {
      const docRef = doc(db, 'settings', 'booking');
      await setDoc(docRef, {
        url,
        countries: countriesList,
        updatedAt: new Date().toISOString()
      });

      setMessageType('success');
      setMessage(
        language === 'ar'
          ? 'تم حفظ الإعدادات بنجاح!'
          : 'Settings saved successfully!'
      );
      
      setCountries(countriesList);
    } catch (error) {
      console.error('Error saving:', error);
      setMessageType('error');
      setMessage(
        language === 'ar'
          ? 'حدث خطأ أثناء الحفظ'
          : 'Error occurred while saving'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف جميع الإعدادات؟' : 'Delete all settings?')) {
      return;
    }

    setUrl('');
    setCountries([]);
    setCountriesInput('');
    setLoading(true);
    setMessage('');

    try {
      const docRef = doc(db, 'settings', 'booking');
      await setDoc(docRef, {
        url: '',
        countries: [],
        updatedAt: new Date().toISOString()
      });

      setMessageType('success');
      setMessage(
        language === 'ar'
          ? 'تم حذف الإعدادات بنجاح!'
          : 'Settings deleted successfully!'
      );
    } catch (error) {
      console.error('Error deleting:', error);
      setMessageType('error');
      setMessage(
        language === 'ar'
          ? 'حدث خطأ أثناء الحذف'
          : 'Error occurred while deleting'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-lg border p-8">
            <div className="flex items-center gap-3 mb-6">
              <Link className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">
                {language === 'ar' ? 'إدارة رابط الحجز الخارجي' : 'Manage External Booking URL'}
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'الرابط الخارجي' : 'External URL'}
                </label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'https://موقع-الحجز.com'
                      : 'https://your-booking-site.com'
                  }
                  className="text-lg"
                  disabled={loading}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ar'
                    ? 'اترك الحقل فارغاً لاستخدام نموذج الحجز الداخلي'
                    : 'Leave empty to use internal booking form'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {language === 'ar' ? 'الدول المسموحة (اختياري)' : 'Allowed Countries (Optional)'}
                </label>
                <Input
                  type="text"
                  value={countriesInput}
                  onChange={(e) => setCountriesInput(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'SA, AE, KW'
                      : 'SA, AE, KW'
                  }
                  className="text-lg"
                  disabled={loading}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ar'
                    ? 'أدخل رموز الدول مفصولة بفواصل (مثال: SA, AE, KW). اترك فارغاً للسماح لجميع الدول.'
                    : 'Enter country codes separated by commas (e.g., SA, AE, KW). Leave empty to allow all countries.'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'ar'
                    ? '💡 الدول المسموحة فقط ستوجه للرابط الخارجي، باقي الدول ستستخدم النموذج الداخلي'
                    : '💡 Only allowed countries will redirect to external URL, others will use internal form'}
                </p>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    messageType === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      {language === 'ar' ? 'حفظ' : 'Save'}
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDelete}
                  disabled={loading || (!url && countries.length === 0)}
                  variant="destructive"
                  size="lg"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </Button>
              </div>

              {url && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">
                    {language === 'ar' ? 'معاينة الرابط:' : 'Preview URL:'}
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    {url}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}

              {countries.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">
                    {language === 'ar' ? 'الدول المسموحة:' : 'Allowed Countries:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((country) => (
                      <span
                        key={country}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'كيف يعمل؟' : 'How it works?'}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    {language === 'ar'
                      ? '• عند إضافة رابط: الزوار من الدول المسموحة سيوجهون للرابط الخارجي'
                      : '• With URL: Visitors from allowed countries redirect to external site'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? '• الزوار من دول أخرى: سيستخدمون النموذج الداخلي'
                      : '• Visitors from other countries: Will use internal form'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? '• إذا لم تحدد دول: جميع الزوار سيوجهون للرابط الخارجي'
                      : '• If no countries specified: All visitors redirect to external URL'}
                  </li>
                  <li>
                    {language === 'ar'
                      ? '• التغييرات تحفظ فوراً بدون إعادة تشغيل'
                      : '• Changes are saved instantly without restart'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
