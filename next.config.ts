import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "192.168.100.240",
        port: "4035",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.100.240",
        port: "4036",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.100.240",
        port: "4047",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "163.47.146.233",
        port: "4035",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "163.47.146.233",
        port: "4037",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.100.240",
        port: "4047",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.21",
        port: "4047",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.disabilityinclusionresourcehub.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

// 
// https://api.disabilityinclusionresourcehub.com