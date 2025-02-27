import AboutNuviane from "@/components/AboutNuviane";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import ServiceCharter from "@/components/ServiceCharter";
import ServiceOffering from "@/components/ServiceOffering";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";

export default async function Home() {
  return (
    <main className="flex flex-col items-center bg-gray-100 justify-between p-4">
      <Hero />
      <AboutNuviane />
      <FeaturedProjects />
      <ServiceCharter />
      <ServiceOffering />
      <Statistics />
      <Testimonials />
    </main>
  );
}