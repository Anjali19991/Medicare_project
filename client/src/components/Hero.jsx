import hero1 from "../assets/hero_3.jpg";
import hero2 from "../assets/hero_2.jpg";
import hero3 from "../assets/hero_1.jpg";
import hero4 from "../assets/hero_4.jpg";
import Services from "./Services";
import { Contact } from "../pages";
import React, { useState, useEffect } from "react";

const Hero = () => {

  const [imageIndex, setImageIndex] = useState(0);
  const carouselImages = [hero2, hero3, hero4, hero1];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [carouselImages.length]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-24 items-center ">
          <div>
            <h1 className="max-w-2xl text-4xl font-bold text-teal-800 tracking-tight sm:text-6xl">
              We are changing the way people live...
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-grey-800">
              Prioritize well-being with exceptional healthcare. Refuse
              compromise, embrace personalized treatments. Choose vitality,
              longevity, and proactive well-being. Invest in yourself—discover
              transformative healthcare today.
            </p>
          </div>
          <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 rounded-bo">
            {/* {carouselImages.map((image) => {
              return (
                <div key={image} className="carousel-item">
                  <img
                    src={image}
                    className="rounded-box h-full w-90 object-cover"
                  />
                </div>
              );
            })} */}
          <img
            className="object-cover object-center w-full bg-gray-300 rounded-md transition duration-500 ease-in-out"
            src={carouselImages[imageIndex]}
            alt=""
          /> 
          </div>
        </div>

        <Services></Services>
      </div>
      <Contact></Contact>
    </>
  );
};
export default Hero;
