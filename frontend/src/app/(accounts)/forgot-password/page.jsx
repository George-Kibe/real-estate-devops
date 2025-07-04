'use client'

import AnimatedText from "@/components/AnimatedText";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!email){
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const data = {email};
      const response = await axios.post('/api/auth/users/forgot-password', data)
      if (response.status === 200) {
        toast.success('Password reset link sent to your email');
        router.push('/login');
        setLoading(false)
      }
      setEmail('');
    } catch (error) {
      toast.error("Error Sending your request!");
      setLoading(false)
    }
  }

  return (
    <section className="text-[#0B2B5F] ">
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
                    value={loading ? 'Loading...' : 'Reset Password'}
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
              <p className="text-base mt-4 text-[#004434] dark:text-dark-6">
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
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-[#004434] outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};
