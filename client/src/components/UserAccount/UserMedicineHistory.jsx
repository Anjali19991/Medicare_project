import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'

const UserMedicineHistory = () => {
  const [medicineHistory, setMedicineHistory] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    const fetchMedicineHistory = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/getmedicinehistory', {
          headers: {
            Authorization: `Bearer ${cookies.get("TOKEN")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userOrders = data.user?.orders || [];
          setMedicineHistory(userOrders);
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching medicine history:', error);
      }
    };

    fetchMedicineHistory();
  }, []);

  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold mb-4">Medicine Purchase History</h1>

      <div className="bg-white w-full p-4 rounded shadow mt-4 mx-8">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicine
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicineHistory.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.medicines.map((medicine) => (
                    <div key={medicine._id}>{medicine.medicineName}</div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.medicines.map((medicine) => (
                    <div key={medicine._id}>{medicine.quantity}</div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">₹{order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.deliveryStatus ? (
                      <span className="text-green-500">Delivered</span>
                  ):(
                    <span className="text-red-500">Yet to Deliver</span>
                  )
                } 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserMedicineHistory;
