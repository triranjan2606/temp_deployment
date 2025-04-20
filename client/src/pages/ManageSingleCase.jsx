import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SinglePointMap from "../components/SinglePointMap";
import thermalImage from "../assets/thermal_image.png";
import { IoLocationOutline } from "react-icons/io5";
import gasSensor from "../assets/gas_sensor.png";
import device from "../assets/device.png";
import { MdSensors } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineLowPriority } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import WhiteSpinner from "../util/WhiteSpinner";
import showToastMessage from "../util/Toast";
import { ToastContainer } from "react-toastify";

const ManageSingleCase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doppler_speed, gas_ppm, gps, node_id } = location.state || {};
  const [loading,setLoading]=useState(false);
  console.log("ff", doppler_speed, gas_ppm, gps);
  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/manage");
      showToastMessage("success","Case assigned successfully !")
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  return (
    <>
      <div className="flex w-full h-screen p-5 gap-6">
        <div className="flex w-1/2 h-full bg-white rounded-2xl shadow-md">
          <div className="flex w-full flex-col justify-center ml-40 gap-4 pr-5">
            {/* <p className="text-2xl text-blue-600">Case ID : 6123</p> */}

            {/* device id  */}
            <div className="flex gap-3 items-center">
              <img
                src={device}
                alt=""
                className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl"
              />
              <p className="text-2xl text-blue-600">Device ID : RQS493PRO</p>
            </div>
            {/* time  */}
            <div className="flex gap-3 items-center">
              <MdAccessTime className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl" />
              <p className="text-2xl text-blue-600">Timestamp : 12:25:45 PM</p>
            </div>
            {/* location  */}
            <div className="flex gap-3 items-center">
              <IoLocationOutline className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl" />
              <p className="text-2xl text-blue-600">
                Location : [{gps.latitude},{gps.longitude}]
              </p>
            </div>
            {/* doplar  */}
            <div className="flex gap-2 items-center">
              <MdSensors className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl" />
              <p className="text-2xl text-blue-600">
                Doplar : {doppler_speed} m/s
              </p>
            </div>

            {/* gas level  */}
            <div className="flex gap-3 items-center">
              <img
                src={gasSensor}
                alt=""
                className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl"
              />
              <p className="text-2xl text-blue-600">
                Gas Level : {gas_ppm} ppm
              </p>
            </div>
            {/* priority   */}
            <div className="flex gap-3 items-center">
              <MdOutlineLowPriority className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl" />
              <p className="text-2xl text-blue-600">Priority : Medium</p>
            </div>

            {/* progress   */}
            <div className="flex gap-3 items-center">
              <GrInProgress className="h-12 w-fit px-3 py-1 bg-blue-200 rounded-2xl" />
              <p className="text-2xl text-blue-600">Status : In progress</p>
            </div>
            {/* <label for="pet-select">Choose a pet:</label> */}

            <select name="pets" id="pet-select" className="text-2xl text-blue-600 outline-2 outline-blue-600 rounded-2xl bg-blue-100 py-2 px-5 font-semibold">
              <option value="">Choose team to assign</option>
              <option value="dog">Team 1</option>
              <option value="dog">Team 2</option>
              <option value="dog">Team 3</option>
              <option value="dog">Team 4</option>
            </select>

            <div className="bg-blue-600 text-xl font-bold text-white rounded-md cursor-pointer px-5 py-2 w-fit flex gap-2 items-center:" onClick={onSubmit}>Assign {loading?<WhiteSpinner/>:""}</div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 h-full gap-4">
          <div className="flex h-1/2 shadow-md">
            <img src={thermalImage} alt="" className="w-full rounded-2xl" />
          </div>
          <div className="flex h-1/2  bg-amber-400 rounded-2xl shadow-md">
            <SinglePointMap gps={gps} />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ManageSingleCase;
