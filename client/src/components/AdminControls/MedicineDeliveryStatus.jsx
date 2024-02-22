import { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicineDeliveryStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveredFilter, setDeliveredFilter] = useState(false);
  const API_ENDPOINT = 'http://localhost:3000';
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        let ordersEndpoint = `${API_ENDPOINT}/admin/getAllOrders`;

        if (deliveredFilter) {
          ordersEndpoint += `?deliveryStatus=true`;
        }

        const response = await fetch(ordersEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
        console.log('Orders fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [deliveredFilter, token]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Invalid Date";
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const markDelivered = async (orderId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/admin/updateDeliveryStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to update delivery status. Status: ${response.status}`);
      }
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: true } : order
        )
      );

      toast.success('Delivery status updated successfully');
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Failed to update delivery status');
    }
  };

  return (
    <div className="min-h-screen p-2">
      <h2 className="text-3xl font-bold text-teal-800 mb-4">Medicine Delivery Status</h2>

      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center">
          <label className="text-teal-700 font-semibold ml-4 mr-2">Filter Status:</label>
          <select
            className="p-2 pr-7 border border-teal-400 rounded-md focus:outline-none focus:ring focus:border-teal-500"
            value={deliveredFilter ? 'delivered' : 'undelivered'}
            onChange={(e) => setDeliveredFilter(e.target.value === 'delivered')}
          >
            <option value="undelivered">Yet to Deliver</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-teal-700">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <table className="min-w-full border ">
        <thead>
          <tr className="text-justify">
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Medicines</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Delivery Status</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.userId}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order.medicines.map((medicine, index) => (
                    <li key={index}>{medicine.medicineName}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">₹{order.totalAmount}</td>
              <td className="py-1 px-2 border-b">
                <p
                  className={`p-2 flex items-center justify-center text-center text-sm font-semibold ${order.deliveryStatus
                    ? 'bg-green-100 text-green-800 bg-opacity-75'
                    : 'bg-red-100 text-red-800 bg-opacity-75'
                    } rounded-full flex items-center`}
                >
                  {order.deliveryStatus ? 'Delivered' : 'Not Delivered'}
                </p>
              </td>
              <td className="py-2 px-4 border-b">{formatTimestamp(order.orderDate)}</td>
              <td className="px2 py-1 border-b">
                <button
                  className={`text-white ${order.deliveryStatus ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                    } px-2 py-2 rounded-md focus:outline-none text-sm`}
                  onClick={() => markDelivered(order._id)}
                  disabled={order.deliveryStatus}
                >
                  Mark Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );



};

export default MedicineDeliveryStatus;
