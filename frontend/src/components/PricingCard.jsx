"use client"
import { list } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-toastify";

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  priceId,
  listItems

}) => {
  // POST request 
  const handleSubscription = async (id) => {
    const session = useSession();
    const email = session?.data?.user?.email;
    // e.preventDefault();
    if(price === 'Free'){
      toast.success("You are now subscribed for free");
      return;
    }

    const { data } = await axios.post('/api/stripe',
    {
      priceId: id
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    window.location.assign(data)
  }
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke  px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
          <span className="mb-3 block text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
            {price}
            <span className="text-base font-medium text-body-color dark:text-dark-6">
              / {subscription}
            </span>
          </h2>
          <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
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
                ? "block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white dark:text-black transition hover:bg-opacity-90"
                : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary dark:border-dark-3"
            } `}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default PricingCard;

export const List = ({ children }) => {
  return (
    <p className="text-base text-body-color dark:text-dark-6">· {children}</p>
  );
};
