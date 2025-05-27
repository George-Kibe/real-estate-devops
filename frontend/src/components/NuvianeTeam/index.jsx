"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";

const staffMembers = [
  {
    "id": 1,
    "image": "/pictures/team1.png",
    "name": "Housing Specialists",
    "role": "Former case managers and program leads",
    "description": "Who understand the challenges and build tools that solve them."
  },
  {
    "id": 2,
    "image": "/pictures/team2.png",
    "name": "Tech Innovators",
    "role": "Engineers and designers",
    "description": "Crafting intuitive software to simplify complex workflows."
  },
  {
    "id": 3,
    "image": "/pictures/team3.png",
    "name": "Compliance & Billing Experts",
    "role": "Compliance specialists",
    "description": "Ensuring everything we build meets HIPAA, EDI, and audit standards."
  },
  {
    "id": 4,
    "image": "/pictures/team4.png",
    "name": "Support Champions",
    "role": "Support team",
    "description": "Dedicated to your success with real-time guidance and personalized onboarding."
  }
];

const testimonials = [
  {
    id: 1,
    name: "Robin Ayala Doe", 
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.",
  },
  {
    id: 2,
    name: "John De marli",
    image: "https://randomuser.me/api/portraits/women/90.jpg", 
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
  },
  {
    id: 3,
    name: "Rowhan Smith",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    text: "When she reached the first hills of the Mountains, she had a last view back on the of her hometown Bookmarksgrove, the headline.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "The customer service has been exceptional. They went above and beyond to help me solve my problems and were always available when I needed them.",
  },
  {
    id: 5,
    name: "Michael Chen",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've been using their services for over a year now and couldn't be happier. The platform is intuitive and the features are exactly what I needed for my business.",
  },
  {
    id: 6,
    name: "Emma Wilson",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    text: "What impressed me most was how quickly they responded to my requests. The team is professional, knowledgeable, and truly cares about their customers' success.",
  },

];
export default function NuvianeTeam() {
  return (
    <section className="text-[#0B2B5F] bg-[#EEF4FE] w-full p-4 md:p-16">
      <div className="text-[#0B2B5F]relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />
        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Our Team Passionate Experts Driving Impact <br />
        </h2>
        <h2 className="text-center mb-4 md:mb-8">At Nuviane, our team is made up of mission-driven professionals with deep expertise inhousing stabalization, social staffs, technology and complicance. Together, we bring a powerful blend of real world experience and innovative thinkling to build solutions that truly empower providers and improve client outcomes.</h2>
      </div>

      <div className="flex flex-wrap ">
        {
          staffMembers.map((staff) => (
            <div key={staff.id} class="w-full px-4 md:w-1/2 lg:w-1/4">
              <SingleStaff staff={staff} />
            </div>
          ))
        }
      </div>
      <Testimonials />
    </section>
  );
}


const SingleStaff = ({staff}) => {
  return (
    <div class="mb-4 cursor-pointer" data-wow-delay=".1s">
      <div class="mb-4 overflow-hidden rounded-xl">
      <a class="">
          <Image width={300} height={300} 
          src={staff.image}
          alt="image"
          class="object-contain  " 
          />
      </a>
      </div>
      <div className='flex flex-col items-start'>
      <h3 className="text-2xl font-semibold">
          {staff.name}
      </h3>
      <p class="max-w-[500px] my-2 md:my-4 text-base text-body-color dark:text-dark-6">
          {staff.description}
      </p>
      </div>
    </div>
   
  )
}


const Testimonials = () => {
  return (
    <section className="text-[#0B2B5F] bg-[#EEF4FE] w-full p-4 md:p-16">
      <div className="text-[#0B2B5F]relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />
        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          What Our Clients Say <br />
        </h2>
        <h2 className="text-center mb-4 md:mb-8">Real Stories from professionals who use Nuviane Daily</h2>
      </div>
      <section id="testimonials" className="px-4 max-w-7xl mx-auto">
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="relative"
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper md:mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id} className='h-full md:py-12 py-4'>
              <motion.div 
                variants={fadeIn('up', 0.3 * (index + 1))}
                className="text-center bg-white p-4 rounded-lg shadow-md h-full flex flex-col"
              >
                <motion.div 
                  variants={fadeIn('down', 0.4 * (index + 1))}
                  className="w-24 h-24 mx-auto mb-4"
                >
                  <motion.img
                    variants={fadeIn('up', 0.5 * (index + 1))}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <motion.div 
                  variants={fadeIn('up', 0.4 * (index + 1))}
                  className="flex justify-center mb-2"
                >
                  {[...Array(5)].map((_, starIndex) => (
                    <motion.span 
                      key={starIndex} 
                      variants={fadeIn('up', 0.1 * starIndex)}
                      className="text-blue-600"
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
                <motion.h3 
                  variants={textVariant(0.3)}
                  className="font-semibold text-xl mb-3"
                >
                  {testimonial.name}
                </motion.h3>
                <motion.p 
                  variants={fadeIn('up', 0.6 * (index + 1))}
                  className="text-gray-600"
                >
                  {testimonial.text}
                </motion.p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.div 
          variants={fadeIn('up', 0.7)}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button 
            variants={fadeIn('right', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0B2B5F] hover:text-white cursor-pointer transition-colors"
          >
            <BsChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button 
            variants={fadeIn('left', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-#0B2B5F] hover:text-white cursor-pointer transition-colors"
          >
            <BsChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
    </section>
  );
}