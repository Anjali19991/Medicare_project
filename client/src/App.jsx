import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import HospitalForm from './components/HospitalForm/HospitalForm';
import Home from './components/home';
import React from 'react';

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
};

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='hospital-registration' element={<HospitalForm />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}
