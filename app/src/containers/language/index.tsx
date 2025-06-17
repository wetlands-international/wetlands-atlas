"use client";

import { useTransition } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { Locale, useLocale, useTranslations } from "next-intl";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const Language = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations("language");

  const [isPending, startTransition] = useTransition();

  const onLocaleChange = (value: Locale) => {
    startTransition(() => {
      router.replace(
        {
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          params,
          query: Object.fromEntries(searchParams.entries()), // Ensure searchParams are maintained
        },
        { locale: value },
      );
    });
  };

  return (
    <div className="pointer-events-auto">
      <Select value={locale} onValueChange={onLocaleChange} defaultValue="en" disabled={isPending}>
        <SelectTrigger className="bg-background rounded-4xl px-4 py-4 text-sm">
          <span className="text-sm font-medium uppercase">{locale}</span>
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((locale) => (
            <SelectItem value={locale} key={locale}>
              <span className="text-sm">{t(locale)}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
