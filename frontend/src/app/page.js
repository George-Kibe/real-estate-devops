"use client"
import AboutNuviane from "@/components/AboutNuviane";
import EdiInsurance from "@/components/EdiInsurance";
import FeaturedProjects from "@/components/FeaturedProjects";
import GetnuvianeListed from "@/components/GetNuvianeListed";
import GetStarted from "@/components/GetStarted";
import Hero from "@/components/Hero";
import HeroSection from "@/components/HeroSection";
import MoreFeatures from "@/components/MoreFeatures";
import NewHousing from "@/components/NewHousing";
import NuvianeBranches from "@/components/NuvianeBranches";
import NuvianeOffering from "@/components/NuvianeOffering";
import NuvianeSecurity from "@/components/NuvianeSecurity";
import NuvianeServices from "@/components/NuvianeServices";
import NuvianeTeam from "@/components/NuvianeTeam";
import PricingDetails from "@/components/PricingDetails";
import ServiceCharter from "@/components/ServiceCharter";
import ServiceOffering from "@/components/ServiceOffering";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";

export default function Home() {
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
      <MoreFeatures />
      <NuvianeBranches />
      <NuvianeSecurity />
      <GetnuvianeListed />
      <PricingDetails />
      <GetStarted />
      <NuvianeTeam />
      <NewHousing />
    </main>
  );
}