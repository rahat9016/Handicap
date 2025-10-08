export class ReferrerDetection {
  /**
   * Get valid referrer that passes backend validation
   * Always returns a valid string (never empty)
   */
  static getValidReferrer(): string {
    const rawReferrer = this.getReferrer();
    
    // Always return a valid value for backend
    if (!rawReferrer || rawReferrer.trim() === '') {
      return 'direct';
    }
    
    // If it's already a formatted source, keep it
    if (rawReferrer.startsWith('utm:') || rawReferrer.startsWith('organic:')) {
      return rawReferrer;
    }
    
    // Try to validate as URL
    try {
      new URL(rawReferrer);
      return rawReferrer;
    } catch {
      // If not a valid URL, return as 'direct'
      return 'direct';
    }
  }

  /**
   * Detect referrer from multiple sources
   */
  private static getReferrer(): string {
    // 1. Check URL parameters (UTM tags)
    const utmSource = this.getUTMSource();
    if (utmSource) {
      return utmSource;
    }

    // 2. Check session storage (for client-side routing)
    const previousPage = this.getPreviousPage();
    if (previousPage && previousPage !== window.location.href) {
      return previousPage;
    }

    // 3. Check document.referrer
    if (document.referrer && document.referrer !== '') {
      const searchEngine = this.detectSearchEngine(document.referrer);
      if (searchEngine) {
        return searchEngine;
      }
      
      // Only return if different domain
      if (this.isDifferentDomain(document.referrer)) {
        return document.referrer;
      }
    }

    // 4. Default to direct
    return 'direct';
  }

  /**
   * Extract UTM parameters from URL
   */
  private static getUTMSource(): string | null {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    if (utmSource) {
      let utmString = `utm:${utmSource}`;
      if (utmMedium) utmString += `-${utmMedium}`;
      if (utmCampaign) utmString += `-${utmCampaign}`;
      return utmString;
    }

    return null;
  }

  /**
   * Get previous page from session storage
   */
  private static getPreviousPage(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('analytics_previous_page');
  }

  /**
   * Detect search engines
   */
  private static detectSearchEngine(referrer: string): string | null {
    if (!referrer) return null;
    
    const searchEngines = [
      { domain: 'google.', name: 'google' },
      { domain: 'bing.', name: 'bing' },
      { domain: 'yahoo.', name: 'yahoo' },
      { domain: 'duckduckgo.', name: 'duckduckgo' },
      { domain: 'baidu.', name: 'baidu' },
      { domain: 'yandex.', name: 'yandex' },
      { domain: 'search.', name: 'unknown_search' },
    ];

    const lowerReferrer = referrer.toLowerCase();
    
    for (const engine of searchEngines) {
      if (lowerReferrer.includes(engine.domain)) {
        return `organic:${engine.name}`;
      }
    }

    return null;
  }

  /**
   * Check if referrer is from different domain
   */
  private static isDifferentDomain(referrer: string): boolean {
    try {
      const refUrl = new URL(referrer);
      const currentUrl = new URL(window.location.href);
      return refUrl.hostname !== currentUrl.hostname;
    } catch {
      return false;
    }
  }

  /**
   * Update previous page in session storage
   * Call this after each page view
   */
  static updatePreviousPage(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('analytics_previous_page', window.location.href);
  }

  /**
   * Clear previous page (on logout or session end)
   */
  static clearPreviousPage(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem('analytics_previous_page');
  }

  /**
   * Debug function to see all referrer sources
   */
  static debugReferrer(): void {
    if (typeof window === 'undefined') return;
    
    console.log('🔍 Referrer Debug Info:');
    console.log('📄 document.referrer:', document.referrer);
    console.log('💾 sessionStorage referrer:', sessionStorage.getItem('analytics_previous_page'));
    console.log('🔗 UTM Source:', this.getUTMSource());
    console.log('🌐 Final Referrer:', this.getValidReferrer());
    console.log('📍 Current URL:', window.location.href);
  }
}