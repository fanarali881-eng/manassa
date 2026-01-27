import { useEffect, useState } from 'react';

// Advanced client-side bot detection
export function useBotDetection() {
  const [isBot, setIsBot] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const detectBot = () => {
      const checks: boolean[] = [];
      
      // Check 1: WebDriver property (Selenium, Puppeteer)
      // @ts-ignore
      checks.push(!!navigator.webdriver);
      
      // Check 2: Headless Chrome
      // @ts-ignore
      checks.push(!!window.chrome?.runtime === false && !!window.chrome);
      
      // Check 3: PhantomJS
      // @ts-ignore
      checks.push(!!window.callPhantom || !!window._phantom);
      
      // Check 4: Nightmare.js
      // @ts-ignore
      checks.push(!!window.__nightmare);
      
      // Check 5: Selenium
      // @ts-ignore
      checks.push(!!document.__selenium_unwrapped || !!document.__webdriver_evaluate || !!document.__driver_evaluate);
      
      // Check 6: Check for automation properties
      // @ts-ignore
      checks.push(!!navigator.plugins && navigator.plugins.length === 0 && navigator.userAgent.indexOf('HeadlessChrome') !== -1);
      
      // Check 7: Check screen dimensions (bots often have weird dimensions)
      checks.push(window.outerWidth === 0 || window.outerHeight === 0);
      
      // Check 8: Check for missing browser features
      checks.push(!window.localStorage || !window.sessionStorage);
      
      // Check 9: Check for Puppeteer
      // @ts-ignore
      checks.push(!!window.puppeteer);
      
      // Check 10: Check languages (bots often have empty or minimal)
      checks.push(!navigator.languages || navigator.languages.length === 0);
      
      // Check 11: Check for automation in user agent
      const ua = navigator.userAgent.toLowerCase();
      checks.push(
        ua.includes('headless') ||
        ua.includes('phantom') ||
        ua.includes('selenium') ||
        ua.includes('webdriver') ||
        ua.includes('puppeteer') ||
        ua.includes('playwright')
      );
      
      // Check 12: Check for missing permissions API
      // @ts-ignore
      checks.push(!navigator.permissions);
      
      // Check 13: Check for missing Notification API
      checks.push(!('Notification' in window));
      
      // Check 14: Check connection info (bots often don't have this)
      // @ts-ignore
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      checks.push(!connection);
      
      // If any check is true, likely a bot
      const botDetected = checks.some(check => check === true);
      setIsBot(botDetected);
      setChecked(true);
      
      // If bot detected, redirect or block
      if (botDetected) {
        console.warn('Bot detected - access restricted');
        // Optionally redirect to a blocked page
        // window.location.href = '/blocked';
      }
    };

    // Run detection after a small delay (bots often don't wait)
    const timer = setTimeout(detectBot, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return { isBot, checked };
}

// Bot Shield Component - wraps the app
export function BotShield({ children }: { children: React.ReactNode }) {
  const { isBot, checked } = useBotDetection();
  
  // Show nothing while checking
  if (!checked) {
    return null;
  }
  
  // Block bots
  if (isBot) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h1 style={{ color: '#333' }}>Access Denied</h1>
          <p style={{ color: '#666' }}>Automated access is not permitted.</p>
          <p style={{ color: '#999', fontSize: '14px' }}>Error Code: 403-BOT</p>
        </div>
      </div>
    );
  }
  
  // Allow humans
  return <>{children}</>;
}

export default BotShield;
