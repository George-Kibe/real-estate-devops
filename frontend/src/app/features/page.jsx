"use client"

import AnimatedText from "@/components/AnimatedText";
import FAQS from "@/components/FAQs";
import PricingCard from "@/components/PricingCard";
import PricingDetails from "@/components/PricingDetails";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const FeaturesPage = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("#pricing")) {
      setTimeout(() => {
        const pricingSection = document.getElementById("pricing");
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 200); // Short delay to ensure DOM is ready
    }
  }, [pathname]);
  
  return (
    <section className="text-[#0B2B5F] relative z-10 overflow-hidden pt-4 dark:bg-dark lg:pb-[10px] lg:pt-[10px]">
      {/* <OurOffering /> */}
      {/* <Features /> */}
      <FAQS />
      <PricingDetails />
    </section>
  );
};

export default FeaturesPage;

