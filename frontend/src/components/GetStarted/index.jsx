import { CircleCheck, Dot } from "lucide-react";

export default function GetStarted() {
  return (
    <section className="text-[#0B2B5F]">
      <div className="text-[#0B2B5F] relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />

        <h2 className="mb-4 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Get started in 4 Easy Steps <br />
        </h2>
        <h2 className="text-center">Every apartment search, every landlord reply. Every client action preserved forever in excel. Finally, a platform designed for provides for providers</h2>
      </div>
      
      <div className="text-[#0B2B5F]relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <figure className="max-w-2xl">
            <img
              className="max-h-[25rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/step1.png"}
              alt="Smart Organization graphic"
            />
          </figure>
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="mb-8 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Step 1
            </p>
            <div className="gap-6 ">
                <p className="mt-2">Sign Up In Minutes </p>
                <p className="mt-2">Create your Account ans start setting up in under 5 Minutes </p>
            </div>
          </div>
        </div>

        <div className="bg-primary-1300 absolute left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />        
        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="mb-8 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Step 2
            </p>
            <div className="gap-6 ">
                <p className="mt-2">Explore Full Access </p>
                <p className="mt-2">Unlock All Premium Features with a 7-day Free Trial--no credit card required.</p>
            </div>
          </div>
          <figure className="max-w-2xl">
            <img
              className="max-h-[25rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/step2.png"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>

         <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <figure className="max-w-2xl">
            <img
              className="max-h-[25rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/step3.png"}
              alt="Smart Organization graphic"
            />
          </figure>
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="mb-8 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Step 3
            </p>
            <div className="gap-6 ">
                <p className="mt-2">Choose YOur Plan </p>
                <p className="mt-2">Pick the subscription that best fits your workflow after the trial. </p>
            </div>
          </div>
        </div>

         <div className="bg-primary-1300 absolute left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />        
        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="mb-8 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Step 4
            </p>
            <div className="gap-6 ">
                <p className="mt-2">Add What You Need </p>
                <p className="mt-2">Customize your plan with optional add-ons--straightforward and trasparent pricing.</p>
            </div>
          </div>
          <figure className="max-w-2xl">
            <img
              className="max-h-[25rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/step4.png"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>
      </div>
      
       <div className="flex justify-center items-center flex-col p-2 max-xl:p-4">
        <button className="bg-[#0B2B5F] text-white rounded-2xl p-4 px-16 text-xl cursor-pointer">
            Try It for free
        </button>
      </div>
    </section>
  );
}
