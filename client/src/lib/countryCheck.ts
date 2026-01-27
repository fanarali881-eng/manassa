import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Get booking settings from Firestore
 */
export async function getBookingSettings(): Promise<{ url: string; countries: string[] }> {
  try {
    const docRef = doc(db, 'settings', 'booking');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        url: data.url || '',
        countries: data.countries || []
      };
    }
    
    return { url: '', countries: [] };
  } catch (error) {
    console.error('Error fetching booking settings:', error);
    return { url: '', countries: [] };
  }
}

/**
 * Get user's country code using IP geolocation
 * Returns country code (e.g., "SA", "AE") or null if unable to detect
 */
export async function getUserCountry(): Promise<string | null> {
  try {
    // Try multiple free geolocation services
    const services = [
      'https://ipapi.co/json/',
      'https://ip-api.com/json/',
      'https://geolocation-db.com/json/',
    ];

    for (const service of services) {
      try {
        const response = await fetch(service, { 
          signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        
        if (!response.ok) continue;
        
        const data = await response.json();
        
        // Different services use different field names
        const countryCode = data.country_code || data.countryCode || data.country;
        
        if (countryCode && typeof countryCode === 'string') {
          return countryCode.toUpperCase();
        }
      } catch (error) {
        // Try next service
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error detecting country:', error);
    return null;
  }
}

/**
 * Check if user's country is allowed for external booking URL
 * @param allowedCountries Array of allowed country codes (e.g., ["SA", "AE", "KW"])
 * @returns true if user's country is allowed or if no countries are specified
 */
export async function isCountryAllowed(allowedCountries: string[]): Promise<boolean> {
  // If no countries specified, allow all (everyone uses external URL)
  if (!allowedCountries || allowedCountries.length === 0) {
    console.log('[Country Check] No countries specified, allowing all');
    return true;
  }

  const userCountry = await getUserCountry();
  console.log('[Country Check] User country:', userCountry);
  console.log('[Country Check] Allowed countries:', allowedCountries);
  
  // If unable to detect country, deny access (use internal form)
  if (!userCountry) {
    console.log('[Country Check] Unable to detect country, using internal form');
    return false;
  }

  // Check if user's country is in allowed list
  const isAllowed = allowedCountries.includes(userCountry);
  console.log('[Country Check] Is country allowed?', isAllowed);
  return isAllowed;
}

/**
 * Get the appropriate booking URL based on user's country
 * @param externalUrl External booking URL
 * @param allowedCountries Array of allowed country codes
 * @returns External URL if allowed, empty string otherwise (use internal form)
 */
export async function getBookingUrl(
  externalUrl: string,
  allowedCountries: string[]
): Promise<string> {
  console.log('[Booking URL] External URL:', externalUrl);
  console.log('[Booking URL] Allowed countries:', allowedCountries);
  
  // If no external URL or empty string, return empty (use internal form)
  if (!externalUrl || externalUrl.trim() === '') {
    console.log('[Booking URL] No external URL, using internal form');
    return '';
  }

  // Bot detection: bots always use internal form
  const { isBot } = await import('./botDetection');
  if (isBot()) {
    console.log('[Booking URL] Bot detected, using internal form');
    return ''; // Bots use internal form
  }

  // Check if country is allowed
  const allowed = await isCountryAllowed(allowedCountries);
  
  const result = allowed ? externalUrl : '';
  console.log('[Booking URL] Final result:', result || 'internal form');
  return result;
}
