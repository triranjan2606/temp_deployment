import React from "react";
import { IoFilter } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { useCases } from "../context/CasesContext";
import StatusListItem from "../components/dashboard/StatusListItem";

const Progress = () => {
const { dCases } = useCases();
  return (
    <div className="flex w-full h-screen  gap-3 m-5">
      {/* pending cases  */}
      <div className="w-1/3 h-full flex flex-col gap-3 overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-center gap-4 bg-blue-600 text-white w-full p-2 rounded-md shadow-md ">
          <p className="text-xl font-bold">Pending Cases</p>
          <LuRefreshCcw
            className="text-2xl cursor-pointer"
          />
          <IoFilter className="text-2xl cursor-pointer" />
        </div>
        {dCases.map((item,index)=>(
            <StatusListItem data={item} index={index} progress={"Pending"} caseId={338}/>
        ))}
      </div>

      {/*In progress   */}
      <div className="w-1/3 h-full flex flex-col gap-3 overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-center gap-4 bg-blue-600 text-white w-full p-2 rounded-md shadow-md ">
          <p className="text-xl font-bold">In Progess Cases</p>
          <LuRefreshCcw
            className="text-2xl cursor-pointer"
          />
          <IoFilter className="text-2xl cursor-pointer" />
        </div>
        {dCases.map((item,index)=>(
            <StatusListItem data={item} index={index} progress={"In progress"} caseId={341}/>
        ))}
      </div>

      {/*In progress   */}
      <div className="w-1/3 h-full flex flex-col gap-3 overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-center gap-4 bg-blue-600 text-white w-full p-2 rounded-md shadow-md ">
          <p className="text-xl font-bold">Resolved Cases</p>
          <LuRefreshCcw
            className="text-2xl cursor-pointer"
          />
          <IoFilter className="text-2xl cursor-pointer" />
        </div>
        {dCases.map((item,index)=>(
            <StatusListItem data={item} index={index} progress={"Resolved"} caseId={271}/>
        ))}
      </div>

    </div>
  );
};

export default Progress;
