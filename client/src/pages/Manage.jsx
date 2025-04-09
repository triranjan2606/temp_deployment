import React, { useState } from "react";
import dummy from "../assets/dummy.json";
import { MdSensors } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import MapWithPointers from "../components/MapWithPointers";
import { LuRefreshCcw } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios"
import Spinner from "../util/Spinner"

const Manage = () => {
  // format time
  const formatExactTime = (datetimeStr) => {
    const date = new Date(datetimeStr.replace(" ", "T")); // Convert to ISO format

    const options = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      //   day: "numeric",
      //   month: "long",
      //   year: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const parts = formatter.formatToParts(date);

    const time = `${parts.find((p) => p.type === "hour").value}:${
      parts.find((p) => p.type === "minute").value
    }:${parts.find((p) => p.type === "second").value} ${
      parts.find((p) => p.type === "dayPeriod").value
    }`;
    // const fullDate = `${parts.find((p) => p.type === "day").value} ${
    //   parts.find((p) => p.type === "month").value
    // } ${parts.find((p) => p.type === "year").value}`;

    return `${time} `;
  };
  const [cases, setCases] = useState([
    {
      filename: "temp/case1.json",
      data: {
        Timestamp: "2025-04-03 10:37:35",
        Latitude: 26.9087,
        Longitude: 75.7871,
        detectedInMicrowaveDopler: false,
        harmfulGasDetected: false,
        detectedInThermalImage: false,
        depth: 4,
        deviceId: "dev001",
        status: "Pending",
        assignedTeam: "Team Alpha",
      },
    },
    {
      filename: "temp/case10.json",
      data: {
        Timestamp: "2025-04-03 10:49:42",
        Latitude: 26.9067,
        Longitude: 75.7923,
        detectedInMicrowaveDopler: true,
        harmfulGasDetected: true,
        detectedInThermalImage: false,
        depth: 1,
        deviceId: "dev002",
        status: "Pending",
        assignedTeam: "Team Bravo",
      },
    },
    {
      filename: "temp/case2.json",
      data: {
        Timestamp: "2025-04-03 10:38:21",
        Latitude: 26.9102,
        Longitude: 75.7896,
        detectedInMicrowaveDopler: false,
        harmfulGasDetected: true,
        detectedInThermalImage: false,
        depth: 2,
        deviceId: "dev002",
        status: "In Progress",
        assignedTeam: "Team Bravo",
      },
    },
    {
      filename: "temp/case3.json",
      data: {
        Timestamp: "2025-04-03 10:39:59",
        Latitude: 26.9063,
        Longitude: 75.7864,
        detectedInMicrowaveDopler: true,
        harmfulGasDetected: true,
        detectedInThermalImage: true,
        depth: 5,
        deviceId: "dev003",
        status: "Resolved",
        assignedTeam: "Team Charlie",
      },
    },
    {
      filename: "temp/case4.json",
      data: {
        Timestamp: "2025-04-03 10:40:46",
        Latitude: 26.9091,
        Longitude: 75.7908,
        detectedInMicrowaveDopler: false,
        harmfulGasDetected: false,
        detectedInThermalImage: true,
        depth: 1,
        deviceId: "dev004",
        status: "Pending",
        assignedTeam: "Team Bravo",
      },
    },
    {
      filename: "temp/case5.json",
      data: {
        Timestamp: "2025-04-03 10:42:02",
        Latitude: 26.9074,
        Longitude: 75.7839,
        detectedInMicrowaveDopler: true,
        harmfulGasDetected: true,
        detectedInThermalImage: false,
        depth: 3,
        deviceId: "dev001",
        status: "In Progress",
        assignedTeam: "Team Alpha",
      },
    },
    {
      filename: "temp/case6.json",
      data: {
        Timestamp: "2025-04-03 10:43:35",
        Latitude: 26.9058,
        Longitude: 75.7892,
        detectedInMicrowaveDopler: true,
        harmfulGasDetected: true,
        detectedInThermalImage: true,
        depth: 5,
        deviceId: "dev002",
        status: "Resolved",
        assignedTeam: "Team Charlie",
      },
    },
    {
      filename: "temp/case7.json",
      data: {
        Timestamp: "2025-04-03 10:45:17",
        Latitude: 26.9099,
        Longitude: 75.7841,
        detectedInMicrowaveDopler: false,
        harmfulGasDetected: false,
        detectedInThermalImage: true,
        depth: 2,
        deviceId: "dev003",
        status: "Pending",
        assignedTeam: "Team Bravo",
      },
    },
    {
      filename: "temp/case8.json",
      data: {
        Timestamp: "2025-04-03 10:46:48",
        Latitude: 26.9111,
        Longitude: 75.7912,
        detectedInMicrowaveDopler: true,
        harmfulGasDetected: false,
        detectedInThermalImage: false,
        depth: 0,
        deviceId: "dev004",
        status: "In Progress",
        assignedTeam: "Team Alpha",
      },
    },
    {
      filename: "temp/case9.json",
      data: {
        Timestamp: "2025-04-03 10:48:15",
        Latitude: 26.9124,
        Longitude: 75.7869,
        detectedInMicrowaveDopler: false,
        harmfulGasDetected: true,
        detectedInThermalImage: true,
        depth: 3,
        deviceId: "dev001",
        status: "Resolved",
        assignedTeam: "Team Charlie",
      },
    },
  ]);
  const [loading,setLoading]= useState(false)
  const getAllData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/json-files`,
        config
      );
      console.log(data);
      // if (data.success) {
      //   // setWalletBalance(data.walletBalance);
      //   setTransactions(data.data);
      //   setLoading(false);
      //   return;
      // } else {
      //   showToastMessage("error", data.message);
        setLoading(false);
      // }
    } catch (error) {
      // showToastMessage("error", `${error}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllData()
  }, [])
  
  return (
    <>
      <div className="w-full flex h-full">
        <div className="flex flex-col w-5/12 bg-blue-100 min-h-dvh p-5 gap-3">
          <div className="flex items-center justify-center gap-4 bg-blue-600 text-white w-full p-2 rounded-md shadow-md ">
            <p className="text-xl font-bold">Detected Cases</p>
            
            <LuRefreshCcw className="text-2xl cursor-pointer" />
            <IoFilter className="text-2xl cursor-pointer" />
          </div>
          <Spinner/>
          {cases.map((data, index) => 
              data.data.detectedInMicrowaveDopler ||
              data.data.detectedInThermalImage ||
              data.data.harmfulGasDetected ? (
                <div
                  className="flex bg-white w-full p-2 rounded-md shadow-md cursor-pointer hover:opacity-85"
                  key={index}
                >
                  <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
                    <MdAccessTime className=" text-2xl" />
                    <p className="text-sm font-thin text-blue-600">
                      {formatExactTime(data.data.Timestamp)}
                    </p>
                  </div>
                  <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
                    <IoLocationOutline className="text-4xl" />
                    <p className="text-sm font-thin text-blue-600">
                      [{data.data.Latitude} , {data.data.Longitude}]
                    </p>
                  </div>
                  <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
                    <MdSensors className="text-3xl" />
                    <p className="text-xl font-thin text-blue-600">
                      {data["Microwave Doppler Sensor Value"]}
                    </p>
                  </div>
                  <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
                    <FaTemperatureEmpty className="text-2xl" />
                    <p className="text-xl font-thin text-blue-600">
                      {data["Thermal Imaging Temperature (°C)"]} °C
                    </p>
                  </div>
                </div>
              ) : null

          )}
        </div>
        <div className="flex w-7/12 bg-amber-800 min-h-dvh">
          <MapWithPointers />
        </div>
      </div>
    </>
  );
};

export default Manage;
