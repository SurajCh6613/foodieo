import React from "react";
import Navbar from "./components/layout/Navbar";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </>
  );
};

export default App;
