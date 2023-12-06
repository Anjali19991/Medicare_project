import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const mystyle = {
    boxShadow: "2px 2px 5px black",
  };
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px] mt-9">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-4xl font-bold  text-teal-800">
                Our Services
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">

                Explore our cutting-edge services designed to elevate your well-being. We've enhanced and expanded our offerings to bring you the latest in healthcare, ensuring you receive the best support for a healthier and happier life.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            className={`{mystyle} text-teal-800`}
            title="List Hospitals"
            details="View a list of approved hospitals"
            linkTag={'/display-hospitals'}

          />

          <ServiceCard
            className={`{mystyle} text-teal-800`}
            title=" Doctor Registration"
            details="Become a part of our family to provide services"
            linkTag={'/doc_register'}

          />

          <ServiceCard
            title="Consult Doctors"
            details="We are here to help you out!!"
            linkTag={'/consultdoctor'}
            className="text-teal-800"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

const ServiceCard = ({ icon, title, details, linkTag }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
          <Link to={`${linkTag}`}>
            <h4 className="mb-[14px] text-2xl font-semibold text-dark ">
              {title}
            </h4>
          </Link>

          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};
