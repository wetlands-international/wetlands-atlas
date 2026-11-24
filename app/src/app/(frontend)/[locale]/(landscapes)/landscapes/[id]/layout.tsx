import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      {/* The visual next to the article, or above it in portrait, where the page is as high as the screen: the
          article scrolls in its own container, which clips it, so that it can't go over the visual */}
      <main className="relative flex portrait:h-svh portrait:flex-col portrait:overflow-hidden">
        {children}
      </main>
    </ClientProviders>
  );
}
