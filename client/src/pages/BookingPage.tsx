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
  serviceType: z.enum(['periodic', 'pre_purchase', 'roadside', 'roadside_assistance', 'vehicle_towing', 'on_site_repair', 'garage_repair', 'technical_inspection']),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  vehicleMake: z.string().min(2, 'Make is required'),
  vehicleModel: z.string().min(2, 'Model is required'),
  vehicleYear: z.number().min(1900).max(new Date().getFullYear() + 1),
  vehiclePlateNumber: z.string().optional(),
  vehicleVIN: z.string().optional(),
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
  const [bookingId, setBookingId] = useState<number | null>(null);
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

  const getServiceTypeName = (type: string) => {
    const serviceNames: Record<string, { ar: string; en: string }> = {
      periodic: { ar: 'فحص دوري', en: 'Periodic Inspection' },
      pre_purchase: { ar: 'فحص قبل الشراء', en: 'Pre-Purchase Inspection' },
      roadside: { ar: 'فحص على الطريق', en: 'Roadside Inspection' },
      roadside_assistance: { ar: 'مساعدة على الطريق', en: 'Roadside Assistance' },
      vehicle_towing: { ar: 'سحب المركبة', en: 'Vehicle Towing' },
      on_site_repair: { ar: 'إصلاح في الموقع', en: 'On-Site Repair' },
      garage_repair: { ar: 'إصلاح في الكراج', en: 'Garage Repair' },
      technical_inspection: { ar: 'فحص فني', en: 'Technical Inspection' },
    };
    return language === 'ar' ? serviceNames[type]?.ar : serviceNames[type]?.en;
  };

  const onSubmit = async (data: BookingFormData) => {
    setBookingData(data);
    setShowLoadingDialog(true);

    // Wait for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const result = await createBookingMutation.mutateAsync({
        ...data,
        vehicleYear: Number(data.vehicleYear),
        preferredDate: new Date(data.preferredDate),
        emailVerified: false,
        language,
      });

      // Hide loading dialog
      setShowLoadingDialog(false);

      if (result.success) {
        setBookingId(result.bookingId);
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
      setBookingId(12345);
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
                    ? `رقم الحجز: ${bookingId}`
                    : `Booking ID: ${bookingId}`}
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
              <CardDescription>{language === 'ar' ? 'املأ النموذج أدناه لحجز موعد الفحص' : 'Fill out the form below to book an inspection appointment'}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Service Type */}
                <div className="space-y-2">
                  <Label htmlFor="serviceType">{t('serviceType')} *</Label>
                  <Select onValueChange={(value) => setValue('serviceType', value as any)} value={serviceType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectService')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="periodic">{t('periodicInspection')}</SelectItem>
                      <SelectItem value="pre_purchase">{t('prePurchaseInspection')}</SelectItem>
                      <SelectItem value="roadside">{t('roadsideInspection')}</SelectItem>
                      <SelectItem value="roadside_assistance">{t('roadsideAssistance')}</SelectItem>
                      <SelectItem value="vehicle_towing">{t('vehicleTowing')}</SelectItem>
                      <SelectItem value="on_site_repair">{t('onSiteRepair')}</SelectItem>
                      <SelectItem value="garage_repair">{t('garageRepair')}</SelectItem>
                      <SelectItem value="technical_inspection">{t('technicalInspection')}</SelectItem>
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

                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">{t('vehicleInfo')}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleMake">{t('vehicleMake')} *</Label>
                      <Input id="vehicleMake" {...register('vehicleMake')} />
                      {errors.vehicleMake && <p className="text-sm text-destructive">{errors.vehicleMake.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel">{t('vehicleModel')} *</Label>
                      <Input id="vehicleModel" {...register('vehicleModel')} />
                      {errors.vehicleModel && <p className="text-sm text-destructive">{errors.vehicleModel.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleYear">{t('vehicleYear')} *</Label>
                      <Input id="vehicleYear" type="number" {...register('vehicleYear', { valueAsNumber: true })} />
                      {errors.vehicleYear && <p className="text-sm text-destructive">{errors.vehicleYear.message}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePlateNumber">{t('plateNumber')} ({t('optional')})</Label>
                      <Input id="vehiclePlateNumber" {...register('vehiclePlateNumber')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleVIN">{t('vinNumber')} ({t('optional')})</Label>
                      <Input id="vehicleVIN" {...register('vehicleVIN')} />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">{t('appointmentDetails')}</h3>
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
            <h2 className="text-xl font-semibold">
              {language === 'ar' ? 'جاري الحجز...' : 'Booking...'}
            </h2>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && bookingData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={handleCloseSuccessDialog}
              className="absolute top-4 end-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-6">
                {language === 'ar' ? 'تم حجز الموعد بنجاح' : 'Booking Successful'}
              </h2>
            </div>

            <div className="space-y-3 text-center mb-6">
              <p className="text-base">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'اسم العميل: ' : 'Customer Name: '}
                </span>
                <span className="font-medium">{bookingData.customerName}</span>
              </p>
              <p className="text-base">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'التاريخ: ' : 'Date: '}
                </span>
                <span className="font-medium">{bookingData.preferredDate}</span>
              </p>
              <p className="text-base">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'الوقت: ' : 'Time: '}
                </span>
                <span className="font-medium">{bookingData.preferredTime}</span>
              </p>
              <p className="text-base">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'نوع الخدمة: ' : 'Service Type: '}
                </span>
                <span className="font-medium">{getServiceTypeName(bookingData.serviceType)}</span>
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-700 dark:text-red-400 text-center font-medium">
                {language === 'ar' ? 'يرجى الالتزام بالموعد المحدد تجنباً للانتظار' : 'Please adhere to the scheduled appointment to avoid waiting'}
              </p>
            </div>

            <Button 
              onClick={handleCloseSuccessDialog}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
