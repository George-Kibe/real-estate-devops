import AnimatedText from "@/components/AnimatedText";
import PricingCard from "@/components/PricingCard";
import React from "react";

const FeaturesPage = () => {
  return (
    <section className="relative z-10 overflow-hidden pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <AnimatedText text={'Our Pricing Plan'} />
              <p className="text-base text-body-color dark:text-dark-6">
                To enjoy our premoum services, subscribe to any of the following plans
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 flex flex-wrap">
            <PricingCard
              type="Personal"
              price="Free"
              subscription="year"
              description="Perfect for personal search of properties."
              buttonText="Choose Personal"
              listItems= {[
                '1 User',
                'All UI components',
                'Lifetime access',
                'Free updates',
                'Limited support',
              ]}
            >
            </PricingCard>
            <PricingCard
              type="Business"
              price="$99"
              subscription="year"
              description="Perfect for small number of clients."
              buttonText="Choose Business"
              active
              priceId={'price_1POCL0EkdIEftzMHCqQx4dYQ'}
              listItems = {[
                '5 User',
                'All UI components',
                'Lifetime access',
                'Free updates',
                '4 Months support',
              ]}
            >
            </PricingCard>
            <PricingCard
              type="Professional"
              price="$199"
              subscription="year"
              description="Perfect for commercial users with many clients and need lots of automations."
              buttonText="Choose Professional"
              priceId={'price_1POCL0EkdIEftzMHCqQx4dYQ'}
              listItems = {[
                'Unlimited Users',
                'All UI components',
                'Lifetime access',
                'Free updates',
                '12 Months support',
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

