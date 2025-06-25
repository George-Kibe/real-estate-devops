"use client"

import { useMainProvider } from "@/providers/MainProvider";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PricingCard = ({
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  priceId,
  listItems

}) => {
  const router = useRouter();
  const {currentUser, setCurrentUser} = useMainProvider();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async() => {
    const body = {
      isPremium: true,
      isEnterprise: false,
      subscriptionDate: new Date().toISOString(),
      isFreeTrial: true,
    }
    // console.log('Updating: ', body);
    try {
      setLoading(true)
      const response = await fetch(`/api/auth/users/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (response.status === 200){
        const data = await response.json();
        console.log('Response data', data);
        setCurrentUser(data);
        toast.success("Status update Successful. You can Test our servies for 7 days")
        router.push("/dashboard")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Error Updating, Try Again")
      setLoading(false)
    }
  }

  const handleSubscription = async () => {
    if (price === 0) {
      handleUpdate();
    } else{
      router.push(`/checkout/?amount=${price}`)
    }
  }
  return (
    <>
      <div className=" text-[#0B2B5F] w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke  px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
          <span className="mb-3 block text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
            ${price}
            <span className="text-base font-medium text-[#004434] dark:text-dark-6">
              / {subscription}
            </span>
          </h2>
          <p className="mb-8 border-b border-stroke pb-8 text-base text-[#004434] dark:border-dark-3 dark:text-dark-6">
            {description}
          </p>
          
          <div className="mb-9 flex flex-col gap-[14px]">
            {
              listItems.map((item, index) => (
                <List key={index}>{item}</List>
              ))
            }
          </div>
          <button onClick={() => handleSubscription(priceId)}
            className={` ${
              active
                ? "p-4 px-16 rounded-full text-white font-bold cursor-pointer"
                : "bg-[#0B2B5F] p-4 px-16 rounded-full text-white font-bold"
            } `}
          >
            {loading ? 'Loading...' : buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default PricingCard;

export const List = ({ children }) => {
  return (
    <p className="text-base text-[#004434] dark:text-dark-6 flex">
      <BadgeCheck className="text-[#0B2B5F] mr-2" />
     {children}
    </p>
  );
};
