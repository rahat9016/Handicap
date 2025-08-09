export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://163.47.146.233:4036/handicap/api/v1";
  // return process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.100.240:5000/api/v1";
};
