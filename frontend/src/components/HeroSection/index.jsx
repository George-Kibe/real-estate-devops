import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="grid bg-[#0B2B5F] grid-cols-[5fr_4fr] items-center gap-x-18 px-24 py-16 max-xl:grid-cols-2 max-xl:gap-x-12 max-xl:px-16  max-lg:py-32 max-md:grid-cols-1 max-md:grid-rows-[repeat(2,auto)] max-md:gap-y-12 max-md:px-6 max-md:py-24">
      <div>
        <p className="mb-8 md:mb-16 "> -- 10+ Years of experience In the Industry 👋</p>
        <h1 className="text-primary-50 mb-6 text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Powerful. Simple Essential.  <br /> Transform Your Housing Services with HSS
        </h1>
        {/* <p className="text-primary-100 mb-10 text-xl/loose font-light max-xl:mb-8 max-xl:text-lg/8 max-lg:text-base/loose">
          Let AI organize & summarize your notes, <br />
          saving you time and boosting productivity
        </p> */}
        <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-24">
          <div className="">
            <button
                className="text-primary-1300 bg-white border-primary-500 hover:border-primary-50 hover:bg-primary-50 transition-properties primary-glow-hover primary-glow group flex cursor-pointer items-center gap-x-3 rounded-full border-2 px-8 py-3.5 max-xl:gap-x-2 max-xl:px-6 max-xl:py-3"
                >
                <p className="text-lg/8 text-black">Start Free Trial</p>
                <div className="w-5 max-xl:w-4 max-sm:hidden">
                    <ArrowRight
                    alt="Arrow right icon"
                    className="stroke-primary-1300 inline w-5 max-xl:w-4"
                    width={2}
                    />
                </div>
            </button>
             <p className="mt-2 text-sm max-xl:text-base/loose">7-Day Trial. No credit card required.</p>
          </div>
          <div className="">
            <button
                className="text-primary-1300 bg-primary-500 border-primary-500 hover:border-primary-50 hover:bg-primary-50 transition-properties primary-glow-hover primary-glow group flex cursor-pointer items-center gap-x-3 rounded-full border-2 px-8 py-3.5 max-xl:gap-x-2 max-xl:px-6 max-xl:py-3"
                >
                <p className="text-lg/8 max-xl:text-base/loose">See It In action</p>
                <div className="w-5 max-xl:w-4 max-sm:hidden">
                    <ArrowRight
                    alt="Arrow right icon"
                    className="stroke-primary-1300 inline w-5 max-xl:w-4"
                    width={2}
                    />
                </div>
            </button>
             <p className="mt-2 text-sm max-xl:text-base/loose">Watch How Nuviane Simplifies Housing Tracking.</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="bg-primary-1300 absolute top-0 right-0 bottom-0 left-0 rounded-full blur-3xl" />
        <Image
          width={1000}
          height={800}
          src={"/pictures/hero-image.png"}
          alt="Hero graphic of an Iphone showing NoteFlows note summarizer"
          className="relative max-h-[40rem] justify-self-end max-md:max-h-auto max-md:max-w-[90%] max-md:justify-self-center max-sm:max-w-full"
        />
      </div>
    </div>
  );
}
