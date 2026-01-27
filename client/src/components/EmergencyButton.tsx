import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Phone } from 'lucide-react';

const EMERGENCY_PHONE = '00966541331452';

export default function EmergencyButton() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <a
      href={`tel:${EMERGENCY_PHONE}`}
      className="fixed bottom-24 end-6 z-50 flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-pulse hover:animate-none"
      aria-label={t('emergencyCall')}
    >
      <Phone className="w-6 h-6" />
      <span className="absolute end-full me-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t('emergencyCall')}
      </span>
    </a>
  );
}
