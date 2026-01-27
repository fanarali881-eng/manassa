import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY is not set. Email sending will not work.');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const FROM_EMAIL = 'noreply@salamatinspe.com';
const FROM_NAME = 'سلامات - Salamat';

/**
 * Send verification code email
 */
export async function sendVerificationEmail(
  to: string,
  code: string,
  language: 'ar' | 'en' = 'ar'
): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  const subject = language === 'ar' 
    ? `رمز التحقق الخاص بك: ${code}`
    : `Your Verification Code: ${code}`;

  const htmlContent = language === 'ar' ? `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 30px 40px; text-align: right; }
        .header h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; }
        .content { padding: 40px; text-align: right; }
        .code-box { background-color: #f0f9ff; border: 2px dashed #0891b2; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
        .code { font-size: 36px; font-weight: bold; color: #0891b2; letter-spacing: 8px; }
        .footer { background-color: #f8f9fa; padding: 20px 40px; text-align: right; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>سلامات</h1>
          <p style="margin: 0; color: #e0f2fe; font-size: 14px;">لفحص سلامة المركبات</p>
        </div>
        <div class="content">
          <h2 style="color: #0e7490; margin-top: 0;">رمز التحقق</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            شكراً لاستخدامك خدمات سلامات. استخدم رمز التحقق التالي لإتمام عملية الحجز:
          </p>
          <div class="code-box">
            <div class="code">${code}</div>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">صالح لمدة 10 دقائق</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            إذا لم تطلب هذا الرمز، يرجى تجاهل هذه الرسالة.
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>سلامات لفحص سلامة المركبات</strong></p>
          <p style="margin: 0;">الرياض - العليا - 12221، المملكة العربية السعودية</p>
          <p style="margin: 5px 0 0 0;">هاتف: 00966-541331452</p>
        </div>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 30px 40px; text-align: left; }
        .header h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; }
        .content { padding: 40px; text-align: left; }
        .code-box { background-color: #f0f9ff; border: 2px dashed #0891b2; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
        .code { font-size: 36px; font-weight: bold; color: #0891b2; letter-spacing: 8px; }
        .footer { background-color: #f8f9fa; padding: 20px 40px; text-align: left; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Salamat</h1>
          <p style="margin: 0; color: #e0f2fe; font-size: 14px;">Vehicle Safety Inspection</p>
        </div>
        <div class="content">
          <h2 style="color: #0e7490; margin-top: 0;">Verification Code</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Thank you for using Salamat services. Use the following verification code to complete your booking:
          </p>
          <div class="code-box">
            <div class="code">${code}</div>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">Valid for 10 minutes</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this code, please ignore this message.
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>Salamat Vehicle Safety Inspection</strong></p>
          <p style="margin: 0;">Riyadh - Al Olaya - 12221, Saudi Arabia</p>
          <p style="margin: 5px 0 0 0;">Phone: 00966-541331452</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sgMail.send({
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject,
      html: htmlContent,
    });
    console.log(`Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(
  to: string,
  bookingData: {
    bookingReference: string;
    serviceType: string;
    date: string;
    time: string;
    vehicleInfo: string;
    customerName: string;
    confirmationUrl: string;
  },
  language: 'ar' | 'en' = 'ar'
): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  const subject = language === 'ar'
    ? `تأكيد الحجز - ${bookingData.bookingReference}`
    : `Booking Confirmation - ${bookingData.bookingReference}`;

  const htmlContent = language === 'ar' ? `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 30px 40px; text-align: right; }
        .header h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; }
        .content { padding: 40px; text-align: right; }
        .booking-details { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { font-weight: bold; color: #374151; }
        .detail-value { color: #6b7280; }
        .button { display: inline-block; background-color: #0891b2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
        .footer { background-color: #f8f9fa; padding: 20px 40px; text-align: right; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>سلامات</h1>
          <p style="margin: 0; color: #e0f2fe; font-size: 14px;">لفحص سلامة المركبات</p>
        </div>
        <div class="content">
          <h2 style="color: #0e7490; margin-top: 0;">✅ تم تأكيد حجزك</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            عزيزي ${bookingData.customerName}،<br><br>
            شكراً لك على حجز خدماتنا. تم تأكيد حجزك بنجاح.
          </p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #0e7490;">تفاصيل الحجز</h3>
            <div class="detail-row">
              <span class="detail-label">رقم الحجز:</span>
              <span class="detail-value">${bookingData.bookingReference}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">نوع الخدمة:</span>
              <span class="detail-value">${bookingData.serviceType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">التاريخ:</span>
              <span class="detail-value">${bookingData.date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">الوقت:</span>
              <span class="detail-value">${bookingData.time}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">معلومات المركبة:</span>
              <span class="detail-value">${bookingData.vehicleInfo}</span>
            </div>
          </div>

          <p style="color: #6b7280; font-size: 14px; background-color: #fef3c7; padding: 15px; border-radius: 6px; border-right: 4px solid #f59e0b;">
            <strong>ملاحظة:</strong> الدفع يتم بعد تقديم الخدمة. إذا لم تكن راضياً، لا تدفع!
          </p>

          <div style="text-align: center;">
            <a href="${bookingData.confirmationUrl}" class="button">تأكيد الحجز</a>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            للاستفسارات أو التعديلات، يرجى الاتصال بنا على:<br>
            📞 00966-541331452
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>سلامات لفحص سلامة المركبات</strong></p>
          <p style="margin: 0;">الرياض - العليا - 12221، المملكة العربية السعودية</p>
          <p style="margin: 5px 0 0 0;">رقم الترخيص: 1-1-YV5YA</p>
        </div>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 30px 40px; text-align: left; }
        .header h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; }
        .content { padding: 40px; text-align: left; }
        .booking-details { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { font-weight: bold; color: #374151; }
        .detail-value { color: #6b7280; }
        .button { display: inline-block; background-color: #0891b2; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
        .footer { background-color: #f8f9fa; padding: 20px 40px; text-align: left; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Salamat</h1>
          <p style="margin: 0; color: #e0f2fe; font-size: 14px;">Vehicle Safety Inspection</p>
        </div>
        <div class="content">
          <h2 style="color: #0e7490; margin-top: 0;">✅ Your Booking is Confirmed</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Dear ${bookingData.customerName},<br><br>
            Thank you for booking our services. Your booking has been confirmed successfully.
          </p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #0e7490;">Booking Details</h3>
            <div class="detail-row">
              <span class="detail-label">Booking Reference:</span>
              <span class="detail-value">${bookingData.bookingReference}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Service Type:</span>
              <span class="detail-value">${bookingData.serviceType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${bookingData.date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${bookingData.time}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Vehicle Info:</span>
              <span class="detail-value">${bookingData.vehicleInfo}</span>
            </div>
          </div>

          <p style="color: #6b7280; font-size: 14px; background-color: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
            <strong>Note:</strong> Payment is made after service delivery. If you're not satisfied, don't pay!
          </p>

          <div style="text-align: center;">
            <a href="${bookingData.confirmationUrl}" class="button">Confirm Booking</a>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            For inquiries or modifications, please contact us at:<br>
            📞 00966-541331452
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>Salamat Vehicle Safety Inspection</strong></p>
          <p style="margin: 0;">Riyadh - Al Olaya - 12221, Saudi Arabia</p>
          <p style="margin: 5px 0 0 0;">License No: 1-1-YV5YA</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sgMail.send({
      to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject,
      html: htmlContent,
    });
    console.log(`Booking confirmation email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
}

/**
 * Test SendGrid configuration
 */
export async function testSendGridConnection(): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    return false;
  }
  
  try {
    // SendGrid doesn't have a direct "test" endpoint, but we can verify the API key format
    return SENDGRID_API_KEY.startsWith('SG.') && SENDGRID_API_KEY.length > 20;
  } catch (error) {
    console.error('SendGrid connection test failed:', error);
    return false;
  }
}
