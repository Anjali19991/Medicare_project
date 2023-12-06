import React, { useState, useEffect } from 'react';
import { FaBan, FaCheck } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import NavBarComponent from './NavBarComponent';


const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const updateUserStatus = async (userId, isActive) => {
    try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'PATCH',  // Use 'PATCH' method for partial updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive }),
        });

        if (response.ok) {
            console.log('User status updated successfully');
            // Optionally, you can return the updated user data here if needed.
            // const data = await response.json();
            // return data;
        } else {
            console.error('Failed to update user status:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating user status:', error);
        throw error;
    }
};


const UserRow = ({ user, toggleUserStatus }) => (
    <tr key={user.id} className="border-b hover:bg-teal-50 ">
        <td className="p-4 text-teal-700">{user.id}</td>
        <td className="p-4 flex items-center text-teal-700">
            <IoMdPerson className="text-lg mr-2" />
            {user.username}
        </td>
        <td className="p-4 text-teal-700">{user.age}</td>
        <td className="p-4 text-teal-700">{user.isDoctor ? 'Doctor' : 'Patient'}</td>
        <td className={`p-4 ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
            {user.isActive ? 'Active' : 'Blocked'}
        </td>
        <td className="p-4 text-teal-700">
            <button
                onClick={() => toggleUserStatus(user.id, user.isActive)}
                className={`flex items-center px-4 py-2 rounded-md ${user.isActive
                    ? 'bg-red-500 text-white hover:bg-red-700'
                    : 'bg-green-500 text-white hover:bg-green-700'
                    }`}
            >
                {user.isActive ? <FaBan className="mr-2" /> : <FaCheck className="mr-2" />}
                {user.isActive ? ' Block' : 'Unblock'}
            </button>
        </td>
    </tr>
);

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userTypeFilter, setUserTypeFilter] = useState('all'); // 'all', 'doctor', 'patient'
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'blocked'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const handleUserTypeFilterChange = (value) => {
        setUserTypeFilter(value);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const filteredUsers = users.filter(user => {
        const typeFilter = userTypeFilter === 'all' || (userTypeFilter === 'doctor' && user.isDoctor) || (userTypeFilter === 'patient' && !user.isDoctor);
        const statusFilterCondition = statusFilter === 'all' || (statusFilter === 'active' && user.isActive) || (statusFilter === 'blocked' && !user.isActive);

        return typeFilter && statusFilterCondition;
    });

    const handleToggleUserStatus = async (userId, isActive) => {
        try {
            await updateUserStatus(userId, !isActive);
            const activeUserIndex = users.findIndex(user => user.id === userId);
            if (activeUserIndex !== -1) {
                const updatedUsers = [...users];
                updatedUsers[activeUserIndex].isActive = !isActive;
                setUsers(updatedUsers);
            }
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    return (
        <>
        <NavBarComponent/>
        <div className="container mx-auto mt-3 p-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-teal-800 text-center">
                    User Details
                </h1>


            <div className="flex mb-4">
                <div className="mr-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Filter by Type:
                    </label>
                    <select
                        value={userTypeFilter}
                        onChange={(e) => handleUserTypeFilterChange(e.target.value)}
                        className="w-full border border-teal-500 p-2 rounded-md text-teal-500 focus:outline-none focus:border-teal-700"
                    >
                        <option value="all">All</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Filter by Status:
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilterChange(e.target.value)}
                        className="w-full border border-teal-500 p-2 rounded-md text-teal-500 focus:outline-none focus:border-teal-700"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>

            <table className="min-w-full bg-white border border-teal-500 shadow-md rounded-md">
                <thead>
                    <tr>
                        <th className="border-b p-4 text-left text-teal-600">ID</th>
                        <th className="border-b p-4 text-left text-teal-600">Username</th>
                        <th className="border-b p-4 text-left text-teal-600">Age</th>
                        <th className="border-b p-4 text-left text-teal-600">Type</th>
                        <th className="border-b p-4 text-left text-teal-600">Status</th>
                        <th className="border-b p-4 text-left text-teal-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <UserRow key={user.id} user={user} toggleUserStatus={handleToggleUserStatus} />
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default Users;
