import type { VercelRequest, VercelResponse } from '@vercel/node';

// Comprehensive bot detection patterns
const botPatterns = [
  // Search engine bots
  /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i, /baiduspider/i,
  /yandexbot/i, /sogou/i, /exabot/i, /facebot/i, /ia_archiver/i,
  
  // Social media bots
  /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i, /pinterest/i,
  /whatsapp/i, /telegrambot/i, /discordbot/i, /slackbot/i,
  
  // SEO/Marketing bots
  /semrushbot/i, /ahrefsbot/i, /moz/i, /majestic/i, /screaming/i,
  /dotbot/i, /mj12bot/i, /petalbot/i, /bytespider/i,
  
  // AI bots
  /gptbot/i, /chatgpt/i, /openai/i, /anthropic/i, /claude/i, /ccbot/i,
  /cohere-ai/i, /perplexitybot/i,
  
  // Generic patterns
  /bot/i, /crawl/i, /spider/i, /scraper/i, /fetch/i,
  /wget/i, /curl/i, /httpie/i,
  
  // Programming language clients
  /python/i, /java\/|java-/i, /perl/i, /ruby/i, /php/i,
  /go-http/i, /axios/i, /node-fetch/i, /request\//i,
  
  // Headless browsers
  /headless/i, /phantom/i, /selenium/i, /puppeteer/i, /playwright/i,
  /webdriver/i, /chrome-lighthouse/i,
  
  // Archive bots
  /archive/i, /wayback/i, /httrack/i, /offline/i,
];

// Suspicious header patterns
const suspiciousHeaders = [
  'x-forwarded-for',
  'x-real-ip', 
  'via',
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Check 1: No user agent
  if (!userAgent || userAgent.trim() === '') {
    return res.status(403).json({ blocked: true, reason: 'no-ua' });
  }
  
  // Check 2: Bot user agent patterns
  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  if (isBot) {
    return res.status(403).json({ blocked: true, reason: 'bot-ua' });
  }
  
  // Check 3: Very short user agent (likely bot)
  if (userAgent.length < 20) {
    return res.status(403).json({ blocked: true, reason: 'short-ua' });
  }
  
  // Check 4: Missing common browser headers
  const acceptLanguage = req.headers['accept-language'];
  const acceptEncoding = req.headers['accept-encoding'];
  
  if (!acceptLanguage || !acceptEncoding) {
    return res.status(403).json({ blocked: true, reason: 'missing-headers' });
  }
  
  // Passed all checks
  return res.status(200).json({ blocked: false });
}
