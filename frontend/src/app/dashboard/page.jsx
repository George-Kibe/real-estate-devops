"use client";

import AnimatedText from '@/components/AnimatedText';
import { Button } from '@/components/ui/button';
import { useMainProvider } from '@/providers/MainProvider';
import { BadgeCheck, ShieldAlert } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react'

const Dashboard = () => {
  const { currentUser, orgMode} = useMainProvider();
  // console.log("Current user: ", currentUser);
  let days = 0;
  if (currentUser?.isEnterprise) {
    days = 365;
  } else if(currentUser?.isFreeTrial) {
    days = 7;
  } else if (currentUser?.isPremium) {
    days = 365;
  }
  
  // console.log('currentUser?.isFreeTrial', currentUser?.isFreeTrial);
  const futureDate = moment(currentUser?.subscriptionDate).add(days, "days").format("YYYY-MM-DD");
  const membershipIsValid = moment(futureDate).isAfter(moment().format("YYYY-MM-DD"));

  const router = useRouter();
  const upgradeToEnterPrise = () => {
   router.push("/features#pricing")
  }
  const goToAccounts = () => {
    router.push("/my-account")
  }
  return (
    <div className=''>
      <AnimatedText text={"Dashboard"} />
      {
        (membershipIsValid && currentUser?.isEnterprise) && (
          <div className="py-2 bg-white dark:bg-dark">
            <div className="container">
              <div className="border-green bg-green-light-6 flex w-full rounded-lg border-l-[6px] px-7 py-8 md:p-9">
                <div className="bg-green mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
                  <BadgeCheck className='h-48 w-48' />
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-[#004434]">
                    {
                      orgMode ? "Your Organization membership is active" : "Your membership is active"
                    }
                  </h5>
                  <p className="text-base leading-relaxed text-[#004434]">
                    Keep making best  use of Nuviane services
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        (!currentUser?.orgName && !orgMode) && (
          <div className="py-2 bg-white dark:bg-dark">
            <div className="container">
              <div className="border-yellow bg-yellow-light-4 flex w-full rounded-lg border-l-[6px] px-7 py-8 md:p-9">
                <div className="bg-yellow mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
                  <ShieldAlert className='h-48 w-48' />
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    Attention needed: Complete your profile
                  </h5>
                  <p className="text-base leading-relaxed text-[#D0915C]">
                    Complete your profile to get the best out of Nuviane: add your Organization Name in your Accoutn Settings
                  </p>
           
                  <div className="mt-2">
                    <Button onClick={goToAccounts} className="">
                      Go To accounts Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        (membershipIsValid && currentUser?.isPremium) && (
          <div className="py-2 bg-white dark:bg-dark">
            <div className="container">
              <div className="border-green bg-green-light-6 flex w-full rounded-lg border-l-[6px] px-7 py-8 md:p-9">
                <div className="bg-green mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
                  <BadgeCheck className='h-48 w-48' />
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-[#004434]">
                    {
                      orgMode ? "Your Organization membership is active" : "Your membership is active"
                    }
                  </h5>
                  <p className="text-base leading-relaxed text-[#004434]">
                    Keep making best  use of Nuviane services
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        (membershipIsValid && currentUser?.isFreeTrial) && (
          <div className="py-2 bg-white dark:bg-dark">
            <div className="container">
              <div className="border-yellow bg-yellow-light-4 flex w-full rounded-lg border-l-[6px] px-7 py-8 md:p-9">
                <div className="bg-yellow mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md">
                  <ShieldAlert className='h-48 w-48' />
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    Attention needed: Subscribe to a premium membership
                  </h5>
                  <div className="text-base leading-relaxed text-[#D0915C]">
                    Your Free Trial will expire on {moment(futureDate).format("MMMM DD YYYY")}
                  </div>
                  <Button onClick={upgradeToEnterPrise} className="">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      }      
    </div>
  )
}

export default Dashboard;
