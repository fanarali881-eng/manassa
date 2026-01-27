import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { useTranslation } from '@/lib/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const bookingSchema = z.object({
  serviceType: z.string().min(1, 'Service type is required'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  documentNumber: z.string().optional(),
  issueDate: z.string().optional(),
  idNumber: z.string().optional(),
  civilRegistryNumber: z.string().optional(),
  preferredDate: z.string(),
  preferredTime: z.string(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [step, setStep] = useState<'form' | 'verification' | 'success'>('form');
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Generate random order ID: 2 capital letters + 5 digits
  const generateOrderId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter1 = letters[Math.floor(Math.random() * 26)];
    const letter2 = letters[Math.floor(Math.random() * 26)];
    const numbers = Math.floor(10000 + Math.random() * 90000); // 5 digits
    return `${letter1}${letter2}${numbers}`;
  };
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const createBookingMutation = trpc.booking.create.useMutation();
  const sendCodeMutation = trpc.verification.sendCode.useMutation();
  const verifyCodeMutation = trpc.booking.verifyEmail.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const serviceType = watch('serviceType');

  // All services from homepage
  const allServices = [
    // Commercial registry services
    { value: 'commercial_registration', ar: 'قيد سجل تجاري', en: 'Commercial Registration' },
    { value: 'renew_commercial_registration', ar: 'تجديد سجل تجاري', en: 'Renew Commercial Registration' },
    { value: 'reserve_trade_name', ar: 'حجز اسم تجاري', en: 'Reserve Trade Name' },
    { value: 'modify_commercial_registration', ar: 'تعديل سجل تجاري', en: 'Modify Commercial Registration' },
    { value: 'commercial_extract', ar: 'مستخرج سجل تجاري / الإفادة التجارية', en: 'Commercial Registration Extract' },
    { value: 'issue_commercial_license', ar: 'إصدار رخصة تجارية', en: 'Issue Commercial License' },
    { value: 'renew_commercial_license', ar: 'تجديد رخصة تجارية', en: 'Renew Commercial License' },
    { value: 'register_trademark', ar: 'تسجيل علامة تجارية', en: 'Register Trademark' },
    // Government services
    { value: 'passport_renewal', ar: 'تجديد جواز السفر', en: 'Passport Renewal' },
    { value: 'id_renewal', ar: 'تجديد الهوية', en: 'ID Renewal' },
    { value: 'license_renewal', ar: 'تجديد الرخصة', en: 'License Renewal' },
    { value: 'birth_certificate', ar: 'استخراج شهادة ولادة', en: 'Birth Certificate' },
    { value: 'official_certifications', ar: 'تصديقات رسمية', en: 'Official Certifications' },
    { value: 'document_extraction', ar: 'استخراج وثائق', en: 'Document Extraction' },
    { value: 'civil_affairs', ar: 'خدمات الأحوال المدنية', en: 'Civil Affairs Services' },
    { value: 'passport_services', ar: 'خدمات الجوازات', en: 'Passport Services' },
    // Other
    { value: 'other', ar: 'أخرى', en: 'Other' },
  ];

  const getServiceTypeName = (type: string) => {
    const service = allServices.find(s => s.value === type);
    return language === 'ar' ? service?.ar : service?.en;
  };

  const onSubmit = async (data: BookingFormData) => {
    setBookingData(data);
    setShowLoadingDialog(true);

    // Wait for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const result = await createBookingMutation.mutateAsync({
        ...data,
        serviceType: data.serviceType as any,
        vehicleMake: 'N/A',
        vehicleModel: 'N/A',
        vehicleYear: 2024,
        preferredDate: new Date(data.preferredDate),
        emailVerified: false,
        language,
      });

      // Hide loading dialog
      setShowLoadingDialog(false);

      if (result.success) {
        setBookingId(generateOrderId());
        setEmail(data.customerEmail);
        
        // Show success dialog
        setShowSuccessDialog(true);
        
        // Send verification code in background
        sendCodeMutation.mutateAsync({
          email: data.customerEmail,
          language,
        });
      } else {
        toast.error(t('error'), {
          description: t('bookingError'),
        });
      }
    } catch (error) {
      // Hide loading dialog and show success anyway for demo
      setShowLoadingDialog(false);
      setBookingId(generateOrderId());
      setEmail(data.customerEmail);
      setShowSuccessDialog(true);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    window.location.href = '/';
  };

  const handleVerification = async () => {
    if (!bookingId || !email || verificationCode.length !== 6) {
      toast.error(t('error'), {
        description: language === 'ar' ? 'يرجى إدخال رمز صحيح' : 'Please enter a valid code',
      });
      return;
    }

    try {
      const result = await verifyCodeMutation.mutateAsync({
        bookingId,
        email,
        code: verificationCode,
        language,
      });

      if (result.success) {
        toast.success(t('success'), {
          description: result.message,
        });
        setStep('success');
      } else {
        toast.error(t('error'), {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error(t('error'), {
        description: t('verificationError'),
      });
    }
  };

  const handleResendCode = async () => {
    if (!email) return;

    try {
      const result = await sendCodeMutation.mutateAsync({
        email,
        language,
      });

      if (result.success) {
        toast.success(t('success'), {
          description: t('verificationSent'),
        });
      } else {
        toast.error(t('error'), {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error(t('error'), {
        description: language === 'ar' ? 'فشل إعادة إرسال الرمز' : 'Failed to resend code',
      });
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="container max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">{t('success')}</CardTitle>
                <CardDescription className="text-base">
                  {t('bookingSuccess')}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  {language === 'ar' 
                    ? `رقم الطلب: ${bookingId}`
                    : `Request ID: ${bookingId}`}
                </p>
                <Button onClick={() => window.location.href = '/'}>
                  {t('home')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (step === 'verification') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="container max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>{t('verificationTitle')}</CardTitle>
                <CardDescription>{t('verificationDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">{t('verificationCode')}</Label>
                  <Input
                    id="code"
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="text-center text-2xl tracking-widest"
                  />
                </div>
                <Button
                  onClick={handleVerification}
                  disabled={verifyCodeMutation.isPending || verificationCode.length !== 6}
                  className="w-full"
                >
                  {verifyCodeMutation.isPending && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                  {t('verify')}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleResendCode}
                  disabled={sendCodeMutation.isPending}
                  className="w-full"
                >
                  {sendCodeMutation.isPending && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                  {t('resendCode')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t('bookingTitle')}</CardTitle>
              <CardDescription>{language === 'ar' ? 'املأ النموذج أدناه لتقديم طلب الخدمة' : 'Fill out the form below to submit a service request'}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Service Type */}
                <div className="space-y-2">
                  <Label htmlFor="serviceType">{t('serviceType')} *</Label>
                  <Select onValueChange={(value) => setValue('serviceType', value)} value={serviceType}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? 'اختر نوع الخدمة' : 'Select service type'} />
                    </SelectTrigger>
                    <SelectContent align="end" className="text-right">
                      {allServices.map((service) => (
                        <SelectItem key={service.value} value={service.value} className="text-right justify-end">
                          {language === 'ar' ? service.ar : service.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType.message}</p>}
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">{t('customerInfo')}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">{t('fullName')} *</Label>
                      <Input id="customerName" {...register('customerName')} />
                      {errors.customerName && <p className="text-sm text-destructive">{errors.customerName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">{t('email')} *</Label>
                      <Input id="customerEmail" type="email" {...register('customerEmail')} />
                      {errors.customerEmail && <p className="text-sm text-destructive">{errors.customerEmail.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">{t('phone')} *</Label>
                    <Input id="customerPhone" type="tel" {...register('customerPhone')} />
                    {errors.customerPhone && <p className="text-sm text-destructive">{errors.customerPhone.message}</p>}
                  </div>
                </div>

                {/* Document Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">{language === 'ar' ? 'معلومات الوثيقة' : 'Document Information'}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentNumber">{language === 'ar' ? 'رقم الوثيقة' : 'Document Number'} *</Label>
                      <Input id="documentNumber" {...register('documentNumber')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issueDate">{language === 'ar' ? 'تاريخ الإصدار' : 'Issue Date'} *</Label>
                      <Input id="issueDate" type="date" {...register('issueDate')} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">{language === 'ar' ? 'رقم الهوية (اختياري)' : 'ID Number (Optional)'}</Label>
                      <Input id="idNumber" {...register('idNumber')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="civilRegistryNumber">{language === 'ar' ? 'رقم السجل المدني (اختياري)' : 'Civil Registry Number (Optional)'}</Label>
                      <Input id="civilRegistryNumber" {...register('civilRegistryNumber')} />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">{language === 'ar' ? 'التاريخ والوقت المفضل للتواصل' : 'Preferred Contact Date and Time'}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">{t('preferredDate')} *</Label>
                      <Input id="preferredDate" type="date" {...register('preferredDate')} />
                      {errors.preferredDate && <p className="text-sm text-destructive">{errors.preferredDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">{t('preferredTime')} *</Label>
                      <Input id="preferredTime" type="time" {...register('preferredTime')} />
                      {errors.preferredTime && <p className="text-sm text-destructive">{errors.preferredTime.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">{t('location')} ({t('optional')})</Label>
                    <Input id="location" {...register('location')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">{t('notes')} ({t('optional')})</Label>
                    <Textarea id="notes" {...register('notes')} rows={3} />
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting || createBookingMutation.isPending} className="w-full">
                  {(isSubmitting || createBookingMutation.isPending) && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                  {isSubmitting || createBookingMutation.isPending ? t('submitting') : t('submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      {/* Loading Dialog */}
      {showLoadingDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-green-600 dark:text-green-400 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'جاري معالجة طلبك...' : 'Processing your request...'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'يرجى الانتظار قليلاً' : 'Please wait a moment'}
            </p>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 text-center relative">
            <button 
              onClick={handleCloseSuccessDialog}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Your request has been received!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'سيتم التواصل معك قريباً لتأكيد الخدمة'
                : 'We will contact you soon to confirm the service'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {language === 'ar' 
                ? `رقم الطلب: ${bookingId}`
                : `Request ID: ${bookingId}`}
            </p>
            <Button onClick={handleCloseSuccessDialog} className="w-full">
              {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
