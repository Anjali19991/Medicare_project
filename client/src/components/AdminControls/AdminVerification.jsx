import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminVerification = () => {
    const [registrationHospitals, setRegistrationHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin-verification');
                setRegistrationHospitals(response.data.RegistrationHospitals);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    const handleApproval = (hospitalId) => {
        // You can send a request to the server to update the approval status
        // For simplicity, let's just update the local state
        setRegistrationHospitals((prevHospitals) =>
            prevHospitals.map((hospital) =>
                hospital._id === hospitalId
                    ? { ...hospital, approved: true }
                    : hospital
            )
        );
    };

    const handleRejection = (hospitalId) => {
        // Similar to handleApproval, you can send a request to update the rejection status
        setRegistrationHospitals((prevHospitals) =>
            prevHospitals.map((hospital) =>
                hospital._id === hospitalId
                    ? { ...hospital, rejected: true }
                    : hospital
            )
        );
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Admin Verification Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registrationHospitals.map((hospital) => (
                    <div key={hospital._id} className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-lg font-semibold mb-2">{hospital.name}</h2>
                        <p className="text-gray-600 mb-2">{hospital.address}</p>
                        <p className="text-gray-600 mb-4">{hospital.email}</p>
                        {!hospital.approved && !hospital.rejected && (
                            <div className="flex justify-between">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleApproval(hospital._id)}
                                >
                                    <FaCheck className="inline mr-2" />
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleRejection(hospital._id)}
                                >
                                    <FaTimes className="inline mr-2" />
                                    Reject
                                </button>
                            </div>
                        )}
                        {hospital.approved && (
                            <p className="text-green-500 font-semibold mt-2">Approved</p>
                        )}
                        {hospital.rejected && (
                            <p className="text-red-500 font-semibold mt-2">Rejected</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminVerification;
