import { notifyOwner } from "./_core/notification";

/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create professional HTML email template
 */
function createEmailTemplate(content: string, language: 'ar' | 'en'): string {
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const align = language === 'ar' ? 'right' : 'left';
  
  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${language === 'ar' ? 'سلامات' : 'Salamat'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 30px 40px; text-align: ${align};">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ${language === 'ar' ? 'سلامات' : 'Salamat'}
              </h1>
              <p style="margin: 5px 0 0 0; color: #e0f2fe; font-size: 14px;">
                ${language === 'ar' ? 'معاً لمركبة آمنة' : 'Together for a Safe Vehicle'}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px; text-align: ${align};">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; text-align: ${align}; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                ${language === 'ar' ? 'للتواصل معنا:' : 'Contact us:'}
              </p>
              <p style="margin: 0; color: #0891b2; font-size: 16px; font-weight: bold;">
                📞 00966-541331452
              </p>
              <p style="margin: 15px 0 0 0; color: #94a3b8; font-size: 12px;">
                ${language === 'ar' ? '© 2024 سلامات. جميع الحقوق محفوظة.' : '© 2024 Salamat. All rights reserved.'}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Send verification code via email
 */
export async function sendVerificationEmail(email: string, code: string, language: 'ar' | 'en' = 'ar'): Promise<boolean> {
  const subject = language === 'ar' ? 'رمز التحقق - سلامات' : 'Verification Code - Salamat';
  
  const content = language === 'ar' ? `
    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">رمز التحقق</h2>
    <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      شكراً لاستخدامك خدمات سلامات. رمز التحقق الخاص بك هو:
    </p>
    <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
      <p style="margin: 0; font-size: 36px; font-weight: bold; color: #0891b2; letter-spacing: 8px;">${code}</p>
    </div>
    <p style="margin: 20px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      هذا الرمز صالح لمدة <strong>10 دقائق</strong>. إذا لم تطلب هذا الرمز، يرجى تجاهل هذه الرسالة.
    </p>
  ` : `
    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Verification Code</h2>
    <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      Thank you for using Salamat services. Your verification code is:
    </p>
    <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
      <p style="margin: 0; font-size: 36px; font-weight: bold; color: #0891b2; letter-spacing: 8px;">${code}</p>
    </div>
    <p style="margin: 20px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      This code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this message.
    </p>
  `;

  const htmlMessage = createEmailTemplate(content, language);

  try {
    await notifyOwner({
      title: `${subject} - ${email}`,
      content: htmlMessage,
    });
    
    console.log(`[Email] Verification code sent to ${email}: ${code}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send verification code:', error);
    return false;
  }
}

/**
 * Send booking confirmation email with professional HTML template
 */
export async function sendBookingConfirmation(
  email: string,
  bookingDetails: {
    id: number;
    bookingReference: string;
    confirmationToken: string;
    customerName: string;
    serviceType: string;
    preferredDate: Date;
    preferredTime: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: number;
  },
  language: 'ar' | 'en' = 'ar'
): Promise<boolean> {
  const serviceTypeMap = {
    ar: {
      periodic: 'فحص دوري',
      pre_purchase: 'فحص قبل الشراء',
      roadside: 'فحص على الطريق',
      roadside_assistance: 'المساعدة على الطريق',
      vehicle_towing: 'نقل المركبات المعطلة',
      on_site_repair: 'تصليح ميداني',
      garage_repair: 'تصليح في الكراجات',
      technical_inspection: 'فحص فني شامل',
    },
    en: {
      periodic: 'Periodic Inspection',
      pre_purchase: 'Pre-Purchase Inspection',
      roadside: 'Roadside Inspection',
      roadside_assistance: 'Roadside Assistance',
      vehicle_towing: 'Vehicle Towing',
      on_site_repair: 'On-Site Repair',
      garage_repair: 'Garage Repair',
      technical_inspection: 'Technical Inspection',
    },
  };

  const subject = language === 'ar' ? 'تأكيد الحجز - سلامات' : 'Booking Confirmation - Salamat';
  const serviceTypeName = serviceTypeMap[language][bookingDetails.serviceType as keyof typeof serviceTypeMap.ar] || bookingDetails.serviceType;
  
  // Confirmation link
  const confirmationLink = `https://salamat-inspection.manus.space/confirm/${bookingDetails.confirmationToken}`;
  
  const content = language === 'ar' ? `
    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">تأكيد الحجز</h2>
    <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      عزيزي <strong>${bookingDetails.customerName}</strong>,
    </p>
    <p style="margin: 0 0 30px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      تم استلام طلب حجزك بنجاح! نحن سعداء بخدمتك.
    </p>
    
    <div style="background-color: #f0f9ff; border: 2px solid #0891b2; border-radius: 8px; padding: 25px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px 0; color: #0891b2; font-size: 18px;">تفاصيل الحجز</h3>
      <table width="100%" cellpadding="8" cellspacing="0">
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">رقم الحجز:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.bookingReference}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">نوع الخدمة:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${serviceTypeName}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">التاريخ:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.preferredDate.toLocaleDateString('ar-SA')}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">الوقت:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.preferredTime}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">المركبة:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.vehicleMake} ${bookingDetails.vehicleModel} ${bookingDetails.vehicleYear}</td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${confirmationLink}" style="display: inline-block; background-color: #0891b2; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: bold;">
        تأكيد الحجز
      </a>
    </div>
    
    <p style="margin: 20px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      سنتواصل معك قريباً لتأكيد الموعد النهائي. إذا كان لديك أي استفسار، لا تتردد في الاتصال بنا.
    </p>
    
    <p style="margin: 20px 0 0 0; color: #475569; font-size: 16px;">
      شكراً لاختيارك <strong>سلامات</strong> 🚗
    </p>
  ` : `
    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px;">Booking Confirmation</h2>
    <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      Dear <strong>${bookingDetails.customerName}</strong>,
    </p>
    <p style="margin: 0 0 30px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      Your booking request has been received successfully! We're happy to serve you.
    </p>
    
    <div style="background-color: #f0f9ff; border: 2px solid #0891b2; border-radius: 8px; padding: 25px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px 0; color: #0891b2; font-size: 18px;">Booking Details</h3>
      <table width="100%" cellpadding="8" cellspacing="0">
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Booking Reference:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.bookingReference}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Service Type:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${serviceTypeName}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Date:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.preferredDate.toLocaleDateString('en-US')}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Time:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.preferredTime}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Vehicle:</td>
          <td style="color: #1e293b; font-size: 14px; font-weight: bold; padding: 8px 0;">${bookingDetails.vehicleMake} ${bookingDetails.vehicleModel} ${bookingDetails.vehicleYear}</td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${confirmationLink}" style="display: inline-block; background-color: #0891b2; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: bold;">
        Confirm Booking
      </a>
    </div>
    
    <p style="margin: 20px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      We will contact you soon to confirm the final appointment. If you have any questions, feel free to contact us.
    </p>
    
    <p style="margin: 20px 0 0 0; color: #475569; font-size: 16px;">
      Thank you for choosing <strong>Salamat</strong> 🚗
    </p>
  `;

  const htmlMessage = createEmailTemplate(content, language);

  try {
    await notifyOwner({
      title: `${subject} - ${email}`,
      content: htmlMessage,
    });
    
    console.log(`[Email] Booking confirmation sent to ${email} - Reference: ${bookingDetails.bookingReference}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send booking confirmation:', error);
    return false;
  }
}
