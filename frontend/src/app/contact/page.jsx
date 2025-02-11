"use client"
import React, { useState } from "react";
import {HomeIcon, Mail, PhoneCallIcon} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const ContactPage = () => {
  // handle API to save query to database and inform admin
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone_number, setPhone_number] = useState('');

  const handleSubmit = async() => {
    if (!name || !email || !message ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const body = { name, email, message, phone_number}
      const response  = await axios.post(`${BACKEND_URL}/drf-api/enquiries/`, body);
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Your message has submitted successfully. One of us will get back to you");
        setName('');
        setEmail('');
        setMessage('');
        setPhone_number('');
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error submitting your message. Please Try Again");
      setLoading(false);
    }
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden py-20 dark:bg-dark lg:py-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <span className="mb-4 block text-base font-semibold text-primary">
                  Contact Us
                </span>
                <h2 className="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  GET IN TOUCH WITH US
                </h2>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Minimize audit risks and ensure compliance with Nuviane's HSS-focused solutions. Streamline DHS-compliant note-taking and track HSS staff activities seamlessly, storing all daily apartment searches, activities, and billable work on Google Sheet cloud storage for thorough record-keeping.
                </p>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <HomeIcon />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      428 Minnesota Street, Suite 500
                    </p>
                    <p className="text-base text-body-color dark:text-dark-6">
                      Saint Paul, MN  Postal Code: 651
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                  <PhoneCallIcon />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      +1 (651) 417-1699
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                  <Mail />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      info@Nuviane.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative rounded-lg p-8 shadow-lg dark:bg-dark-2 sm:p-12">
                <div>
                  <div className="">
                    <p className="">Name:</p>
                    <input type="text" placeholder='Name' 
                      value={name}
                      onChange={ev => setName(ev.target.value)}
                      className="border-2 border-gray-300 rounded-md p-1 w-full 
                      mb-2 focus:border-blue-900" 
                    /> 
                  </div>
                  <div className="">
                    <p className="">Email:</p>
                    <input type="email" placeholder='Name' 
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
                      className="border-2 border-gray-300 rounded-md p-1 w-full 
                      mb-2 focus:border-blue-900" 
                    /> 
                  </div>
                  <div className="">
                    <p className="">Phone Number:</p>
                    <input type="text" placeholder='Phone Number' 
                      value={phone_number}
                      onChange={ev => setPhone_number(ev.target.value)}
                      className="border-2 border-gray-300 rounded-md p-1 w-full 
                      mb-2 focus:border-blue-900" 
                    /> 
                  </div>
                  <p className="font-semibold pr-2">Your Message</p>
                    <textarea type="text" placeholder='Enter Your Message here...' 
                      value={message} 
                      onChange={ev => setMessage(ev.target.value)}
                      className="border-2 h-24 border-gray-300 rounded-md p-1 w-full 
                      mb-2 focus:border-blue-900" 
                    /> 
                  <div>
                    <Button
                      onClick={handleSubmit}
                      className="w-full rounded border border-primary text-white dark:text-black bg-primary p-3 transition hover:bg-opacity-90"
                    >
                      {
                        loading? "Loading..." : "Send Message"
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

const ContactTextArea = ({ row, placeholder, name, defaultValue }) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

const ContactInputBox = ({ type, placeholder, name }) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};
