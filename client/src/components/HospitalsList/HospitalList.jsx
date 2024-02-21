import  { useState, useEffect } from 'react';
import { GiHospital } from 'react-icons/gi';
import { IoIosPin, IoIosCall, IoMdMail, IoIosPeople } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import 'tailwindcss/tailwind.css';
import { HomeLayout } from '../../pages';

const HospitalList = () => {
    const [approvedHospitals, setApprovedHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/hospitals?status=approved')
            .then((res) => res.json())
            .then((data) => {
                setApprovedHospitals(data);
            })
            .catch((err) => console.log('Error', err));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredHospitals = approvedHospitals.filter((hospital) =>
        hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* <HomeLayout /> */}
            <div className="flex flex-col min-h-screen justify-center p-14 text-center">
                <div className="mb-4 ">
                    <input
                        type="text"
                        placeholder="Search hospitals..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded-md w-1/2 mb-10 -mt-12"
                    />
                </div>
                <div className='flex flex-row'>
                {filteredHospitals.map((hospital) => (
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
            </div>
        </>
    );
};

export default HospitalList;
