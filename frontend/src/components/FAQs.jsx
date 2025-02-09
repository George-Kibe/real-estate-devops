'use client'
import React, { useState } from "react";
import { features } from "../../data/features";
import {ChevronDown} from 'lucide-react';

const FAQS = () => {
  return (
    <section className="relative z-20 overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                SUMMARY OF ALL FEATURES
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-[40px]/[48px]">
                What you can get from Nuviane
              </h2>
              <p className="text-base text-body-color ">
                Some of the features and details of our services
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
            {
              features.map((feature, index) => (
                <div key={index} className="w-full px-4 lg:w-1/2">
                  <AccordionItem
                    header={feature.feature}
                    text={feature.description}
                  />
                </div>
              ))
            }
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <ChevronDown />
      </div>
    </section>
  );
};

export default FAQS;

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event.preventDefault();
    setActive(!active);
  };
  return (
    <div className="mb-8 w-full rounded-lg p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary ">
          <ChevronDown className={`fill-primary stroke-primary duration-200 ease-in-out ${
              active ? "rotate-180" : ""
            }`}/>
        </div>

        <div className="w-full">
          <h4 className="mt-1 text-lg font-semibold text-dark ">
            {header}
          </h4>
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color ">
          {text}
        </p>
      </div>
    </div>
  );
};
