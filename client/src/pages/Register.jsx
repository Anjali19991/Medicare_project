import { useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [UserNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(value)) {
      setUserNameError("Name should only contain alphabets and spaces.");
      return false;
    } else {
      setUserNameError("");
      return true;
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address (e.g  jonh@gmail.com)");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    const isValidPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        password
      );

    if (!isValidPassword) {
      setPasswordError(
        "Password must contain at least 6 characters with one uppercase letter, one number, and one special character."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };


  const registerUser = async (e) => {
    e.preventDefault();
    try {

      // Validate name, email, and password
      const isNameValid = validateName(name);
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword();

      // If any validation fails, display toast and return
      if (!isNameValid || !isEmailValid || !isPasswordValid || confirmPassword !== password) {
        toast.error("Please fix the validation errors before submitting.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "patient");
      formData.append("photo", selectedImage);
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex items-center min-h-[82vh]">
      <div className="flex-1 h-full max-w-2xl mx-auto bg-zinc-100 rounded-lg shadow-xl">
        <div className="flex items-center justify-center p-6 sm:p-12">
          <form
            className="w-full"
            onSubmit={(e) => registerUser(e)}
            encType="multipart/form-data"
          >
            <h3 className="mb-4 text-2xl font-bold text-teal-600">Sign up</h3>
            <div className="mt-4 mb-4">
              <div className="flex items-center border-b-2 border-teal-500 py-2">
                <FaUser className="text-teal-500 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${
                    UserNameError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Username"
                />
              </div>
              {UserNameError && (
                <p className="text-red-500 text-sm mt-1">{UserNameError}</p>
              )}
            </div>

            <div className="mt-4 mb-4">
              <div className="flex items-center border-b-2 border-teal-500 py-2">
                <FaEnvelope className="text-teal-500 mr-2" />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Email"
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mt-4 mb-4">
              <div className="flex items-center border-b-2 border-teal-500 py-2 relative">
                <FaLock className="text-teal-500 mr-2" />
                <input
                  className={`px-4 py-3 rounded-md flex-1 ${passwordError ? "border-red-500" : ""
                    }`}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="text-teal-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="text-teal-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div className="mt-4 mb-4">
              <div className="flex items-center border-b-2 border-teal-500 py-2 relative">
                <FaLock className="text-teal-500 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600 ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm Password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="text-teal-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="text-teal-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="mt-4 mb-4">
              <label className="block text-sm my-2">Profile Picture</label>
              <input
                type="file"
                name="photo"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log('Selected Image:', file);
                  setSelectedImage(file);
                }}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                type="submit"
              >
                Register
              </button>
            </div>
            <p className="text-center p-3" >
              Already have an account?
              <Link
                to="/login"
                className="ml-2 link link-hover link-primary capitalize"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
