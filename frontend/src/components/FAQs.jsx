'use client'
import React, { useState } from "react";
import { features } from "../../data/features";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
              <p className="text-base text-[#004434] ">
                Some of the features and details of our services
              </p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {
            features.map((feature, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold text-dark">
                  {feature.feature}
                </AccordionTrigger>
                <AccordionContent className="text-base text-[#004434]">
                  {feature.description}
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </div>
    </section>
  );
};

export default FAQS;