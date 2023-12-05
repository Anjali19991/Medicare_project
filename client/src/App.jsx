import { Route, Routes, Outlet } from 'react-router-dom';
import HospitalForm from './components/HospitalForm/HospitalForm';
import Home from './components/home';
import React from 'react';
import { MedicineNavbar } from './components/medicine/MedicineNavbar';
import { Medicines } from './components/medicine/Medicine';
import CartPage from './components/medicine/CartPage';
import { MedicineInfo } from './components/medicine/MedicineInfo';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminVerification from './components/AdminControls/AdminVerification';
import AdminDashBoard from './components/AdminControls/AdminDashBoard';
import AdminAnnouncements from './components/AdminControls/AdminAnnouncements';
import HospitalList from './components/HospitalsList/HospitalList';


const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='hospital-registration' element={<HospitalForm />} />
          <Route path='hospital-listing' element={<HospitalList />} />
          <Route path='admin-verification' element={<AdminVerification />} />
          <Route path='admin-dashboard' element={<AdminDashBoard/>}/>
          <Route path='admin-announcements' element={<AdminAnnouncements />} />

        </Route>
        <Route path='/buymedicines' element={<MedicineNavbar />}>
          <Route index element={<Medicines />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='info/:id' element={<MedicineInfo />} />
        </Route>
      </Routes>
      <ToastContainer toastClassName={"bg-slate-700 text-white"} position='bottom-left' style={{ position: 'absolute', top: '10vh' }} />
    </>
  )
}
