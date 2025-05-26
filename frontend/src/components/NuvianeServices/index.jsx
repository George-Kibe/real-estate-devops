import { CircleCheck } from "lucide-react";

export default function NuvianeServices() {
  return (
    <section className="overflow-hidden text-black bg-repeat">
      <div className="text-primary-50 relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />

        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          The only Housing Software That Remembers Eveything <br />
        </h2>
        <h2 className="text-center mb-4 md:mb-8">Every apartment search, every landlord reply. Every client action preserved forever in excel. Finally, a platform designed for provides for providers</h2>
        
        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-self-end max-md:row-start-1 max-md:max-w-max justify-around">
            <p className="mb-8 flex text-2xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-3xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Built for real Housing Workflows
            </p>
            <div className="">
                <p className="flex font-semibold mb-4 "><CircleCheck className="mr-2 bg-green-600 rounded-full text-white" />
                Lifetime Excel Records</p>
                <p className="text-primary-100 z-1 pl-6 font-light max-xl:text-lg/8 max-lg:text-base/loose">
                Track every search, interaction, landlord reply and follow up. All data is exportable to excel for reports, audits or performance reviews-forever
                </p>
            </div>
            <div className="">
                <p className="flex font-semibold mb-4 "><CircleCheck className="mr-2 bg-green-600 rounded-full text-white" />
                Smart Apartment Search & Tracker</p>
                <p className="text-primary-100 z-1 pl-6 font-light max-xl:text-lg/8 max-lg:text-base/loose">
                Track every search, interaction, landlord reply and follow up. All data is exportable to excel for reports, audits or performance reviews-forever
                </p>
            </div>
          </div>
          <figure className="max-w-2xl">
            <img
              className="max-h-[45rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/girl-tracking.png"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>

        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <figure className="max-w-2xl">
            <img
              className="max-h-[45rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/hss-tracking.png"}
              alt="Smart Organization graphic"
            />
          </figure>
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-self-end max-md:row-start-1 max-md:max-w-max justify-around">
            <div className="">
                <p className="flex font-semibold mb-4 "><CircleCheck className="mr-2 bg-green-600 rounded-full text-white" />
                Supervisor insights and Staff Monitoring</p>
                <p className="text-primary-100 z-1 pl-6 font-light max-xl:text-lg/8 max-lg:text-base/loose">
                View unit availability, lease status, contact history, and waiting lists in one place. stop repeating work---Nuviane filters and organizes it all. 
                </p>
            </div>
            <div className="">
                <p className="flex font-semibold mb-4 "><CircleCheck className="mr-2 bg-green-600 rounded-full text-white" />
                real time Client Activity Log</p>
                <p className="text-primary-100 z-1 pl-6 font-light max-xl:text-lg/8 max-lg:text-base/loose">
                Monitor every client interaction--calls, emails, and notes--time-stamped and linked to landlord responses. nothing slips through the cracks. 
                </p>
            </div>
            <div className="">
                <p className="flex font-semibold mb-4 "><CircleCheck className="mr-2 bg-green-600 rounded-full text-white" />
                Supervisor insights and Staff Monitoring</p>
                <p className="text-primary-100 z-1 pl-6 font-light max-xl:text-lg/8 max-lg:text-base/loose">
                Visual dashboards let supervisors instatntly spot missed steps, workload imbalances, or client delays--with drill-driven views per team member. 
                </p>
            </div>
            <div className="">
                <p className="flex font-semibold mb-4 "><CircleCheck className="mr-2 bg-green-600 rounded-full text-white" />
                Automated Notes & Reminders</p>
                <p className="text-primary-100 z-1 pl-6 font-light max-xl:text-lg/8 max-lg:text-base/loose">
                Nuviane logs every update and sends custom reminders for follow-ups, appointments, or housing deadline--directly within client profiles. 
                </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col p-2 max-xl:p-4">
        <button className="bg-[#0B2B5F] text-white rounded-2xl p-4 px-16 text-xl cursor-pointer">
            Try for free
        </button>
      </div>

      <div className="mt-4 md:mt-16 mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-self-end max-md:row-start-1 max-md:max-w-max justify-around">
            <p className="mb-8  text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
              Apartment Tracking  & Record Keeping made Easy
            </p>
            <p className="">
                Easily manage available housing units, track lease statuses and maintain client housing preferences.
            </p>
            <div className="">
              <button className="bg-[#0B2B5F] text-white rounded-2xl p-4 px-16 text-xl cursor-pointer">
                Schedule a Demo
              </button>
            </div>
          </div>
          <figure className="max-w-2xl">
            <img
              className="max-h-[45rem] max-md:max-w-[90%] max-md:justify-self-center"
              src={"/pictures/girl-tracking.png"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>
    </section>
  );
}
