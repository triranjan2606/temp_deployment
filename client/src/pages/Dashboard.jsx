import React from "react";
import LineChart from "../components/dashboard/LineChart";
import DashbordMap from "../components/dashboard/DashbordMap";
import DoughnutChart from "../components/dashboard/DoughnutChart";
import { useCases } from "../context/CasesContext";

const Dashboard = () => {
  const { dCases } = useCases();
  
  // console.log("hello", dCases);

  return (
    <div className="max-h-screen h-screen w-full bg-blue-100 grid grid-cols-3 gap-3 p-5">
      {/* Left Column */}
      <div className="col-span-1 grid grid-rows-3 gap-3">
        <div className="flex items-center justify-center">
          <DoughnutChart
            labels={["Pending", "Resolved", "In Progress"]}
            dataa={[65, 20, 15]}
            textToShow={"Detected Cases Overview"}
          />
        </div>
        <div className=" flex items-center justify-center">
          <DoughnutChart
            labels={["Injured", "No more", "Missing"]}
            dataa={[65, 10, 25]}
            textToShow={"Victims Status"}
          />
        </div>
        <div className=" flex items-center justify-center">
          <DoughnutChart
            labels={["Drone", "Handheld Equipment", "RC Vehicles"]}
            dataa={[65, 20, 15]}
            textToShow={"Equipments Used"}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-2 grid grid-rows-3 gap-3">
        <div className="row-span-2 bg-white flex items-center justify-center rounded-2xl p-0.5 shadow-md">
          {dCases.length===0 ? <>Loading .... </>: <DashbordMap cases={dCases}/>}
          {/* <DashbordMap cases={dCases}/> */}
        </div>
        <div className="bg-white flex items-center justify-center rounded-2xl shadow-md">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
