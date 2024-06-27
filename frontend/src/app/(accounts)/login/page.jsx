"use client"

import AnimatedText from "@/components/AnimatedText";
import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const session = useSession();
  
  if (session.status === 'authenticated') {
    router.push('/');
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
    });
  }
  
  return (
    <section className="bg-gray-1 dark:bg-dark ">
        <AnimatedText text={"Login"} />
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-10 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16"> 
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                <InputBox
                  value={password }
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer bg-blue-600 text-white rounded-md border border-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <p className="mb-6 text-base text-secondary-color dark:text-dark-7">
                OR
              </p>
              <div className="flex items-center justify-center gap-2 bg-black dark:bg-white rounded-md py-2">
                <img src="/svgs/google.svg" alt="" className="w-[25px]" />
                <button onClick={() => signIn("google")} className="text-white dark:text-black text-secondary-color dark:text-dark-7">
                    Login with Google
                </button>
              </div>
              <a
                href="/forgot-password"
                className="mb-2 pt-2 inline-block text-base text-dark hover:text-primary hover:underline"
              >
                Forgot Password?
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Not a member yet?</span>
                <Link
                  href="/register"
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

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
