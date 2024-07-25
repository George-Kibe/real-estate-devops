'use client'
import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import { Mail, Phone } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const {currentUser} = useMainProvider()

  function addDaysToDate(dateString, days) {
    const date = new Date(dateString); // Parse the date string into a Date object
    date.setDate(date.getDate() + days); // Add the specified number of days
    return date.toISOString(); // Return the new date as an ISO string
  }
  const router = useRouter();
  
  const upgradeToEnterPrise = () => {
   router.push(`/checkout?amount=299`)
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
          </h1>
          <h1 className="text-gray-800 dark:text-white">
            Last Subscription Date: {moment(currentUser?.subscriptionDate).format('MMMM Do YYYY')}
          </h1>
          <h1 className="text-gray-800 dark:text-white">
            Current Subscription Expiry Date:  {moment(addDaysToDate(currentUser?.subscriptionDate, 365)).format('MMMM Do YYYY')}
          </h1>
          {
            !currentUser?.isEnterprise && 
            <Button className="mt-5" onClick={upgradeToEnterPrise}>Upgrade to Enterprise</Button>
          }
      </div>
      
    </div>
  );
}