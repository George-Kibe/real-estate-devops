import AnimatedText from '@/components/AnimatedText';
import { Solutions } from '@/components/Solutions';
import React from 'react'

const SolutionsPage = () => {
  return (
    <div className='p-2 md:p-16'>
      <AnimatedText text="AptTracking Solutions" className="" />
      <Solutions />
    </div>
  )
}

export default SolutionsPage;
