import React from "react";
import { MdAccessTime } from "react-icons/md";

const StatusListItem = ({ data, index , progress ,caseId}) => {
    console.log(data);
    
  const formatExactTime = (datetimeStr) => {
    // console.log(datetimeStr);

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
      <div
        className="flex bg-white w-full p-2 rounded-md shadow-md cursor-pointer hover:opacity-85"
        key={index}
      >
        {/* caseId  */}
        <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
          {/* <MdAccessTime className=" text-2xl" /> */}
          <p className="text-sm font-thin text-blue-600">CaseID : {caseId}{index}</p>
        </div>
        {/* Timestamp  */}
        <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
          <MdAccessTime className=" text-2xl" />
          <p className="text-sm font-thin text-blue-600">
            {formatExactTime(data.data.timestamp)}
          </p>
        </div>
        <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
          {/* <MdAccessTime className=" text-2xl" /> */}
          <p className="text-sm font-thin text-blue-600">
            Assigned Team : Team {Math.floor(Math.random() * 4) + 1}
          </p>
        </div>
        <div className="flex w-1/4 h-full items-center text-blue-600 gap-2">
          {/* <MdAccessTime className=" text-2xl" /> */}
          <p className="text-sm font-thin text-blue-600">
            Status : {progress}
          </p>
        </div>
      </div>
    </>
  );
};

export default StatusListItem;
