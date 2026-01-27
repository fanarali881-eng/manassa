import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '00966541331452';

export default function WhatsAppButton() {
  const { language } = useLanguage();
  
  const message = language === 'ar' 
    ? 'مرحباً، أريد الاستفسار عن خدماتكم'
    : 'Hello, I would like to inquire about your services';
  
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute end-full me-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      </span>
    </a>
  );
}
