import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import Cookies from "universal-cookie";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user, loggedIn, setUser } = useAuth()

  console.log(user);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  console.log(token)

  useEffect(() => {
    console.log("hello")
  })

  const handleLogout = () => {
    cookies.remove('TOKEN')
    setUser(null)
    navigate('/')
  };

  return (
    <header className="bg-teal-800 py-2 text-neutral-content h-1/4  px-6">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-sm sm:text-sm font-bold text-white">
              Hello, {user.name}
            </p>
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
              to="/doc_register"
              className="link link-hover text-sm sm:text-sm font-bold text-white"
            >
              Be a Doctor
            </Link>
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
