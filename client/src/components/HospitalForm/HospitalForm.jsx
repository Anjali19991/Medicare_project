import React, { useState } from 'react';
import { IoMdCheckmark, IoIosPin, IoIosCall, IoMdMail, IoIosPeople } from 'react-icons/io';
import { GiHospital } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeLayout } from '../../pages';

const HospitalForm = () => {


    const [errors, setErrors] = useState({
        hospitalName: '',
        location: '',
        contactNumber: '',
        email: '',
        numDoctors: '',
    });

    const showToast = (message, type) => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const [hospitalName, setHospitalName] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [numDoctors, setNumDoctors] = useState('');

    const handleNameChange = (e) => {
        setHospitalName(e.target.value);
    };

    const locationChange = (e) => {
        setLocation(e.target.value);
    };

    const contactChange = (e) => {
        setContactNumber(e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };

    const numDoctorsChange = (e) => {
        setNumDoctors(e.target.value);
    };

    const validate = (data) => {
        for (const item in data) {

            if (data[item] != null) {
                const value = typeof data[item] !== 'string' ? String(data[item]) : data[item];
                if (value.trim().length === 0) {
                    showToast(`${item} can't be empty`, 'error');
                    return false;
                }
            }
        }
        return true;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const details = {
            hospitalName,
            location,
            contactNumber,
            email,
            numDoctors,
            timestamp: Date.now(),
            status: 'pending'
        };

        if (validate(details)) {
            fetch('http://localhost:3001/hospitals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details),
            })
                .then((res) => res.json())
                .then((data) => {
                    
                    console.log('Data submitted successfully:', data);
                    showToast('Hospital registeration request success, wait for the approval!', 'success');
                  
                    e.target.reset();


                })
                .catch((err) => {
                    console.log('Error', err);
                    showToast('Error submitting data', 'error');
                });
        }
    };

    return (
        <>
    
        {/* <HomeLayout className="-mt-24"/> */}

        <div className="bg-white flex mt-10 justify-center ">
            <div className="w-full max-w-md p-8 bg-teal-50 shadow-lg rounded-md flex flex-col items-center">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-6 text-teal-800">Hospital Registration Form</h1>

                    <div className="flex items-center mb-1">
                        <GiHospital className="text-teal-700 text-lg mr-2" />
                        <label htmlFor="hospitalName" className="block text-teal-700 text-sm font-bold">Hospital Name:</label>
                    </div>
                    <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        pattern="[A-Za-z0-9\s,:]+"
                        title="Please enter alphabetic characters, spaces, full stops, apostrophes, and hyphens only"
                        required
                        className={`w-full p-2 border mb-2 border-teal-300 rounded-md focus:outline-none focus:border-teal-500 ${errors.hospitalName ? 'border-red-500' : ''
                            }`}
                        onChange={handleNameChange}
                    />
                    {errors.hospitalName && <span className="text-red-500 text-sm">{errors.hospitalName}</span>}

                    <div className="flex items-center mb-2">
                        <IoIosPin className="text-teal-700 text-lg mr-2" />
                        <label htmlFor="location" className="block text-teal-700 text-sm font-bold">Location:</label>
                    </div>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        pattern="[A-Za-z0-9\s,:]+"
                        title="Please enter a valid address including alphabetic characters, digits, spaces, commas, and colons"
                        required
                        className={`w-full p-2 mb-2 border border-teal-300 rounded-md focus:outline-none focus:border-teal-500 ${errors.location ? 'border-red-500' : ''
                            }`}
                        onChange={locationChange}
                    />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}

                    <div className="flex items-center mb-2">
                        <IoIosCall className="text-teal-700 text-lg mr-2" />
                        <label htmlFor="contactNumber" className="block text-teal-700 text-sm font-bold">Contact Number:</label>
                    </div>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                        required
                        className={`w-full p-2 mb-2 border border-teal-300 rounded-md focus:outline-none focus:border-teal-500 ${errors.contactNumber ? 'border-red-500' : ''
                            }`}
                        onChange={contactChange}
                    />
                    {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber}</span>}

                    <div className="flex items-center mb-2">
                        <IoMdMail className="text-teal-700 text-lg mr-2" />
                        <label htmlFor="email" className="block text-teal-700 text-sm font-bold">Email:</label>
                    </div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={`w-full p-2 mb-2 border border-teal-300 rounded-md focus:outline-none focus:border-teal-500 ${errors.email ? 'border-red-500' : ''
                            }`}
                        onChange={emailChange}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                    <div className="flex items-center mb-2">
                        <IoIosPeople className="text-teal-700 text-lg mr-2" />
                        <label htmlFor="numDoctors" className="block text-teal-700 text-sm font-bold">Number of Doctors:</label>
                    </div>
                    <input
                        type="number"
                        id="numDoctors"
                        name="numDoctors"
                        pattern="^[1-9]\d*$"
                        title="Please enter a valid number of doctors (greater than 0)"
                        required
                        className={`w-full p-2 border border-teal-300 rounded-md focus:outline-none focus:border-teal-500 ${errors.numDoctors ? 'border-red-500' : ''
                            }`}
                        onChange={numDoctorsChange}
                    />
                    {errors.numDoctors && <span className="text-red-500 text-sm">{errors.numDoctors}</span>}

                    <button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full mt-4 flex items-center justify-center"
                    >
                        Register <IoMdCheckmark className="ml-2" />
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
        </>
    );
};

export default HospitalForm;