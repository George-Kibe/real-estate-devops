"use client"

import AnimatedText from "@/components/AnimatedText";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCurrentUser, setLoggedIn} = useMainProvider();  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { email:email.trim(), password };
      const response = await axios.post('/api/auth/login', body);
      setCurrentUser(response.data);
      toast.success("Sign in Successful!")
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      toast.error("Sign in Error! Try Again!")
      setLoading(false); 
    }
  }
  
  return (
    <section className="bg-gray-1 dark:bg-dark ">
        <AnimatedText text={"Sign In"} />
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-10 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16"> 
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="text" placeholder="Username or Email" />
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
                    value={loading ? "Loading..." : "Sign In"}
                    className="w-full cursor-pointer bg-blue-600 text-white rounded-md border border-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <p className="mb-6 text-base text-secondary-color dark:text-dark-7">
                OR
              </p>
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
