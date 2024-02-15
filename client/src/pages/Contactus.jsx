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
