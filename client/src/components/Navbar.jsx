// import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

// import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  // const dispatch = useDispatch();

  // const handleTheme = () => {
  //   dispatch(toggleTheme());
  // };

  return (
    <nav className="bg-teal-50 px-6">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/"
            className="hidden lg:flex btn  text-3xl items-center text-white bg-teal-700 hover:bg-teal-600"
          >
            Medicare
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-teal-50 rounded-box w-52 border border-gray-200 "
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          {/* <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />

            <BsSunFill className="swap-on h-4 w-4" />

            <BsMoonFill className="swap-off h-4 w-4" />
          </label> */}
          {/* CART LINK */}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
