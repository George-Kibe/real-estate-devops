"use client"
import { useRouter } from 'next/navigation';

import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { set } from 'nprogress';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTwo, setpasswordTwo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
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
    const body = JSON.stringify({ email, password, name, firstName, lastName })
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
        toast.error("Error creating User! Try Again. Probbly Email already exists!")
      }
      setLoading(false)
    } catch (error) {
      setError(true)
      toast.error("Error creating User! Try Again")
      setLoading(false)
    }
  }

  return (
    <section className="bg-gray-1 dark:bg-dark ">
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
              <p className="text-base text-body-color dark:text-dark-6">
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
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};
