import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of known bot user agents
const botPatterns = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /slurp/i,
  /search/i,
  /mediapartners/i,
  /google/i,
  /bing/i,
  /yahoo/i,
  /baidu/i,
  /yandex/i,
  /duckduck/i,
  /facebook/i,
  /twitter/i,
  /linkedin/i,
  /pinterest/i,
  /whatsapp/i,
  /telegram/i,
  /discord/i,
  /slack/i,
  /semrush/i,
  /ahrefs/i,
  /moz/i,
  /majestic/i,
  /screaming/i,
  /lighthouse/i,
  /pagespeed/i,
  /gtmetrix/i,
  /pingdom/i,
  /uptimerobot/i,
  /gptbot/i,
  /chatgpt/i,
  /openai/i,
  /anthropic/i,
  /claude/i,
  /ccbot/i,
  /bytespider/i,
  /petalbot/i,
  /dotbot/i,
  /mj12bot/i,
  /seznambot/i,
  /sogou/i,
  /exabot/i,
  /facebot/i,
  /ia_archiver/i,
  /archive/i,
  /wget/i,
  /curl/i,
  /python/i,
  /java/i,
  /perl/i,
  /ruby/i,
  /php/i,
  /go-http/i,
  /axios/i,
  /node-fetch/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /scraper/i,
  /scrapy/i,
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if user agent matches any bot pattern
  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  
  // Also block requests with no user agent
  const noUserAgent = !userAgent || userAgent.trim() === '';
  
  if (isBot || noUserAgent) {
    // Return 403 Forbidden for bots
    return new NextResponse('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }
  
  // Allow normal users
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}

export const config = {
  matcher: '/:path*',
};
