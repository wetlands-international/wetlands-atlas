import { ClientProviders } from "@/app/(frontend)/[locale]/(app)/providers";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <main className="relative flex">{children}</main>
    </ClientProviders>
  );
}
