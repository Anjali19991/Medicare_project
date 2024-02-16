import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', 'patient');
      formData.append('photo', selectedImage);
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        body:formData
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ name, email, password, role: 'patient', photo: selectedImage }),
      });

      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex items-center min-h-[82vh] ">
      <div className="flex-1 h-full max-w-2xl mx-auto bg-zinc-100 rounded-lg shadow-xl">
        <div className="flex items-center justify-center p-6 sm:p-12">
          <form className="w-full" onSubmit={(e) => registerUser(e)} encType="multipart/form-data">
            <h3 className="mb-4 text-2xl font-bold text-teal-600">Sign up</h3>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2">Username</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter Username"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter Email"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2"> Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Enter Password"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm my-2"> Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Confirm Password"
              />
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button
                className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                type='submit'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
