// AdminVerificationPage.js
import { useState, useEffect } from 'react';

const AdminVerificationPage = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    // Fetch all requests from your backend
    // For simplicity, I'll assume there's an API endpoint for all requests
    fetch(`http://localhost:3000/admin/all-requests?status=${statusFilter}&type=${typeFilter}`)
      .then((res) => res.json())
      .then((data) => setAllRequests(data));
  }, [statusFilter, typeFilter]); // Trigger fetch when either filter changes

  const handleApprove = (requestId) => {
    // Implement the logic to approve a request
    console.log(`Approved request with ID ${requestId}`);
  };

  const handleReject = (requestId) => {
    // Implement the logic to reject a request
    console.log(`Rejected request with ID ${requestId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Admin Verification</h1>

      {/* Filtering Options */}
      <div className="mb-4 flex items-center">
        <div className="mr-4">
          <label className="mr-2">Filter by Status:</label>
          <select
            className="border p-2 "
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Filter by Type:</label>
          <select
            className="border p-2"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital</option>
          </select>
        </div>
      </div>

      {/* Combined Requests */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Verification Requests</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allRequests.map((request) => (
              <tr key={request.id}>
                <td className="border p-2">{request.id}</td>
                <td className="border p-2">{request.name}</td>
                <td className="border p-2">{request.type}</td>
                <td className="border p-2">{request.status}</td>
                <td className="border p-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded mr-2"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleReject(request.id)}
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
