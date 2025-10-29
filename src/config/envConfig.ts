// export const baseURL = 'http://163.47.146.233:4035' // server API - 1
export const baseURL = 'http://163.47.146.233:4035' // UAT server API
// export const baseURL = 'http://192.168.100.240:4047/' // Local Server API
export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    `${baseURL}/handicap/api/v1`
  ); // server API - 1
  // return (
  //   process.env.NEXT_PUBLIC_API_BASE_URL ||
  //   `${baseURL}/handicap/api/v1`
  // );
  // return (
  //   process.env.NEXT_PUBLIC_API_BASE_URL ||
  //   `${baseURL}/handicap/api/v1`
  // ); // uat server API
};



export const getWebUrl = (): string => {
  //  return (
  //   process.env.NEXT_PUBLIC_API_BASE_URL ||
  //   "http://localhost:3000/"
  // );
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://163.47.146.233:4032/";
};
