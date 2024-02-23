import { Link } from "react-router-dom";

const ContactUs = () => {


  return (
    <footer className="bg-slate-600">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-300 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/consultdoctor" className="text-sm text-gray-300 hover:text-blue-600">
              Consult Doctor
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/buymedicines" className="text-sm text-gray-300 hover:text-blue-600">
              Medistore
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/about" className="text-sm text-gray-300 hover:text-blue-600">
              About
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-300 hover:text-blue-600">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/" className="text-sm text-gray-300 hover:text-blue-600">
              Home
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center">
          <span className="mx-auto flex items-center justify-center mt-2 text-sm text-gray-300">
              Copyright ©
             <span className="text-teal-600 font-semibold">
              <img src="MEDICARE-logos_white.png" alt="" className="mx-2 w-32" />  
            </span>   
          </span>
        </p>
      </div>
    </footer>
  );
};

export default ContactUs;
