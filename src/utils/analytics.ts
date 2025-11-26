// utils/analytics.ts
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getDomainFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname;
  } catch {
    return url;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export function getRouterTitle(url: string) {
  try {
    const path = new URL(url).pathname; 
    const parts = path.split("/");   

    return parts.slice(2).join(" / ") || "Home"; 
  } catch (e) {
    console.log(e)
    return "";
  }
}
