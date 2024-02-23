import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

export const DoctorDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user);
      updateAppointments(user?.appointments);
    }
  }, [user]);

  // State variables for counts
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Function to update counts and earnings
  const updateAppointments = (appointments) => {
    if (appointments) {
      const accepted = appointments.filter(appointment => appointment.status === 'approved').length;
      const pending = appointments.filter(appointment => appointment.status === 'pending').length;
      const rejected = appointments.filter(appointment => appointment.status === 'rejected').length;

      // Calculate earnings
      const earnings = appointments.reduce((total, appointment) => total + appointment.ticketPrice, 0);

      // Update state variables
      setAcceptedCount(accepted);
      setPendingCount(pending);
      setRejectedCount(rejected);
      setTotalEarnings(earnings);
    }
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <div>
        <h2>Accepted Appointments: {acceptedCount}</h2>
      </div>

      <div>
        <h2>Pending Appointments: {pendingCount}</h2>
      </div>

      <div>
        <h2>Rejected Appointments: {rejectedCount}</h2>
      </div>

      <div>
        <h2>Total Earnings: Rs {totalEarnings}</h2>
      </div>
    </div>
  );
};
