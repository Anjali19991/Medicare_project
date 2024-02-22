import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Counter from '../Counter';


import { useAuth } from "../../AuthContext";

export const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState({
        totalAppointments: 0,
        pendingAppointments: 0,
        approvedAppointments: 0,
        earnings: 0,
    });

    const API_ENDPOINT = 'http://localhost:3000';
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const getResponseData = async (url) => {
                    const response = await fetch(url, { headers });
                    const data = await response.json();
                    return data;
                };

                const doctorDetails = await getResponseData(`${API_ENDPOINT}/doctor/getdoctor/:_id`);
                console.log(doctorDetails.doctor)

                // const pendingAppointments = await getResponseData(`${API_ENDPOINT}/doctor/getAllAppointments?status=pending`);
                // const approvedAppointments = await getResponseData(`${API_ENDPOINT}/doctor/getAllAppointments?status=approved`);
                // const earnings = await getResponseData(`${API_ENDPOINT}/doctor/getEarnings`);

                // setAppointments({
                //     totalAppointments: allAppointments.data?.length || 0,
                //     pendingAppointments: pendingAppointments.data?.length || 0,
                //     approvedAppointments: approvedAppointments.data?.length || 0,
                //     earnings: earnings.total || 0,
                // });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="w-full px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-medium">Doctor Dashboard</h1>
                <div className="flex items-center py-2.5 gap-2 mx-5">
                    <p>Account</p>
                    <span>
                        <FaChevronRight className="text-gray-500" />
                    </span>
                    <p className="text-teal-500 underline">Dashboard</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 grid-cols-1 my-10">
                <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
                    <Counter to={appointments.totalAppointments} />
                    <p className="text-lg font-medium">Total Appointments</p>
                </div>
                <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
                    <Counter to={appointments.pendingAppointments} />
                    <p className="text-lg font-medium">Pending Appointments</p>
                </div>
                <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
                    <Counter to={appointments.approvedAppointments} />
                    <p className="text-lg font-medium">Approved Appointments</p>
                </div>
                <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
                    <Counter to={appointments.earnings} />
                    <p className="text-lg font-medium">Earnings</p>
                </div>
            </div>

            <div className="flex my-20">
               
            </div>
        </div>
    );
};

