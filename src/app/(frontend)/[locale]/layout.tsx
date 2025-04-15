import { NextIntlClientProvider, hasLocale } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Provider as JotaiProvider } from "jotai";

import "@/styles/index.css";
import { Header } from "@/containers/header";
import { setRequestLocale } from "next-intl/server";

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
    <html lang={locale}>
      <body>
        <NuqsAdapter>
          <NextIntlClientProvider>
            <JotaiProvider>
              <Header />
              {children}
            </JotaiProvider>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
