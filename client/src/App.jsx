import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import HospitalForm from './components/HospitalForm/HospitalForm';
import Home from './components/home';
import React from 'react';
import { MedicineNavbar } from './components/medicine/MedicineNavbar';
import { Medicines } from './components/medicine/Medicine';
import CartPage from './components/medicine/CartPage';
import { MedicineInfo } from './components/medicine/MedicineInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
