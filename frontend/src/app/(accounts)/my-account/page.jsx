"use client"
import AnimatedText from "@/components/AnimatedText";
import { useSession } from "next-auth/react";

export default function MyAccountPage() {
  const session = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"My Account Details"} />
      <div className="flex flex-1 w-full justify-around flex-col md:flex-row">
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Name:
          </label>
          <input
            type='text'
            placeholder='Default Input'
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Email:
          </label>
          <input
            type='text'
            placeholder='Default Input'
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
      </div>
    </div>
  );
}