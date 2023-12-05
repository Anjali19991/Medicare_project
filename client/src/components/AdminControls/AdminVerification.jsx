import React, { useState, useEffect } from 'react';
import NavBarComponent from './NavBarComponent';
import { Container, Paper, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { MdVerifiedUser, MdClose, MdHourglassFull } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminVerificationPage = () => {
    const [hospitalRequests, setHospitalRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        // Fetch hospital registration requests based on the selected status
        const url = filterStatus === 'all' ? 'http://localhost:3001/hospitals' : `http://localhost:3001/hospitals?status=${filterStatus}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setHospitalRequests(data);
            })
            .catch((err) => console.log('Error fetching hospital requests:', err));
    }, [filterStatus]);

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

    const handleApprove = (id) => {
        // Update the status to 'Approved' on the server
        updateRequestStatus(id, 'approved');
    };

    const handleReject = (id) => {
        // Update the status to 'Rejected' on the server
        updateRequestStatus(id, 'rejected');
    };

    const updateRequestStatus = (id, status) => {
        fetch(`http://localhost:3001/hospitals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .then(() => {
                setHospitalRequests((prevRequests) =>
                    prevRequests.map((request) => ({
                        ...request,
                        status: request.id === id ? status : request.status,
                    }))
                );
                showToast(`Hospital request with ID ${id} ${status.toLowerCase()} successfully.`, 'success');
            })
            .catch((err) => console.log(`Error updating status for hospital request with ID ${id}:`, err));
    };

    return (
        <div>
            <NavBarComponent />
            <Container>
                <Typography variant="h4" align="center" className="mt-10 mb-4 pt-5 font-bold text-2xl text-teal-600">
                    Hospital Verification Page
                </Typography>

                <div className="mb-4">
                    <Typography variant="subtitle1">Filter by Status:</Typography>
                    <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </div>

                <TableContainer component={Paper} className="mt-6 bg-teal-200">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hospitalRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.hospitalName}</TableCell>
                                    <TableCell>{request.location}</TableCell>
                                    <TableCell>{request.contactNumber}</TableCell>
                                    <TableCell>{request.email}</TableCell>
                                    <TableCell>
                                        {request.status === 'approved' ? (
                                            <MdVerifiedUser className="text-green-500" />
                                        ) : request.status === 'rejected' ? (
                                            <MdClose className="text-red-500" />
                                        ) : (
                                            <MdHourglassFull className="text-orange-500" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton style={{ color: 'green' }} onClick={() => handleApprove(request.id)}>
                                            <AiOutlineCheck />
                                        </IconButton>
                                        <IconButton style={{ color: 'red' }} onClick={() => handleReject(request.id)}>
                                            <AiOutlineClose />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default AdminVerificationPage;
