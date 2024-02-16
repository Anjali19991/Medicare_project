import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

export const DoctorRegister = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    qualification: '',
    phone: '',
    photo: null,
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      photo: file,
    }));
  };

  const registerDoctor = async () => {
    try {
      if (doctor.password !== doctor.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const formData = new FormData();
      formData.append('name', doctor.name);
      formData.append('email', doctor.email);
      formData.append('password', doctor.password);
      formData.append('role', 'doctor');
      formData.append('specialization', doctor.specialization);
      formData.append('qualification', doctor.qualification);
      formData.append('phone', doctor.phone);
      formData.append('photo', doctor.photo);

      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        body: formData,
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
          <div className="w-full">
            <h3 className="mb-4 text-2xl font-bold text-teal-600">Sign up</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label className="block text-sm my-2">Username</label>
                <input
                  type="text"
                  name="name"
                  value={doctor.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter Username"
                />
              </div>
              <div className="">
                <label className="block text-sm my-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter Email"
                />
              </div>
              <div className="">
                <label htmlFor="specialization" className="text-sm">
                  Specialization
                </label>
                <select
                  className="px-4 py-2 rounded-md w-full mt-2 max-[600px]:w-full outline-none"
                  onChange={handleChange}
                  name="specialization"
                  required
                >
                  <option value="" defaultValue>Specialization</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Radiology">Radiology</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Family Medicine">Family Medicine</option>
                  <option value="Chest Medicine">Chest Medicine</option>
                  <option value="Anesthesia">Anesthesia</option>
                  <option value="Pathology">Pathology</option>
                  <option value="ENT">ENT</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="qualifications" className="text-sm">
                  Qualification
                </label>
                <select
                  className="px-4 py-2 rounded-md w-full mt-2 max-[600px]:w-full outline-none"
                  onChange={handleChange}
                  name="qualification"
                  required
                >
                  <option value="" defaultValue>Qualification</option>
                  <option value="RMP">RMP</option>
                  <option value="MBBS">MBBS</option>
                  <option value="MS">MS</option>
                  <option value="MD">MD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="">
                <label className="block text-sm my-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={doctor.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter Password"
                />
              </div>
              <div className="">
                <label className="block text-sm my-2"> Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={doctor.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="">
                <label className="block text-sm my-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={doctor.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="">
                <label className="block text-sm my-2">Profile Picture</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 text-sm border rounded-md focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button
                className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={registerDoctor}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
