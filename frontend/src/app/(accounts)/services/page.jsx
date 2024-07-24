"use client"

import AnimatedText from "@/components/AnimatedText";
import Property from "@/components/Property";
import { useMainProvider } from "@/providers/MainProvider";
import { Flex } from "@chakra-ui/react";


export default function ServicesPage() {
  const {currentUser} = useMainProvider();
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Properties' Services"} />
    </div>
  );
}