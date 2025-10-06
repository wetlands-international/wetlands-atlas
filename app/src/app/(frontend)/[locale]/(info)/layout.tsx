import Footer from "@/containers/home/footer";
import Navbar from "@/containers/home/navbar";

export default async function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
