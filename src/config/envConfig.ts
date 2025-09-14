export const getBaseUrl = (): string => { 
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.0.3:4047/api/v1"; // uat server API 
};