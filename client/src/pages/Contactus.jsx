import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {


  return (
    <footer className="bg-gray-300">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
          </div>
        </nav>
        {/* <div className="flex justify-center mt-8 space-x-6">
          <span className="inline-flex justify-center w-full gap-3 m-auto md:justify-start md:w-auto">
            <a className="w-6 h-6 transition fill-black hover:text-blue-500">
              <span className="sr-only">
                github
              </span>
              <ion-icon className="w-5 h-5 md hydrated" name="logo-github" role="img" aria-label="logo github"></ion-icon>
            </a>
            <a className="w-6 h-6 transition fill-black hover:text-blue-500">
              <span className="sr-only">
                twitter
              </span>
              <ion-icon className="w-5 h-5 md hydrated" name="logo-twitter" role="img" aria-label="logo twitter"></ion-icon>
            </a>
            <a className="w-6 h-6 transition fill-black hover:text-blue-500">
              <span className="sr-only">
                Instagram
              </span>
              <ion-icon className="w-5 h-5 md hydrated" name="logo-instagram" role="img" aria-label="logo instagram"></ion-icon>
            </a>
            <a className="w-6 h-6 transition fill-black hover:text-blue-500">
              <span className="sr-only">
                Linkedin
              </span>
              <ion-icon className="w-5 h-5 md hydrated" name="logo-linkedin" role="img" aria-label="logo linkedin"></ion-icon>
            </a>
          </span>
        </div> */}
        <p className="mt-8 text-center">
          <span className="mx-auto mt-2 text-sm text-gray-500">
              Copyright ©
             <span className="text-teal-600 font-semibold">MEDICARE</span>   
          </span>
        </p>
      </div>
    </footer>
  );
};

export default ContactUs;
