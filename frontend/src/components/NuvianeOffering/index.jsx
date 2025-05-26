import { ArrowRight, Ban, CircleCheck, CircleX, Diamond } from "lucide-react";

const features = [
    { id: 1, title: "Medicaid-First, HCBS-Centric Design", description: "Custom-built for Housing stabalization services, PCA, Waivers, and group Homes"},
    { id: 2, title: "Built-In Compliance Engine", description: "Detect Issues before submission. Stay audit ready with real-time tracking and document"},
    { id: 3, title: "Real time staff Metrics & Dashboards", description: "Track interactions, note quality, client communication, and housing search efforts for every staff member"},
    { id: 4, title: "Fast, Transparent Billing with no Guesswork", description: "submit claims, monitor payment status, amnd attach documentation--all in one place"},
    { id: 5, title: "Simple, Transparent Pricing", description: "No contracts. No setup fees. just results and real time support. "},
]

const services = [
    { id: 1, name: "Housing stabalization Providers"},
    { id: 2, name: "Home Health and PCA Agencies"},
    { id: 3, name: "Adult Day Services"},
    { id: 4, name: "Waiver case Management & Group Home Operators"},
]

export default function NuvianeOffering() {
  return (
    <section className="text-black">
      <div className="text-primary-50 relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />        
        
        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="mb-8 flex items-center text-2xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-3xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              <Ban className="mr-2 font-bold text-red-500" /> What other Platforms Miss
            </p>
            <div className="">
              <p className="flex font-semibold mb-4 ">
                <CircleX className="mr-2 bg-red-500 rounded-full text-white" />
                One-size-fits-all systems that don't support HCBS workflows
              </p>
              <p className="flex font-semibold mb-4 ">
                <CircleX className="mr-2 bg-red-500 rounded-full text-white" />
                Real time view of staff performance or care outcomes
              </p>
              <p className="flex font-semibold mb-4 ">
                <CircleX className="mr-2 bg-red-500 rounded-full text-white" />
                limited support for housing stabalization or waiver documentation
              </p>
              <p className="flex font-semibold mb-4 ">
                <CircleX className="mr-2 bg-red-500 rounded-full text-white" />
                Clunky, outdated tools that slow down your team
              </p>
              <p className="flex font-semibold mb-4 ">
                <CircleX className="mr-2 bg-red-500 rounded-full text-white" />
                Hidden fees, contracts, and vendor lock-in
              </p>
            </div>
          </div>
          <figure className="max-w-2xl">
            <img
              className="max-h-[45rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/insurance-dashboard.png"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>
      </div>
      <h2 className="text-primary-50 mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-6 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-md:mb-4 max-md:text-left max-sm:text-3xl/9 max-sm:tracking-tighter">
          What Makes Nuviane Different?
      </h2>
        
      <div className="mb-8 p-4 md:px-16">
        {features.map((feature) => (
            <div key={feature.id} className="mt-4 rounded-md flex gap-2 bg-gray-200 p-4">
                <div className="">
                    <Diamond className="bg-[#0B2B5F] text-white w-8 h-8 rounded-full"/>
                </div>
                <div className="">
                    <p className="font-bold md:text-xl">{feature.title}</p>
                    <p className="mt-2 text-xs md:text-sm">{feature.description}</p>
                </div>
            </div>
        ))
      }
      </div>

      <div className="flex items-center flex-col mb-8">
        <h2 className="text-primary-50 mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-6 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-md:mb-4 max-md:text-left max-sm:text-3xl/9 max-sm:tracking-tighter">
          Ideal For
        </h2>
        <div className="flex gap-8 max-w-2xl flex-row flex-wrap mb-8">
            {
                services.map((service) => (
                    <div key={service.id} className="bg-[#EEF4FE] p-2 rounded-2xl">
                        <p className="font-semibold px-4">{service.name}</p>
                    </div>
                ))
            }
        </div>
      </div>

      <div className="flex p-4 md:p-16 flex-col bg-[#0B2B5F] text-white w-screen items-center">
        <h2 className="text-primary-50 mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-6 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-md:mb-4 max-md:text-left max-sm:text-3xl/9 max-sm:tracking-tighter">
          Smart Billing. Real Compliance. Faster Cash Flow. 
        </h2>
        <p className="text-primary-100 mb-10 text-xl/loose font-light max-xl:mb-8 max-xl:text-lg/8 max-lg:text-base/loose">
          Let's simplify your agency's operations--with technology made for your world.
        </p>

        <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-24">
          <div className="">
            <button
                className="text-primary-1300 bg-white border-primary-500 hover:border-primary-50 hover:bg-primary-50 transition-properties primary-glow-hover primary-glow group flex cursor-pointer items-center gap-x-3 rounded-2xl border-2 px-8 py-3.5 max-xl:gap-x-2 max-xl:px-6 max-xl:py-3"
                >
                <p className="text-lg/8 text-black">Schedule A Free Demo</p>
                <div className="w-5 max-xl:w-4 max-sm:hidden">
                    <ArrowRight
                    alt="Arrow right icon"
                    className="stroke-primary-1300 inline w-5 max-xl:w-4"
                    width={2}
                    />
                </div>
            </button>
          </div>
          <div className="">
            <button
                className="text-primary-1300 bg-primary-500 border-primary-500 hover:border-primary-50 hover:bg-primary-50 transition-properties primary-glow-hover primary-glow group flex cursor-pointer items-center gap-x-3 rounded-2xl border-2 px-8 py-3.5 max-xl:gap-x-2 max-xl:px-6 max-xl:py-3"
                >
                <p className="text-lg/8 max-xl:text-base/loose">Get Started Today</p>
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

    </section>
  );
}
