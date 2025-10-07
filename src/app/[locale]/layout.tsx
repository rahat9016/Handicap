
import ToastProvider from "@/components/share/Toast/ToastProvider";
import { routing } from "@/i18n/routing";
import QueryProvider from "@/lib/react-query/QueryProvider";
import StoreProvider from "@/lib/redux/provider/StoreProvider";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import { UserFetcher } from "./UserFetcher";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Disability Inclusion Resource Hub",
  description: "The major Rohingya influx into Cox’s Bazar, Bangladesh began in August 2017, after which the humanitarian community in Cox’s Bazar has continued its efforts to strengthen disability-inclusive practices across the response. Over the years, various organizations have developed valuable tools, resources, and training materials to promote inclusion; however, these resources were often scattered and difficult to access. The Disability Inclusion Resource Hub has been created to bring all these materials together in one accessible platform, making it easier for humanitarian stakeholders to find, use, and learn from the collective knowledge of the response.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <StoreProvider>
            <QueryProvider>
              <ToastProvider>
                <UserFetcher />
                <main id="main-content">
                  {children}
                </main>
              </ToastProvider>
            </QueryProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
