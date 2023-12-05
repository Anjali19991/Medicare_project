import {
  Outlet,
} from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* { <ReactQueryDevtools initialIsOpen={false} /> }
        { <Routes> }
          { <Route path="hospital-registration" element={<HospitalForm />} />
          <Route path="admin-verification" element={<AdminVerification />} />
          <Route path="admin-dashboard" element={<AdminDashBoard />} />
          <Route path="admin-announcements" element={<AdminAnnouncements />} /> }

          { <Route path="/buymedicines" element={<MedicineNavbar />}>
            <Route index element={<Medicines />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="info/:id" element={<MedicineInfo />} />
          </Route> }
        { <Routes> }
         */}
      </QueryClientProvider>
    </>
  );
}
