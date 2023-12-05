import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
    queryClient.removeQueries();
  };

  return (
    <header className="bg-teal-800 py-2 text-neutral-content h-1/4  px-6">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-sm sm:text-sm font-bold text-white">
              Hello, {user.username}
            </p>
            {/* <button
              className="btn btn-sm btn-outline btn-primary font-bold"
              onClick={handleLogout}
            >
              logout
            </button> */}
            <button
              className="bg-white hover:bg-gray-100 text-teal-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link
              to="/login"
              className="link link-hover text-sm sm:text-sm font-bold text-white"
            >
              Sign in / Guest
            </Link>
            <Link
              to="/register"
              className="link link-hover text-sm sm:text-sm font-bold text-white"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
