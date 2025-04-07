import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full relative">
        <Sidebar />
        <div className="w-full min-h-screen h-full  bg-blue-50 overflow-y-auto ">
          <Outlet />
        </div>

      </div>
    </>
  );
};

export default LandingPage;
