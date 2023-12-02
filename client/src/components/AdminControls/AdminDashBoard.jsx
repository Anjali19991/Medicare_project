// AdminDashBoard.js
import React from 'react';
import { IoMdTime, IoMdPeople, IoMdCheckmark } from 'react-icons/io'; // Assuming IoMdCheckmark is your checkmark icon
import NavbarComponent from './NavBarComponent';



const AdminDashBoard = () => {
    const pendingDoctorRequests = 5;
    const pendingHospitalRequests = 3;
    const approvedDoctorRequests = 80; 
    const approvedHospitalRequests = 40; 
    const totalDoctors = 100;
    const totalHospitals = 50;

    return (
        <div>
            <NavbarComponent />

            <div className="container mx-auto mt-8 p-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">Overview of the Platform</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Pending Requests Card */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center text-gray-800">
                                <IoMdTime size={32} className="mr-4" />
                                Pending Requests
                            </h2>
                            <p className="text-lg text-gray-600">
                                <span className="font-bold">Doctors:</span> {pendingDoctorRequests}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-bold">Hospitals:</span> {pendingHospitalRequests}
                            </p>
                        </div>
                    </div>

                    {/* Approved Requests Card */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center text-gray-800">
                                <IoMdCheckmark size={32} className="mr-4" />
                                Approved Requests
                            </h2>
                            <p className="text-lg text-gray-600">
                                <span className="font-bold">Doctors:</span> {approvedDoctorRequests}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-bold">Hospitals:</span> {approvedHospitalRequests}
                            </p>
                        </div>
                    </div>

                    {/* Total Counts Card */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center text-gray-800">
                                <IoMdPeople size={32} className="mr-4" />
                                Total Counts
                            </h2>
                            <p className="text-lg text-gray-600">
                                <span className="font-bold">Doctors:</span> {totalDoctors}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-bold">Hospitals:</span> {totalHospitals}
                            </p>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;
