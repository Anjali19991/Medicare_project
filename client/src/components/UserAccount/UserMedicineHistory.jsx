const UserMedicineHistory = () => {
  const medicinePurchaseData = [
    { id: 1, date: "2024-02-17", medicine: "Aspirin", quantity: 2, status: "Paid", cost: 20 },
    { id: 2, date: "2024-02-18", medicine: "Paracetamol", quantity: 1, status: "Failed", cost: 10 },
    { id: 3, date: "2024-02-19", medicine: "Antibiotics", quantity: 1, status: "Paid", cost: 30 },
    { id: 4, date: "2024-02-20", medicine: "Dental Paste", quantity: 3, status: "Pending Payment", cost: 45 },
    { id: 5, date: "2024-02-21", medicine: "Painkillers", quantity: 2, status: "Paid", cost: 25 },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Medicine Purchase History</h1>

      <div className="bg-white w-[75vw] p-4 rounded shadow mt-4 mx-8">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicinePurchaseData.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.medicine}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{purchase.cost}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {purchase.status === "Paid" && (
                    <span className="text-green-500">Paid</span>
                  )}
                  {purchase.status === "Failed" && (
                    <span className="text-red-500">Failed</span>
                  )}
                  {purchase.status === "Pending Payment" && (
                    <span className="text-yellow-500">Pending Payment</span>
                  )}
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
