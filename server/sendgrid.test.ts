import { describe, it, expect } from 'vitest';
import { testSendGridConnection } from '../server/email-sendgrid';

describe('SendGrid Integration', () => {
  it('should have valid SendGrid API key configured', async () => {
    const isValid = await testSendGridConnection();
    expect(isValid).toBe(true);
  });

  it('SendGrid API key should start with SG.', () => {
    const apiKey = process.env.SENDGRID_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toMatch(/^SG\./);
  });

  it('SendGrid API key should have sufficient length', () => {
    const apiKey = process.env.SENDGRID_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey!.length).toBeGreaterThan(20);
  });
});
