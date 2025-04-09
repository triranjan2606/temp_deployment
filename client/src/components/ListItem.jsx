import React from "react";
import { MdSensors } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import gasSensor from "../assets/gas_sensor.png";
import thermalSensor from "../assets/thermal.png";
import device from "../assets/device.png";

const ListItem = ({ data, index }) => {
  const formatExactTime = (datetimeStr) => {
    console.log(datetimeStr);

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
  console.log(data);

  return (
    <>
      <div
        className="flex bg-white w-full p-2 rounded-md shadow-md cursor-pointer hover:opacity-85"
        key={index}
      >
        <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
          <MdAccessTime className=" text-2xl" />
          <p className="text-sm font-thin text-blue-600">
            {formatExactTime(data.timestamp)}
          </p>
        </div>
        <div className="h-full w-3/4 flex flex-col gap-1">
          {/* header  */}
          <div className="flex gap-1 w-full">
            <div className="w-1/6 h-full flex items-center justify-center bg-blue-100 rounded-lg py-0.5">
              <img src={device} className=" h-5  w-fit" />
            </div>
            <IoLocationOutline className=" text-2xl bg-blue-100 rounded-lg py-0.5 w-2/6" />
            <MdSensors className=" text-2xl bg-blue-100 rounded-lg py-0.5 w-1/6" />
            <div className="w-1/6 h-full flex items-center justify-center bg-blue-100 rounded-lg py-0.5">
              <img src={gasSensor} className=" h-5  w-fit" />
            </div>
            <div className="w-1/6 h-full flex items-center justify-center bg-blue-100 rounded-lg py-0.5">
              <img src={thermalSensor} className=" h-5  w-fit" />
            </div>
          </div>
          {data.nodes.map((key,index)=>(
              <>
              <div className="flex gap-1 w-full">
                <p className="w-1/6 flex items-center justify-center text-sm font-thin text-blue-600">
                  Node {index+1}
                </p>
                <p className="w-2/6 flex items-center justify-center text-xs font-thin text-blue-600">
                  [{key.gps.latitude},
                  {key.gps.longitude}]
                </p>
                <p className="w-1/6 flex items-center justify-center text-sm font-thin text-blue-600">
                  {key.doppler_speed}
                </p>
                <p className="w-1/6 flex items-center justify-center text-sm font-thin text-blue-600">
                  {key.gas_ppm}
                </p>
                <p className="w-1/6 flex items-center justify-center text-sm font-thin text-blue-600">
                  {key.temperature}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListItem;
