import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <img src="/logo.png" alt="Salamat Logo" className="h-12 w-12" />
              <span className="text-xl font-bold">Salamat Vichel Safety inspection</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('aboutUsDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('home')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('about')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('pricing')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('faq')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('privacyPolicy')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('termsOfService')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    {t('cookiePolicy')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:00966541331452" className="hover:text-primary transition-colors" dir="ltr">00966-541331452</a>
              </li>
              <li className="flex items-center gap-2 text-primary font-semibold">
                <span>⚡</span>
                <span>{t('fastService247')}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@salamat.sa</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>{language === 'ar' ? 'الرياض - العليا - 12221، المملكة العربية السعودية' : 'Riyadh - Al Olaya - 12221, Saudi Arabia'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            {new Date().getFullYear()} {t('siteName')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
