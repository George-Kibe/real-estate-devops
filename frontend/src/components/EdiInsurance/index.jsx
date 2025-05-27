
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function EdiInsurance() {
  return (
    <div className="grid bg-[#0B2B5F] grid-cols-[5fr_4fr] items-center gap-x-18 px-24 py-16 max-xl:grid-cols-2 max-xl:gap-x-12 max-xl:px-16  max-lg:py-32 max-md:grid-cols-1 max-md:grid-rows-[repeat(2,auto)] max-md:gap-y-12 max-md:px-6 max-md:py-24">
      <div>
        <h1 className="text-[#0B2B5F]mb-6 text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Not just Another Billing Tool--Built for ALL HCBS & Home Care Services
        </h1>
        <p className="text-primary-100 mb-10 text-xl/loose font-light max-xl:mb-8 max-xl:text-lg/8 max-lg:text-base/loose">
          Nuviane isn't a generic billing platform. It's an all-in-one solution engineered for Housing Stabalization, PCA, Waiver programs and beyond--with smart tools that actually work for your team.
        </p>
        <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-24">
          <div className="">
            <button
                className="text-primary-1300 bg-white border-primary-500 hover:border-primary-50 hover:bg-primary-50 transition-properties primary-glow-hover primary-glow group flex cursor-pointer items-center gap-x-3 rounded-2xl border-2 px-8 py-3.5 max-xl:gap-x-2 max-xl:px-6 max-xl:py-3"
                >
                <p className="text-lg/8 text-black">Schedule a Demo</p>
                <div className="w-5 max-xl:w-4 max-sm:hidden">
                    <ArrowRight
                    alt="Arrow right icon"
                    className="stroke-primary-1300 inline w-5 max-xl:w-4"
                    width={2}
                    />
                </div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="bg-primary-1300 absolute top-0 right-0 bottom-0 left-0 rounded-full blur-3xl" />
        <Image
          width={1000}
          height={800}
          src={"/pictures/edi-insurance.png"}
          alt="Hero graphic of an Iphone showing NoteFlows note summarizer"
          className="relative rounded-3xl max-h-[40rem] justify-self-end max-md:max-h-auto max-md:max-w-[90%] max-md:justify-self-center max-sm:max-w-full"
        />
      </div>
    </div>
  );
}
