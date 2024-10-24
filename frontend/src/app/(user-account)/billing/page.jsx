'use client'

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import { Mail, Phone } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const {currentUser} = useMainProvider()
  let days = 365;
  if (currentUser?.isFreeTrial) {
    days = 30;
  }
  console.log('days', days);
  console.log('currentUser?.isFreeTrial', currentUser?.isFreeTrial);
  const futureDate = moment(currentUser?.subscriptionDate).add(days, "days").format("YYYY-MM-DD");

  const router = useRouter();
  const upgradeToEnterPrise = () => {
   router.push("/features")
  }
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Your Billing and Subscription Details"} />
      <div className="">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            First Name:  {currentUser?.first_name || currentUser?.name}
          </h1>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Last Name: {currentUser?.last_name}
          </h1>
          <div className="flex flex-col my-2 text-gray-700 dark:text-gray-200">
            <div className="flex">
                <Mail />
                <h1 className="px-2 text-sm">{currentUser?.email}</h1>
            </div>
            <div className="flex">
                <Phone />
                <h1 className="px-2 text-sm">{currentUser?.phoneNumber}</h1>
            </div>
          </div>
          <h1 className="text-gray-800 dark:text-white">
            Membership Type: {currentUser?.isEnterprise ? "Enterprise" : "Premium"}
            {currentUser?.isFreeTrial ? " (Free Trial)" : ""}
          </h1>
          <h1 className="text-gray-800 dark:text-white">
            Last Subscription Date: {moment(currentUser?.subscriptionDate).format('MMMM Do YYYY')}
          </h1>
          <h1 className="text-gray-800 dark:text-white">
            Current Subscription Expiry Date: {moment(futureDate).format('MMMM Do YYYY')}
          </h1>
          {
            !currentUser?.isEnterprise && 
            <Button className="mt-5" onClick={upgradeToEnterPrise}>Upgrade to Enterprise</Button>
          }
      </div>      
    </div>
  );
}

// import React from 'react'

// const BillingPage = () => {
//   return (
//     <div>BillingPage</div>
//   )
// }

// export default BillingPage