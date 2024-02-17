
const UserAppointmentHistory = () => {

  const appointmentData = [
    { id: 1, date: "2024-02-17", time: "10:00 AM", doctor: "Dr. Smith", status: "Completed", type: "Follow-up" },
    { id: 2, date: "2024-02-18", time: "02:30 PM", doctor: "Dr. Johnson", status: "Canceled", type: "General Checkup" },
    { id: 3, date: "2024-02-19", time: "09:45 AM", doctor: "Dr. Brown", status: "Completed", type: "Follow-up" },
    { id: 4, date: "2024-02-20", time: "01:15 PM", doctor: "Dr. White", status: "Pending", type: "Dental Checkup" },
    { id: 5, date: "2024-02-21", time: "03:30 PM", doctor: "Dr. Davis", status: "Completed", type: "Follow-up" },
    { id: 6, date: "2024-02-22", time: "11:45 AM", doctor: "Dr. Miller", status: "Canceled", type: "General Checkup" },
    { id: 7, date: "2024-02-23", time: "08:00 AM", doctor: "Dr. Anderson", status: "Pending", type: "Cardiology Consultation" },
    { id: 8, date: "2024-02-24", time: "04:45 PM", doctor: "Dr. Martinez", status: "Completed", type: "Follow-up" },
    { id: 9, date: "2024-02-25", time: "12:30 PM", doctor: "Dr. Taylor", status: "Pending", type: "Orthopedic Consultation" },
    { id: 10, date: "2024-02-26", time: "03:15 PM", doctor: "Dr. Harris", status: "Completed", type: "Follow-up" },
  ];



  return (
    <div className="mx-8">
      <h1 className="text-2xl font-bold mb-4">Appointment History</h1>

      <div className="bg-white p-4 rounded shadow mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointmentData.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={
                      appointment.status === "Completed"
                        ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                        : appointment.status === "Canceled"
                          ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                          : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                    }
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default UserAppointmentHistory;
