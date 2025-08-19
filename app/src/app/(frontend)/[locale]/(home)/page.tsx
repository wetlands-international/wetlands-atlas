import { homeSections } from "@/containers/home/constants";
import Footer from "@/containers/home/footer";
import { Hero } from "@/containers/home/hero";
import Navbar from "@/containers/home/navbar";
import HomeSection from "@/containers/home/section";

export default function LandingPage() {
  return (
    <main>
      <div className="px-20 pt-2">
        <Navbar />
      </div>
      <Hero />
      {homeSections.map((doc) => (
        <HomeSection key={doc.kicker} {...doc} />
      ))}
      <Footer />
    </main>
  );
}
