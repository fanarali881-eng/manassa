import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function CookieConsent() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after 1 second
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-lg border-t border-border">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{t('cookieConsent')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('cookieMessage')}.{' '}
                  <Link href="/cookies" className="underline hover:text-foreground">
                    {language === 'ar' ? 'اعرف المزيد' : 'Learn more'}
                  </Link>
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecline}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 md:flex-none"
            >
              {t('declineCookies')}
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-none"
            >
              {t('acceptCookies')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
