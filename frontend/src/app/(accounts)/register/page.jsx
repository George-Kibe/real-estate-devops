"use client"
import { useRouter } from 'next/navigation';

import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { professions } from '@/lib/data';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTwo, setpasswordTwo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState("");
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email || !password || !passwordTwo || !firstName || !lastName) {
      toast.error('Please fill all fields');
      return;
    }
    // validate password and passwordTwo match
    if (password !== passwordTwo) {
      toast.info('Passwords do not match');
      return;
    }
    const name = firstName + " " + lastName;
    // send register data and redirect to dashboard
    const body = JSON.stringify({ email, password, name, firstName, lastName, isProfessional:isProfessional, profession: selectedProfession })
    setLoading(true)
    try {
      const response = await fetch("/api/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body
      });
      if (response.status === 201) {
        router.push("/login?success=Account has been successfully created")
        toast.success("User Created Successfully! You can now login")
      }else{
        toast.error("Error creating User! Try Again. Probably Email already exists!")
      }
      setLoading(false)
    } catch (error) {
      setError(true)
      toast.error("Error creating User! Try Again")
      setLoading(false)
    }
  }

  const handleClick = () => {
    setIsProfessional(!isProfessional);
  }

  return (
    <section className="text-[#0B2B5F] ">
      <AnimatedText text={"Register"} />
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-10 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16"> 
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                <InputBox value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" placeholder="First Name" />
                <InputBox value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" placeholder="Last Name" />
                <InputBox
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <InputBox
                  value={passwordTwo}
                  onChange={(e) => setpasswordTwo(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                />
                <div className="flex flex-row items-center mb-4 gap-4">
                  <input id="checkbox-table-search-1" type="checkbox" 
                      onChange={handleClick}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isProfessional}
                  />
                  <p className="">I am a Professional</p>
                </div>
                {
                  isProfessional && (
                    <div className="flex flex-col items-center justify-center p-8">
                    <label className="mb-2 text-lg font-semibold" htmlFor="profession">
                      Select Your Profession
                    </label>
                    <div className="relative inline-block w-64">
                      <select
                        id="profession"
                        className="block appearance-none w-full border border-gray-300 py-3 px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                        value={selectedProfession}
                        onChange={(e) => setSelectedProfession(e.target.value)}
                      >
                        <option value="" disabled>Select a profession...</option>
                        {professions.map((profession, index) => (
                          <option key={index} value={profession}>
                            {profession}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548a1 1 0 111.42-1.404L10 9.214l3.064-3.07a1 1 0 011.42 1.403l-3.765 3.772a1 1 0 01-1.418 0L5.516 7.548z"/></svg>
                      </div>
                    </div>
                    {selectedProfession && (
                      <p className="mt-4 text-lg">You said You are a: {selectedProfession}</p>
                    )}
                  </div>
                  )
                }
                <div className="mb-10">
                  <input
                    type="submit"
                    value={loading ? "Loading..." : "Sign Up"}
                    className="w-full cursor-pointer bg-blue-600 text-white rounded-md border border-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
                
              </form>
              <p className="mb-6 text-base text-secondary-color dark:text-dark-7">
                OR
              </p>
              {/* <div className="flex items-center justify-center gap-2 bg-black dark:bg-white rounded-md py-2">
                <img src="/svgs/google.svg" alt="" className="w-[25px]" />
                <p className="text-white dark:text-black text-secondary-color dark:text-dark-7">
                    SignUp with Google
                </p>
              </div> */}
              <a
                href="/forgot-password"
                className="mb-2 pt-2 inline-block text-base text-dark hover:text-primary hover:underline"
              >
                Forgot Password?
              </a>
              <p className="text-base text-[#004434] dark:text-dark-6">
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

export default RegisterPage;

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
