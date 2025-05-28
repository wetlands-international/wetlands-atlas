import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("not-found");

  return (
    <main className="relative flex h-[100svh] flex-col items-center justify-center gap-4 overflow-hidden p-4 text-center">
      <h1 className="font-display text-7xl text-blue-300">{t("title")}</h1>
      <p className="text-lg">{t("description")}</p>

      <Link href="/">
        <Button>{t("back")}</Button>
      </Link>
    </main>
  );
}
