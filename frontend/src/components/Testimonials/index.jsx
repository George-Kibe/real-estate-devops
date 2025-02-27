import React from 'react'
import { testimonials } from '../../../data/testimonials'
import Image from 'next/image'

const Testimonials = () => {
  return (
    <div className='container mx-auto lg:max-w-screen-xl px-4 pt-8 pb-4'>
      <div className="w-full flex flex-col items-center justify-center h-64">
      <p className="text-green-600 text-xl">
          Testimonials
        </p>
        <p className="text-xl md:text-4xl lg:text-6xl font-semibold text-center">
          What our clients Say
        </p>
      </div>

      <div className="grid gap-14 max-w-lg w-full mx-auto lg:gap-8 lg:grid-cols-3 lg:max-w-full">
        {testimonials.map((testimonial, index) => (
            <div
                key={index}
                className=""
            >
                <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
                    <Image
                        src={"/images/defaultProfile.png"}
                        alt={`${testimonial.name} avatar`}
                        width={50}
                        height={50}
                        className="rounded-full shadow-md"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-foreground-accent">{testimonial.role}</p>
                    </div>
                </div>
                <p className="text-foreground-accent text-center lg:text-left">&quot;{testimonial.message}&quot;</p>
            </div>
        ))}
      </div>

    </div>
  )
}

export default Testimonials