"use client"

import AnimatedText from "@/components/AnimatedText";
import FAQS from "@/components/FAQs";
import PricingCard from "@/components/PricingCard";
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
    <section className="relative z-10 overflow-hidden pt-4 dark:bg-dark lg:pb-[10px] lg:pt-[10px]">
      {/* <OurOffering /> */}
      {/* <Features /> */}
      <FAQS />
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <AnimatedText text={'Our Pricing Plan'} />
              <p className="text-base text-body-color dark:text-dark-6">
                To enjoy our premium services, subscribe to any of the following plans
              </p>
            </div>
          </div>
        </div>

        <div id='pricing' className="mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            <PricingCard
              type="Free 7 Days Trial"
              price={0}
              subscription="7 Days Trial"
              description="Perfect for personal search of properties."
              buttonText="Choose Free Trial"
              listItems= {[
                'DHS Compliance Note Taking Assistance',
                'Secure Cloud-Based Storage',
                'Basic Client Management',
                'Basic reporting',
              ]}
            >
            </PricingCard>
            <PricingCard
              type="Standard"
              price={199}
              subscription="year"
              description="Perfect for small number of clients."
              buttonText="Choose Standard"
              priceId={'price_1POCL0EkdIEftzMHCqQx4dYQ'}
              listItems = {[
                'All Basic Plan Features',
                'Real-Time Client Communication Portal',
                'Comprehensive Staff Management',
                'Advanced Reporting',
                'Automated Apartment Feeds',
              ]}
            >
            </PricingCard>
            <PricingCard
              type="Professional"
              price={299}
              subscription="year"
              description="Perfect for commercial users with many clients and need lots of automations."
              buttonText="Choose Professional"
              priceId={'price_1POCL0EkdIEftzMHCqQx4dYQ'}
              listItems = {[
                'All Standard Plan Features',
                'Personalized Housing Solutions',
                'Streamlined Assessment Pathways',
                'Prompt Housing Consultation Services',
                'Priority Support',
              ]}
            >
            </PricingCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;

