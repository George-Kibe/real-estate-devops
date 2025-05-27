import React from 'react'
import AnimatedText from '../AnimatedText'
import PricingCard from '../PricingCard'

const PricingDetails = () => {
  return (
    <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <AnimatedText text={'Choose Your Plan'} />
              <p className="text-6 text-[#0B2B5F]">
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
  )
}

export default PricingDetails
