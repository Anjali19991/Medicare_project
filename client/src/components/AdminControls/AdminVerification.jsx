import React, { useState, useEffect } from 'react';
import NavBarComponent from './NavBarComponent';
import { Container, Paper, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { MdVerifiedUser, MdClose, MdHourglassFull } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const requestsData = [
    { id: 1, name: 'Saint John Medical Center', type: 'Hospital', status: 'Pending' },
    { id: 2, name: 'Dr. Emily Johnson', type: 'Doctor', status: 'Pending' },
    { id: 3, name: 'City General Hospital', type: 'Hospital', status: 'Pending' },
    { id: 4, name: 'Dr. Michael Anderson', type: 'Doctor', status: 'Pending' },
    { id: 5, name: 'Sunset Medical Group', type: 'Hospital', status: 'Pending' },
    { id: 6, name: 'Dr. Sarah Miller', type: 'Doctor', status: 'Pending' },
    { id: 7, name: 'Dr. John', type: 'Doctor', status: 'Pending' },
];


const AdminVerificationPage = () => {
    const initialRequests = JSON.parse(localStorage.getItem('requestsData')) || requestsData;
    const [requests, setRequests] = useState(initialRequests);

    useEffect(() => {
        const stringifiedData = JSON.stringify(requests);
        console.log('Storing in localStorage:', stringifiedData);
        localStorage.setItem('requestsData', stringifiedData);
        localStorage.clear();
    }, [requests],[requestsData]);

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
        setTimeout(() => {
            setRequests((prevRequests) =>
                prevRequests.map((request) => ({
                    ...request,
                    status: request.id === id ? 'Approved' : request.status,
                }))
            );
            showToast(`Request with ID ${id} approved successfully.`, 'success');
        }, 1000);
    };

    const handleReject = (id) => {
        setTimeout(() => {
            setRequests((prevRequests) =>
                prevRequests.map((request) => ({
                    ...request,
                    status: request.id === id ? 'Rejected' : request.status,
                }))
            );
            showToast(`Request with ID ${id} rejected.`, 'error');
        }, 1000);
    };

    return (
        <div>
            <NavBarComponent />
            <Container>
                <Typography variant="h4" align="center" className="mt-10 mb-4 pt-5 font-bold text-2xl text-teal-600">
                    Verification Page
                </Typography>

                <TableContainer component={Paper} className="mt-6 bg-teal-200">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >ID</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Type</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>
                                        {request.status === 'Approved' ? (
                                            <MdVerifiedUser className="text-green-500" />
                                        ) : request.status === 'Rejected' ? (
                                            <MdClose className="text-red-500" />
                                        ) : (
                                            <MdHourglassFull className="text-orange-500" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            style={{ color: 'green' }}
                                            onClick={() => handleApprove(request.id)}
                                        >
                                            <AiOutlineCheck />
                                        </IconButton>
                                        <IconButton
                                            style={{ color: 'red' }}
                                            onClick={() => handleReject(request.id)}
                                        >
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
