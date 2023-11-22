import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import HospitalForm from './components/HospitalForm/HospitalForm';
import Home from './components/home';
import React from 'react';
import { MedicineNavbar } from './components/medicine/MedicineNavbar';
import { Medicines } from './components/medicine/Medicine';
import CartPage from './components/medicine/CartPage';

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
};

export default function App() {
  return (
    <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='hospital-registration' element={<HospitalForm />} />
    </Route>
    <Route path='/buymedicines' element={<MedicineNavbar />}>
      <Route index element={<Medicines />} />
      <Route path='cart' element={<CartPage />} />
    </Route>
  </Routes>
  )
}
