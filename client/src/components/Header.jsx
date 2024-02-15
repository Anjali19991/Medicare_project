import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import Cookies from "universal-cookie";
import { PiUserCircleLight } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";



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
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (user && user.photo) {
      const imageData = new Uint8Array(user.photo.data.data);
      const base64Image = `data:${user.photo.contentType};base64,${btoa(String.fromCharCode.apply(null, imageData))}`;
      setPhotoUrl(base64Image);
      console.log(photoUrl);
    }
  }, [user])

  return (
    <header className="bg-teal-800 py-2 text-neutral-content h-1/4  px-6">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            {/* <p className="text-sm sm:text-sm font-bold text-white">
              Hello, {user.name}
            </p> */}
            <Link to='/profile' className="text-3xl text-white">
              {photoUrl ? (
                <img src={photoUrl} className='rounded-full w-10 h-10' alt='profile-pic' />
              ) : (
                <PiUserCircleLight className='w-10 h-10' />
              )}
            </Link>
            <button
              className="text-xl hover:bg-gray-100 px-2 py-2 text-white-800 font-semibold rounded shadow "
              onClick={handleLogout}
            >
              <FiLogOut />
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
