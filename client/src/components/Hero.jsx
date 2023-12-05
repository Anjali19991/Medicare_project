import { Link } from "react-router-dom";

import hero1 from "../assets/hero_3.jpg";
import hero2 from "../assets/hero_2.jpg";
import hero3 from "../assets/hero_1.jpg";
import hero4 from "../assets/hero_4.jpg";
import Services from "./Services";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            We are changing the way people live
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Prioritize well-being with exceptional healthcare. Refuse
            compromise, embrace personalized treatments. Choose vitality,
            longevity, and proactive well-being. Invest in yourself—discover
            transformative healthcare today.
          </p>
        </div>
        <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box ">
          {carouselImages.map((image) => {
            return (
              <div key={image} className="carousel-item">
                <img
                  src={image}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      <Services></Services>
    </>
  );
};
export default Hero;
