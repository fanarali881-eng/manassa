/**
 * Bot Detection Utility
 * Detects bots, crawlers, and automated programs
 */

/**
 * List of known bot user agents
 */
const BOT_PATTERNS = [
  // Search engine bots
  /bot/i,
  /crawler/i,
  /spider/i,
  /crawling/i,
  
  // Specific bots
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /whatsapp/i,
  /telegram/i,
  /linkedinbot/i,
  /slackbot/i,
  /discordbot/i,
  
  // Monitoring and testing
  /pingdom/i,
  /uptimerobot/i,
  /monitoring/i,
  /checker/i,
  /test/i,
  
  // Scrapers
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /php/i,
  /ruby/i,
  /go-http-client/i,
  /axios/i,
  /node-fetch/i,
  /requests/i,
  /httpx/i,
  
  // Headless browsers
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /webdriver/i,
  
  // Other automated tools
  /postman/i,
  /insomnia/i,
  /httpie/i,
];

/**
 * Check if the current user is a bot based on User Agent
 */
export function isBotUserAgent(): boolean {
  if (typeof navigator === 'undefined') {
    return true; // Server-side or no navigator
  }

  const userAgent = navigator.userAgent || '';
  
  // Check against known bot patterns
  for (const pattern of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if the current user is a bot based on browser features
 */
export function isBotBehavior(): boolean {
  if (typeof window === 'undefined') {
    return true; // Server-side
  }

  // Check for missing features that real browsers have
  const checks = [
    // No plugins (most bots don't have plugins)
    typeof navigator.plugins === 'undefined' || navigator.plugins.length === 0,
    
    // No languages
    !navigator.languages || navigator.languages.length === 0,
    
    // Webdriver flag (Selenium, Puppeteer)
    (navigator as any).webdriver === true,
    
    // Missing common browser APIs
    typeof window.chrome === 'undefined' && 
    typeof (window as any).safari === 'undefined' &&
    typeof (window as any).opr === 'undefined',
  ];

  // If 2 or more checks fail, likely a bot
  const failedChecks = checks.filter(check => check).length;
  return failedChecks >= 2;
}

/**
 * Comprehensive bot detection
 * Returns true if the user is likely a bot
 */
export function isBot(): boolean {
  // Check user agent first (fast)
  if (isBotUserAgent()) {
    return true;
  }

  // Check behavior (slower but more accurate)
  if (isBotBehavior()) {
    return true;
  }

  return false;
}

/**
 * Get bot detection result with details
 */
export function getBotDetectionDetails(): {
  isBot: boolean;
  reason: string;
  userAgent: string;
} {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
  
  if (isBotUserAgent()) {
    return {
      isBot: true,
      reason: 'Bot user agent detected',
      userAgent,
    };
  }

  if (isBotBehavior()) {
    return {
      isBot: true,
      reason: 'Bot behavior detected',
      userAgent,
    };
  }

  return {
    isBot: false,
    reason: 'Human user',
    userAgent,
  };
}
