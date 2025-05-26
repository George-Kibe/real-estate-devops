import AboutNuviane from "@/components/AboutNuviane";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import HeroSection from "@/components/HeroSection";
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
    </main>
  );
}