export const getBaseUrl = (): string => {
   return (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://163.47.146.233:4035/handicap/api/v1"
  ); // server API - 1
  //return (
    //process.env.NEXT_PUBLIC_API_BASE_URL ||
    //"http://192.168.100.240:4047/handicap/api/v1"
  // );
  // return (
  //   process.env.NEXT_PUBLIC_API_BASE_URL ||
  //   "http://192.168.0.3:4047/handicap/api/v1"
  // ); // uat server API
};
export const getWebUrl = (): string => {
  //  return (
  //   process.env.NEXT_PUBLIC_API_BASE_URL ||
  //   "http://localhost:3000/"
  // );
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://163.47.146.233:4032/";
};
