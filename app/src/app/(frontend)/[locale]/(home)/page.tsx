import { homeSections } from "@/containers/home/constants";
import Footer from "@/containers/home/footer";
import { Hero } from "@/containers/home/hero";
import Landscapes from "@/containers/home/landscapes";
import Navbar from "@/containers/home/navbar";
import HomeSectionContainer from "@/containers/home/section";

export default function LandingPage() {
  return (
    <main>
      <div className="fixed top-0 left-0 z-20 w-full px-20 pt-2">
        <Navbar />
      </div>
      <Hero />
      {homeSections.map((doc) => (
        <HomeSectionContainer key={doc.id} {...doc} />
      ))}
      <Landscapes />
      <Footer />
    </main>
  );
}
