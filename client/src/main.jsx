import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import MedicineReducer from "./features/MedicineSlice.js";
import DoctorReducer from './features/DoctorSlice.js'
import userReducer from "./features/user/userSlice";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HospitalForm from "./components/HospitalForm/HospitalForm";
import AdminVerification from "./components/AdminControls/AdminVerification";

import { About, Error, HomeLayout, Landing, Login, Register } from "./pages";
import AdminDashBoard from "./components/AdminControls/AdminDashBoard";
import AdminAnnouncements from "./components/AdminControls/AdminAnnouncements";
import { ErrorElement } from "./components";
import Users from "./components/AdminControls/Users.jsx";
import AnnouncementsDisplay from "./components/AnnouncementsDisplay/AnnouncementsDisplay";
import { MedicineNavbar } from "./components/medicine/MedicineNavbar";
import { Medicines } from "./components/medicine/Medicine";
import CartPage from "./components/medicine/CartPage";
import { MedicineInfo } from "./components/medicine/MedicineInfo";
import { ConsultDoctor } from "./components/Doctor/ConsultDoctor.jsx";
import { DoctorRegister } from "./components/Doctor/DoctorRegister.jsx";
import { DoctorDashboard } from "./components/Doctor/DoctorDashboard.jsx";
import { AppointmentForm } from "./components/Doctor/AppointmentForm.jsx";


// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
// import ContactUsPage from "./pages/Contactus.jsx";
import HospitalList from "./components/HospitalsList/HospitalList.jsx";

const store = configureStore({
  reducer: {
    medicines: MedicineReducer,
    userState: userReducer,
    doctors:DoctorReducer
  },
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        //loader: landingLoader(queryClient),
        //loader: landingLoader(queryClient),
      },
      {
        path: "hospital-registration",
        element: <HospitalForm />,
      },
      {
        path: "about-us",
        element: <About/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "hospital-registration",
    element: <HospitalForm />,
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/display-announcements",
    element: <AnnouncementsDisplay />,
    errorElement: <Error />,
  },
  {
    path: "admin-verification",
    element: <AdminVerification />,
    errorElement: <Error />,
  },
  {
    path: "admin-dashboard",
    element: <AdminDashBoard />,
    errorElement: <Error />,
  },
  {
    path: "admin-announcements",
    element: <AdminAnnouncements />,
    errorElement: <Error />,
  },
  {
    path: "users",
    element: <Users />,
    errorElement: <Error />,
  },
  {
    path: "display-hospitals",
    element: <HospitalList />,
    errorElement: <Error />,
  },

  {
    path: "/buymedicines",
    element: <MedicineNavbar />,
    children: [
      {
        index: true,
        element: <Medicines />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "info/:id",
        element: <MedicineInfo />,
      },
    ],
  },
  {
    path: "/consultdoctor",
    element: <ConsultDoctor />,
    errorElement: <Error />,
  },
  {
    path: "/consultdoctor/:id",
    element: <AppointmentForm />,
    errorElement: <Error />
  },
  {
    path: "/:id",
    element: <AppointmentForm />,
    errorElement: <Error />
  },
  {
    path: "/doc_register",
    element: <DoctorRegister />,
    errorElement: <Error />
  }
  , {
    path: "/doctordashboard",
    element: <DoctorDashboard />,
    errorElement: <Error />
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
