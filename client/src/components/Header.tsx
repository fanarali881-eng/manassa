import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { getBookingUrl, getBookingSettings } from '@/lib/countryCheck';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState('');

  useEffect(() => {
    // Fetch booking settings from Firestore and determine URL
    getBookingSettings().then(({ url, countries }) => {
      getBookingUrl(url, countries).then(setBookingUrl);
    });
  }, []);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/#services' },
    { name: t('about'), href: '/about' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('faq'), href: '/faq' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center space-x-2 rtl:space-x-reverse">
            <img src="/logo.svg" alt="برق" className="h-12 w-auto" />
            <span className="text-xl font-bold">{language === 'ar' ? 'برق للخدمات العامة' : 'Barq Public Services'}</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm font-medium"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
          
          {bookingUrl ? (
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="hidden sm:inline-flex">
                {t('bookNow')}
              </Button>
            </a>
          ) : (
            <Link href="/book">
              <Button size="sm" className="hidden sm:inline-flex">
                {t('bookNow')}
              </Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {bookingUrl ? (
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  {t('bookNow')}
                </Button>
              </a>
            ) : (
              <Link href="/book">
                <Button size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  {t('bookNow')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
