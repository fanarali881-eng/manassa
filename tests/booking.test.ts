import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from '../server/routers';

describe('Booking System', () => {
  it('should have booking router defined', () => {
    expect(appRouter.booking).toBeDefined();
  });

  it('should have verification router defined', () => {
    expect(appRouter.verification).toBeDefined();
  });

  it('should validate booking input schema', async () => {
    // Test that the booking schema requires necessary fields
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    // This should fail due to missing required fields
    await expect(
      caller.booking.create({
        serviceType: 'periodic',
        customerName: '',
        customerEmail: 'invalid-email',
        customerPhone: '123',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: 1800,
        preferredDate: new Date(),
        preferredTime: '10:00',
        emailVerified: false,
        language: 'ar',
      })
    ).rejects.toThrow();
  });
});

describe('Email Verification System', () => {
  it('should validate email format', async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    // This should fail due to invalid email
    await expect(
      caller.verification.sendCode({
        email: 'invalid-email',
        language: 'ar',
      })
    ).rejects.toThrow();
  });

  it('should validate verification code length', async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    // This should fail due to invalid code length
    await expect(
      caller.verification.verifyCode({
        email: 'test@example.com',
        code: '123', // Should be 6 digits
        language: 'ar',
      })
    ).rejects.toThrow();
  });
});
