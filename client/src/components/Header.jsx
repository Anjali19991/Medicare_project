import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import Cookies from "universal-cookie";
import { PiUserCircleLight } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";



const Header = () => {
  const navigate = useNavigate();
  
  const { user,  setUser } = useAuth()

  console.log(user);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  console.log(token)

 

  const handleLogout = () => {
    cookies.remove('TOKEN')
    setUser(null)
    navigate('/')
  };
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (user && user.photo) {
          const imageData = new Uint8Array(user.photo.data.data);
          const blob = new Blob([imageData], { type: user.photo.contentType });

          const reader = new FileReader();

          reader.onload = () => {
            const base64Image = reader.result;
            // Ensure photoUrl is different before updating to avoid infinite loop
            if (base64Image !== photoUrl) {
              setPhotoUrl(base64Image);
            }
          };

          reader.readAsDataURL(blob);
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    fetchPhoto();
  }, [user, photoUrl]);






  return (
    <header className="bg-teal-800 py-2 text-neutral-content h-1/4  px-6">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
           
            <Link to='/profile' className="text-3xl text-white">
              {photoUrl ? (
                <img src={photoUrl} className='rounded-full w-10 h-10' alt='profile-pic' />
              ) : (
                <PiUserCircleLight className='w-10 h-10' />
              )}
            </Link>
            <button
              className="text-xl hover:bg-gray-50 hover:text-teal-800 px-2 py-2 text-white-800 font-semibold rounded shadow"
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
              Become a Doctor
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
