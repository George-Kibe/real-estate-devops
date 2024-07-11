'use client'
import AnimatedText from "@/components/AnimatedText";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordPage = ({params}) => {
  const id = params?.id;
  // const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Missing details!");
      return;
    }
    setLoading(true);
    if (password !== passwordTwo) {
      toast.error('Passwords do not match');
      return;
    }
    const data = { _id:id, password };
    try {
      const response = await axios.put('/api/auth/users/reset-password', data);
      if (response.status === 200) {
        toast.success('Password reset successful');
        router.push('/login');
        setLoading(false)
      }
    } catch (error) {
      toast.error("Error Updating your Password!");
      setLoading(false);
    }
  }
  return (
    <section className="bg-gray-1 dark:bg-dark ">
        <AnimatedText text={"Reset password"} />
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-10 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16"> 
              </div>
              <form onSubmit={handleSubmit}>
                {/* <InputBox value={code} onChange={(e) => setCode(e.target.value)} type="text" name="text" placeholder="Code" /> */}
                <InputBox
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <InputBox
                  value={passwordTwo}
                  onChange={(e) => setPasswordTwo(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value={loading ? 'Loading...' : 'Reset Password'}
                    className="w-full cursor-pointer bg-blue-600 text-white rounded-md border border-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
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

export default ResetPasswordPage;

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
