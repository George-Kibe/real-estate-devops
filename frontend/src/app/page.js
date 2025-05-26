import AboutNuviane from "@/components/AboutNuviane";
import EdiInsurance from "@/components/EdiInsurance";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import HeroSection from "@/components/HeroSection";
import NuvianeOffering from "@/components/NuvianeOffering";
import NuvianeServices from "@/components/NuvianeServices";
import ServiceCharter from "@/components/ServiceCharter";
import ServiceOffering from "@/components/ServiceOffering";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";

export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen justify-between">

      {/* <Hero />
      <AboutNuviane />
      <FeaturedProjects />
      <ServiceCharter />
      <ServiceOffering />
      <Statistics />
      <Testimonials /> */}
      <HeroSection />
      <NuvianeServices />
      <EdiInsurance />
      <NuvianeOffering />
    </main>
  );
}