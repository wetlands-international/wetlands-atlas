import { useTranslations } from "next-intl";

import { Header } from "@/containers/header";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("storiesId.not-found");

  return (
    <aside className="z-10 w-xl shrink-0">
      <Header className="sticky top-0 z-20 p-4" blur={false}>
        <div className="flex items-center gap-2">
          <Link href="/landscapes">Landscapes</Link>
        </div>
      </Header>
      <article className="space-y-5 px-11 py-10">
        <div className="prose prose-invert">
          <h1 className="font-display animate-in fade-in slide-in-from-top-10 text-7xl font-bold text-blue-300">
            {t("title")}
          </h1>
          <p className="text-lg">{t("description")}</p>
        </div>

        <Link href="/landscapes">
          <Button>{t("back")}</Button>
        </Link>
      </article>
    </aside>
  );
}
