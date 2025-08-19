export function isValidUrl(url?: string) {
    try {
      if (!url) return false;
      new URL(url); // throws if invalid
      return true;
    } catch {
      return false;
    }
  }