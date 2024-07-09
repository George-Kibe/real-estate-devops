'use client'

import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email){
      toast.error('Please enter your email');
      return;
    }
    // send reset code and redirect to reset page
    toast.info('Resetting password for..', email )
  }

  return (
    <section className="bg-gray-1 dark:bg-dark ">
        <AnimatedText text={"Forgot Password"} />
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-10 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16"> 
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox value={email}  onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="w-full cursor-pointer bg-blue-600 text-white rounded-md border border-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              {/* <p className="mb-6 text-base text-secondary-color dark:text-dark-7">
                OR
              </p>
              <div className="flex items-center justify-center gap-2 bg-black dark:bg-white rounded-md py-2">
                <img src="/svgs/google.svg" alt="" className="w-[25px]" />
                <p className="text-white dark:text-black text-secondary-color dark:text-dark-7">
                    SignUp with Google
                </p>
              </div> */}
              <p className="text-base mt-4 text-body-color dark:text-dark-6">
                <span className="pr-0.5">Already a Member?</span>
                <Link
                  href="/login"
                  className="text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;

const InputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};
