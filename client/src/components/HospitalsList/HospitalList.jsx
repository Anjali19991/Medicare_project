import React, { useState, useEffect } from 'react';
import { GiHospital } from 'react-icons/gi';
import { IoIosPin, IoIosCall, IoMdMail, IoIosPeople } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import 'tailwindcss/tailwind.css';

const HospitalList = () => {
    const [approvedHospitals, setApprovedHospitals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/hospitals?status=approved')
            .then((res) => res.json())
            .then((data) => {
                setApprovedHospitals(data);
            })
            .catch((err) => console.log('Error', err));
    }, []);

    return (
        <div className="flex flex-wrap justify-center p-14">
            {approvedHospitals.map((hospital) => (
                <div key={hospital.id} className="max-w-md mx-4 mb-8 bg-white p-14 rounded-md shadow-lg font-sans">

                    <img
                        src={'/hosp.jpg'} 
                        alt={hospital.hospitalName}
                        className="mb-4 rounded-md w-full h-40 object-cover"
                    />
                    <div className="flex items-center mb-4">
                        <GiHospital className="text-teal-800 text-lg mr-2" />
                        <h2 className="text-xl font-semibold text-teal-800">{hospital.hospitalName}</h2>
                    </div>

                    <div className="flex items-center mb-2">
                        <IoIosPin className="text-teal-700 text-lg mr-2" />
                        <p className="text-teal-700">{hospital.location}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <IoIosCall className="text-teal-700 text-lg mr-2" />
                        <p className="text-teal-700">{hospital.contactNumber}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <IoMdMail className="text-teal-700 text-lg mr-2" />
                        <p className="text-teal-700">{hospital.email}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <IoIosPeople className="text-teal-700 text-lg mr-2" />
                        <p className="text-teal-700 font-semibold">Doctors: {hospital.numDoctors}</p>
                    </div>
                    <div className="flex justify-end">
                        <IoMdCheckmark className="text-teal-700 text-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HospitalList;
