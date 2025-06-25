import React from "react";

const OurOffering = () => {
  return (
    <section className="pb-4 lg:pb-[10px] lg:pt-[10px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-4 max-w-[510px] text-center lg:mb-8">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Services
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-[#004434] ">
              Choose Nuviane for a compliant, efficient, and client-focused solution to manage Housing Stabilization Services effectively for just $299/month.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Searching for Properties"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
          />
        </div>
      </div>
    </section>
  );
};

export default OurOffering;

const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] p-10 shadow-2 hover:shadow-lg md:px-7 xl:px-10">
          <h4 className="mb-[14px] text-2xl font-semibold text-dark ">
            {title}
          </h4>
          <p className="text-[#004434] ">{details}</p>
        </div>
      </div>
    </>
  );
};
