"use client";

import { useTranslations } from "next-intl";

export const CategoriesHeader = () => {
  const t = useTranslations("insights");

  return (
    <div className="bg-background space-y-4 rounded-4xl p-6">
      <h1 className="font-display text-4xl text-blue-300">{t("title")}</h1>
      <p className="text-foreground text-sm">{t("description")}</p>
    </div>
  );
};
