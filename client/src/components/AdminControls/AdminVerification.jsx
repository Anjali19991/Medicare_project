import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdVerifiedUser, MdClose, MdHourglassFull } from 'react-icons/md';
import NavBarComponent from './NavBarComponent';

const fetchHospitalRequests = async (status) => {
    try {
        const url = status === 'all' ? 'http://localhost:3001/hospitals' : `http://localhost:3001/hospitals?status=${status}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching hospital requests:', error);
        throw error;
    }
};

const updateRequestStatus = async (id, status) => {
    try {
        const response = await fetch(`http://localhost:3001/hospitals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (response.ok) {
            console.log(`Hospital request with ID ${id} ${status.toLowerCase()} successfully.`);
        } else {
            console.error(`Failed to update status for hospital request with ID ${id}:`, response.statusText);
        }
    } catch (error) {
        console.error(`Error updating status for hospital request with ID ${id}:`, error);
        throw error;
    }
};

const AdminVerificationPage = () => {
    const [hospitalRequests, setHospitalRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHospitalRequests(filterStatus);
                setHospitalRequests(data);
            } catch (error) {
                console.error('Error fetching hospital requests:', error);
            }
        };

        fetchData();
    }, [filterStatus]);

    const showToast = (message, type) => {
        // You can implement your own toast notification using libraries like react-toastify
        console.log(`${type}: ${message}`);
    };

    const handleApprove = async (id) => {
        try {
            await updateRequestStatus(id, 'approved');
            setHospitalRequests((prevRequests) =>
                prevRequests.map((request) => ({
                    ...request,
                    status: request.id === id ? 'approved' : request.status,
                }))
            );
            showToast(`Hospital request with ID ${id} approved successfully.`, 'success');
        } catch (error) {
            console.error(`Error approving hospital request with ID ${id}:`, error);
        }
    };


    const handleReject = async (id) => {
        try {
            await updateRequestStatus(id, 'rejected');
            setHospitalRequests((prevRequests) =>
                prevRequests.map((request) => ({
                    ...request,
                    status: request.id === id ? 'rejected' : request.status,
                }))
            );
            showToast(`Hospital request with ID ${id} rejected successfully.`, 'success');
        } catch (error) {
            console.error(`Error rejecting hospital request with ID ${id}:`, error);
        }
    };


    return (
        <div>
            <NavBarComponent />
            <div className="container mx-auto p-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-teal-800 text-center">
                    Hospital Verification Page
                </h1>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Status:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full border border-teal-500 p-2 rounded-md text-teal-500 focus:outline-none focus:border-teal-700"
                    >
                        <option value="all">All</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <table className="min-w-full bg-white border border-teal-500 shadow-md rounded-md">
                    <thead>
                        <tr>
                            <th className="border-b p-4 text-left text-teal-600">ID</th>
                            <th className="border-b p-4 text-left text-teal-600">Name</th>
                            <th className="border-b p-4 text-left text-teal-600">Location</th>
                            <th className="border-b p-4 text-left text-teal-600">Contact Number</th>
                            <th className="border-b p-4 text-left text-teal-600">Email</th>
                            <th className="border-b p-4 text-left text-teal-600">Status</th>
                            <th className="border-b p-4 text-left text-teal-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitalRequests.map((hospital) => (
                            <tr key={hospital.id}>
                                <td className="p-4 text-teal-700">{hospital.id}</td>
                                <td className="p-4 text-teal-700">{hospital.hospitalName}</td>
                                <td className="p-4 text-teal-700">{hospital.location}</td>
                                <td className="p-4 text-teal-700">{hospital.contactNumber}</td>
                                <td className="p-4 text-teal-700">{hospital.email}</td>
                                <td className="p-4 text-teal-700">
                                    {hospital.status === 'approved' ? (
                                        <MdVerifiedUser className="text-green-500" />
                                    ) : hospital.status === 'rejected' ? (
                                        <MdClose className="text-red-500" />
                                    ) : (
                                        <MdHourglassFull className="text-orange-500" />
                                    )}
                                </td>
                                <td className="p-4 text-teal-700">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                        onClick={() => handleApprove(hospital.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleReject(hospital.id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminVerificationPage;
