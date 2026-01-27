import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  createBooking,
  createEmailVerification,
  getEmailVerification,
  markEmailVerified,
  updateBookingEmailVerified,
  getBookingById,
  getAllBookings,
} from "./db";
import { generateVerificationCode } from "./email";
import { sendVerificationEmail, sendBookingConfirmationEmail } from "./email-sendgrid";
import fs from 'fs';
import path from 'path';

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Email verification router
  verification: router({
    sendCode: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          language: z.enum(['ar', 'en']).default('ar'),
        })
      )
      .mutation(async ({ input }) => {
        const code = generateVerificationCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await createEmailVerification({
          email: input.email,
          code,
          expiresAt,
          verified: false,
        });

        const sent = await sendVerificationEmail(input.email, code, input.language);

        return {
          success: sent,
          message: sent
            ? input.language === 'ar'
              ? 'تم إرسال رمز التحقق إلى بريدك الإلكتروني'
              : 'Verification code sent to your email'
            : input.language === 'ar'
            ? 'فشل إرسال رمز التحقق، يرجى المحاولة مرة أخرى'
            : 'Failed to send verification code, please try again',
        };
      }),

    verifyCode: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          code: z.string().length(6),
          language: z.enum(['ar', 'en']).default('ar'),
        })
      )
      .mutation(async ({ input }) => {
        const verification = await getEmailVerification(input.email, input.code);

        if (!verification) {
          return {
            success: false,
            message:
              input.language === 'ar'
                ? 'رمز التحقق غير صحيح أو منتهي الصلاحية'
                : 'Invalid or expired verification code',
          };
        }

        await markEmailVerified(verification.id);

        return {
          success: true,
          message:
            input.language === 'ar'
              ? 'تم التحقق من بريدك الإلكتروني بنجاح'
              : 'Email verified successfully',
        };
      }),
  }),

  // Booking router
  booking: router({
    create: publicProcedure
      .input(
        z.object({
          serviceType: z.enum(['periodic', 'pre_purchase', 'roadside', 'roadside_assistance', 'vehicle_towing', 'on_site_repair', 'garage_repair', 'technical_inspection']),
          customerName: z.string().min(2),
          customerEmail: z.string().email(),
          customerPhone: z.string().min(10),
          vehicleMake: z.string().min(2),
          vehicleModel: z.string().min(2),
          vehicleYear: z.number().min(1900).max(new Date().getFullYear() + 1),
          vehiclePlateNumber: z.string().optional(),
          vehicleVIN: z.string().optional(),
          preferredDate: z.date(),
          preferredTime: z.string(),
          location: z.string().optional(),
          notes: z.string().optional(),
          emailVerified: z.boolean().default(false),
          language: z.enum(['ar', 'en']).default('ar'),
        })
      )
      .mutation(async ({ input }) => {
        const { language, ...bookingData } = input;
        
        // Generate unique booking reference (e.g., SAL-2024-001234)
        const now = new Date();
        const year = now.getFullYear();
        const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const bookingReference = `SAL-${year}-${randomNum}`;
        
        // Generate confirmation token
        const confirmationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

        const result = await createBooking({
          ...bookingData,
          bookingReference,
          confirmationToken,
        });

        // Get the created booking ID from the insert result
        const bookingId = Number((result as any).insertId || 0);

        // Send confirmation email
        const serviceTypeLabels: Record<string, { ar: string; en: string }> = {
          'periodic': { ar: 'فحص دوري', en: 'Periodic Inspection' },
          'pre-purchase': { ar: 'فحص قبل الشراء', en: 'Pre-Purchase Inspection' },
          'technical': { ar: 'فحص فني شامل', en: 'Technical Inspection' },
          'roadside': { ar: 'مساعدة على الطريق', en: 'Roadside Assistance' },
          'towing': { ar: 'نقل مركبات معطلة', en: 'Vehicle Towing' },
          'field-repair': { ar: 'تصليح ميداني', en: 'Field Repair' },
          'garage-repair': { ar: 'تصليح في الكراج', en: 'Garage Repair' },
          'emergency': { ar: 'خدمة طوارئ', en: 'Emergency Service' },
        };
        
        const confirmationUrl = `https://salamatinspe.com/booking/confirm/${confirmationToken}`;
        
        await sendBookingConfirmationEmail(
          input.customerEmail,
          {
            bookingReference,
            serviceType: serviceTypeLabels[input.serviceType]?.[language] || input.serviceType,
            date: new Date(input.preferredDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            time: input.preferredTime,
            vehicleInfo: `${input.vehicleMake} ${input.vehicleModel} (${input.vehicleYear})`,
            customerName: input.customerName,
            confirmationUrl,
          },
          language
        );

        return {
          success: true,
          bookingId,
          message:
            language === 'ar'
              ? 'تم إنشاء الحجز بنجاح! سنتواصل معك قريباً'
              : 'Booking created successfully! We will contact you soon',
        };
      }),

    verifyEmail: publicProcedure
      .input(
        z.object({
          bookingId: z.number(),
          email: z.string().email(),
          code: z.string().length(6),
          language: z.enum(['ar', 'en']).default('ar'),
        })
      )
      .mutation(async ({ input }) => {
        const verification = await getEmailVerification(input.email, input.code);

        if (!verification) {
          return {
            success: false,
            message:
              input.language === 'ar'
                ? 'رمز التحقق غير صحيح أو منتهي الصلاحية'
                : 'Invalid or expired verification code',
          };
        }

        await markEmailVerified(verification.id);
        await updateBookingEmailVerified(input.bookingId);

        return {
          success: true,
          message:
            input.language === 'ar'
              ? 'تم التحقق من بريدك الإلكتروني وتأكيد الحجز'
              : 'Email verified and booking confirmed',
        };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getBookingById(input.id);
      }),

    getAll: publicProcedure.query(async () => {
      return await getAllBookings();
    }),
  }),

  // Booking URL configuration
  bookingConfig: router({
    getUrl: publicProcedure.query(async () => {
      try {
        const configPath = path.join(process.cwd(), 'booking-url-config.json');
        const data = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(data);
        return { url: config.externalBookingUrl || '' };
      } catch (error) {
        return { url: '' };
      }
    }),

    setUrl: publicProcedure
      .input(z.object({ url: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const configPath = path.join(process.cwd(), 'booking-url-config.json');
          fs.writeFileSync(configPath, JSON.stringify({ externalBookingUrl: input.url }));
          return { success: true };
        } catch (error) {
          return { success: false };
        }
      }),
  }),

  // Update booking config JS file
  updateConfig: router({
    update: publicProcedure
      .input(z.object({ content: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const configPath = path.join(process.cwd(), 'client', 'public', 'config.js');
          fs.writeFileSync(configPath, input.content);
          return { success: true };
        } catch (error) {
          return { success: false };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
