import { FaChevronRight } from "react-icons/fa";
import {BarChartComponent} from "./Charts/BarChartComponent";
import {AreaChartComponent} from "./Charts/AreaChartComponent"
import Counter from "../Counter"

import { useEffect, useState } from "react";

// Dummy data for hospital details
const hospitalData = {
   totalPendingRegistrations: 25,
   pendingDoctorRegistrations: 10,
   pendingHospitalRegistrations:15,
   approvedHospitals: 15,
   approvedDoctors: 30,
   medicineBuyingEngagement: 40
};

const HospitalDashboard = () => {
   const [totalPendingRegistrations, setTotalPendingRegistrations] = useState(0);
   const [pendingDoctorRegistrations, setPendingDoctorRegistrations] = useState(0);
   const[pendingHospitalRegistrations,setPendingHospitalRegistrations]=useState(0);
   const [approvedHospitals, setApprovedHospitals] = useState(0);
   const [approvedDoctors, setApprovedDoctors] = useState(0);
   const [medicineBuyingEngagement, setMedicineBuyingEngagement] = useState(0);

   useEffect(() => {
      // Fetch data from API or set dummy data
      setTotalPendingRegistrations(hospitalData.totalPendingRegistrations);
      setPendingDoctorRegistrations(hospitalData.pendingDoctorRegistrations);
      setPendingHospitalRegistrations(hospitalData.pendingHospitalRegistrations);
      setApprovedHospitals(hospitalData.approvedHospitals);
      setApprovedDoctors(hospitalData.approvedDoctors);
      setMedicineBuyingEngagement(hospitalData.medicineBuyingEngagement);
   }, []);

   return (
      <div className="w-full px-4">
         <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Admin Dashboard</h1>
            <div className="flex items-center py-2.5 gap-2 mx-5">
               <p>Account</p>
               <span>
                  <FaChevronRight className="text-gray-500" />
               </span>
               <p className="text-teal-500 underline">Dashboard</p>
            </div>
         </div>
         <div className="grid md:grid-cols-3 gap-6 grid-cols-1 my-10">
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={totalPendingRegistrations} />
               <p className="text-lg font-medium">Total Pending Registrations</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={pendingHospitalRegistrations} />
               <p className="text-lg font-medium"> Pending Hospital Registrations</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={pendingDoctorRegistrations} />
               <p className="text-lg font-medium">Pending Doctor Registrations</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={approvedHospitals} />
               <p className="text-lg font-medium">Approved Hospitals</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={approvedDoctors} />
               <p className="text-lg font-medium">Approved Doctors</p>
            </div>
            <div className="border border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-teal-500">
               <Counter to={medicineBuyingEngagement} />
               <p className="text-lg font-medium">Medicine Buying Engagement</p>
            </div>
         </div>

         <div className="flex my-20">
            <BarChartComponent />
            <AreaChartComponent />
         </div>
      </div>
   );
};

export default HospitalDashboard;
