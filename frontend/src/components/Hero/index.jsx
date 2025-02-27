"use client";
import Image from "next/image";

const Hero = () => {

  return (
    <section className="relative md:pt-16 md:pb-16 py-8 overflow-hidden z-1">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12 justify-center items-center">
          <div className="flex flex-col justify-start h-full col-span-5">
            <div className="py-2 rounded-full w-fit mb-40">
              <p className="text-green-600 text-xl">
                --- 10+ years of experience in the industry👋
              </p>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-8xl font-bold">
              We help build your dream
            </h1>
          </div>
          <div className="flex flex-col col-span-7">
            <div className="flex justify-end w-full col-span-7">
              <Image
                src="/images/sky-scraper.png"
                alt="banner image"
                width={500}
                height={500}
                className="z-10"
              />
            </div>
            <div className="w-full flex -mt-32 justify-center items-center col-span-7">
              <Image
                src="/images/sky-scraper2.png"
                alt="banner image"
                width={500}
                height={500}
                className="self-center z-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-48 w-full">
      <Image
        src="/images/background.png"
        alt="banner image"
        width={400}
        height={400}
        className="w-full"
      />
      </div>
    </section>
  );
};

export default Hero;
