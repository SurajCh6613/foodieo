import React from "react";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import useGetCurrentCity from "./hooks/useGetCurrentCity";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import UserDashboard from "./pages/dashboards/user/UserDashboard";
import OwnerDashboard from "./pages/dashboards/owner/OwnerDashboard";
import DeliveryBoyDashboard from "./pages/dashboards/DeliveryBoy/DeliveryBoyDashboard";
import DashboardNavigation from "./components/layout/DashboardNavigation";
import OwnerShop from "./pages/owner/OwnerShop";
import AddItem from "./pages/owner/AddItem";

const App = () => {
  useGetCurrentCity();
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />

            {/* Dashboard Navigation */}
            <Route path="dashboard" element={<DashboardNavigation />}>
              <Route
                index
                element={
                  user?.role === "user" ? (
                    <UserDashboard />
                  ) : user?.role === "owner" ? (
                    <OwnerDashboard />
                  ) : (
                    <DeliveryBoyDashboard />
                  )
                }
              />
              <Route path="my-shop" element={<OwnerShop />} />
              <Route path="add-item" element={<AddItem />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
