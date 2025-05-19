import { Work_Sans, Philosopher } from "next/font/google";
import { notFound } from "next/navigation";

import { Provider as JotaiProvider } from "jotai";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { QueryProvider } from "@/containers/providers/query-provider";

import { routing } from "@/i18n/routing";

import "mapbox-gl/dist/mapbox-gl.css";
import "@/styles/index.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: "normal",
  variable: "--font-worksans",
});

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal",
  variable: "--font-philosopher",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${workSans.variable} ${philosopher.variable} font-sans`}>
      <body>
        <QueryProvider>
          <NuqsAdapter>
            <NextIntlClientProvider>
              <JotaiProvider>{children}</JotaiProvider>
            </NextIntlClientProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
