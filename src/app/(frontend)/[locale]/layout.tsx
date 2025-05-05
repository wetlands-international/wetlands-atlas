import { NextIntlClientProvider, hasLocale } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Provider as JotaiProvider } from "jotai";

import { Work_Sans, Aboreto } from "next/font/google";

import "./styles/index.css";
import { Header } from "@/containers/header";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/containers/providers/theme-provider";
import { QueryProvider } from "@/containers/providers/query-provider";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: "normal",
  variable: "--font-worksans",
});

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  style: "normal",
  variable: "--font-aboreto",
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
    <html
      lang={locale}
      className={`${workSans.variable} ${aboreto.variable} font-sans`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <NextIntlClientProvider>
              <QueryProvider>
                <JotaiProvider>
                  <Header />
                  {children}
                </JotaiProvider>
              </QueryProvider>
            </NextIntlClientProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
