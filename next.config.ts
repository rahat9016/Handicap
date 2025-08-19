import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
