import React from "react";
import dummy from "../assets/dummy.json";
import { MdSensors } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import MapWithPointers from "../components/MapWithPointers";
import { LuRefreshCcw } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";

const Manage = () => {
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
  return (
    <>
      <div className="w-full flex h-full">
        <div className="flex flex-col w-5/12 bg-blue-100 min-h-dvh p-5 gap-3">

          <div className="flex items-center justify-center gap-4 bg-blue-600 text-white w-full p-2 rounded-md shadow-md ">
            <p className="text-xl font-bold">Detected Cases</p>
            <LuRefreshCcw className="text-2xl cursor-pointer"/>
            <IoFilter className="text-2xl cursor-pointer"/>
          </div>

          {dummy.map((data, index) => (
            <div
              className="flex bg-white w-full p-2 rounded-md shadow-md cursor-pointer hover:opacity-85"
              key={index}
            >
              <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
                <MdAccessTime className=" text-2xl" />
                <p className="text-sm font-thin text-blue-600">
                  {formatExactTime(data.Timestamp)}
                </p>
              </div>
              <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
                <IoLocationOutline className="text-4xl" />
                <p className="text-sm font-thin text-blue-600">
                  [{data.Latitude} , {data.Longitude}]
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
          ))}
        </div>
        <div className="flex w-7/12 bg-amber-800 min-h-dvh">
          <MapWithPointers />
        </div>
      </div>
    </>
  );
};

export default Manage;
