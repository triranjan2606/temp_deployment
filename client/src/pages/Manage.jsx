import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MapWithPointers from "../components/MapWithPointers";
import { LuRefreshCcw } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios";
import PulseLoader from "../util/PulseLoader";
import WhiteSpinner from "../util/WhiteSpinner";
import ListItem from "../components/ListItem";
import { Switch } from "@headlessui/react";
import { useCases } from "../context/CasesContext";
import showToastMessage from "../util/Toast";

const Manage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <p className="p-4 text-red-500">You must log in first.</p>;
  }
  // format time
  const { dCases, setDCases } = useCases();
  const [cases, setCases] = useState([]);
  // console.log(cases);

  const [fetchAgain, setFetchAgain] = useState(false);

  // const [cases, setCases] = useState([
  //   {
  //     timestamp: "2025-04-09 12:01:00",
  //     nodes: [
  //       {
  //         node_id: "Node 1",
  //         doppler_speed: 0.54,
  //         gas_ppm: 323,
  //         temperature: 35.6,
  //         gps: {
  //           latitude: 12.971743,
  //           longitude: 77.594834,
  //         },
  //       },
  //       {
  //         node_id: "Node 2",
  //         doppler_speed: 0.29,
  //         gas_ppm: 333,
  //         temperature: 35.1,
  //         gps: {
  //           latitude: 12.971965,
  //           longitude: 77.594797,
  //         },
  //       },
  //       {
  //         node_id: "Node 3",
  //         doppler_speed: 0.74,
  //         gas_ppm: 300,
  //         temperature: 36.2,
  //         gps: {
  //           latitude: 12.971575,
  //           longitude: 77.594511,
  //         },
  //       },
  //       {
  //         node_id: "Node 4",
  //         doppler_speed: 0.76,
  //         gas_ppm: 250,
  //         temperature: 28.4,
  //         gps: {
  //           latitude: 12.971765,
  //           longitude: 77.594826,
  //         },
  //       },
  //       {
  //         node_id: "Node 5",
  //         doppler_speed: 0.58,
  //         gas_ppm: 199,
  //         temperature: 36.9,
  //         gps: {
  //           latitude: 12.971798,
  //           longitude: 77.594788,
  //         },
  //       },
  //     ],
  //     victim_status: "Confirmed",
  //   },
  //   {
  //     timestamp: "2025-04-09 12:01:00",
  //     nodes: [
  //       {
  //         node_id: "Node 1",
  //         doppler_speed: 0.54,
  //         gas_ppm: 323,
  //         temperature: 35.6,
  //         gps: {
  //           latitude: 12.971743,
  //           longitude: 77.594834,
  //         },
  //       },
  //       {
  //         node_id: "Node 2",
  //         doppler_speed: 0.29,
  //         gas_ppm: 333,
  //         temperature: 35.1,
  //         gps: {
  //           latitude: 12.971965,
  //           longitude: 77.594797,
  //         },
  //       },
  //       {
  //         node_id: "Node 3",
  //         doppler_speed: 0.74,
  //         gas_ppm: 300,
  //         temperature: 36.2,
  //         gps: {
  //           latitude: 12.971575,
  //           longitude: 77.594511,
  //         },
  //       },
  //       {
  //         node_id: "Node 4",
  //         doppler_speed: 0.76,
  //         gas_ppm: 250,
  //         temperature: 28.4,
  //         gps: {
  //           latitude: 12.971765,
  //           longitude: 77.594826,
  //         },
  //       },
  //       {
  //         node_id: "Node 5",
  //         doppler_speed: 0.58,
  //         gas_ppm: 199,
  //         temperature: 36.9,
  //         gps: {
  //           latitude: 12.971798,
  //           longitude: 77.594788,
  //         },
  //       },
  //     ],
  //     victim_status: "Confirmed",
  //   },
  // ]);
  //     {
  //     "filename": "dummy/device/test/dummy/1743959418979.json",
  //     "data": {
  //         "timestamp": "2025-04-03T10:37:36",
  //         "device_id": "DummySensorClient",
  //         "location": {
  //             "latitude": 26.907674,
  //             "longitude": 75.787116
  //         },
  //         "sensors": {
  //             "microwave_doppler": 1.96,
  //             "gas_reading_ppm": 381.28,
  //             "thermal_temp_celsius": 28.05
  //         },
  //         "victim_detected": false
  //     }
  // }
  //   {
  //     filename: "temp/case2.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:38:21",
  //       Latitude: 26.9102,
  //       Longitude: 75.7896,
  //       detectedInMicrowaveDopler: false,
  //       harmfulGasDetected: true,
  //       detectedInThermalImage: false,
  //       depth: 2,
  //       deviceId: "dev002",
  //       status: "In Progress",
  //       assignedTeam: "Team Bravo",
  //     },
  //   },
  //   {
  //     filename: "temp/case3.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:39:59",
  //       Latitude: 26.9063,
  //       Longitude: 75.7864,
  //       detectedInMicrowaveDopler: true,
  //       harmfulGasDetected: true,
  //       detectedInThermalImage: true,
  //       depth: 5,
  //       deviceId: "dev003",
  //       status: "Resolved",
  //       assignedTeam: "Team Charlie",
  //     },
  //   },
  //   {
  //     filename: "temp/case4.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:40:46",
  //       Latitude: 26.9091,
  //       Longitude: 75.7908,
  //       detectedInMicrowaveDopler: false,
  //       harmfulGasDetected: false,
  //       detectedInThermalImage: true,
  //       depth: 1,
  //       deviceId: "dev004",
  //       status: "Pending",
  //       assignedTeam: "Team Bravo",
  //     },
  //   },
  //   {
  //     filename: "temp/case5.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:42:02",
  //       Latitude: 26.9074,
  //       Longitude: 75.7839,
  //       detectedInMicrowaveDopler: true,
  //       harmfulGasDetected: true,
  //       detectedInThermalImage: false,
  //       depth: 3,
  //       deviceId: "dev001",
  //       status: "In Progress",
  //       assignedTeam: "Team Alpha",
  //     },
  //   },
  //   {
  //     filename: "temp/case6.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:43:35",
  //       Latitude: 26.9058,
  //       Longitude: 75.7892,
  //       detectedInMicrowaveDopler: true,
  //       harmfulGasDetected: true,
  //       detectedInThermalImage: true,
  //       depth: 5,
  //       deviceId: "dev002",
  //       status: "Resolved",
  //       assignedTeam: "Team Charlie",
  //     },
  //   },
  //   {
  //     filename: "temp/case7.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:45:17",
  //       Latitude: 26.9099,
  //       Longitude: 75.7841,
  //       detectedInMicrowaveDopler: false,
  //       harmfulGasDetected: false,
  //       detectedInThermalImage: true,
  //       depth: 2,
  //       deviceId: "dev003",
  //       status: "Pending",
  //       assignedTeam: "Team Bravo",
  //     },
  //   },
  //   {
  //     filename: "temp/case8.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:46:48",
  //       Latitude: 26.9111,
  //       Longitude: 75.7912,
  //       detectedInMicrowaveDopler: true,
  //       harmfulGasDetected: false,
  //       detectedInThermalImage: false,
  //       depth: 0,
  //       deviceId: "dev004",
  //       status: "In Progress",
  //       assignedTeam: "Team Alpha",
  //     },
  //   },
  //   {
  //     filename: "temp/case9.json",
  //     data: {
  //       Timestamp: "2025-04-03 10:48:15",
  //       Latitude: 26.9124,
  //       Longitude: 75.7869,
  //       detectedInMicrowaveDopler: false,
  //       harmfulGasDetected: true,
  //       detectedInThermalImage: true,
  //       depth: 3,
  //       deviceId: "dev001",
  //       status: "Resolved",
  //       assignedTeam: "Team Charlie",
  //     },
  //   },
  // ]);

  const [loading, setLoading] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const [isHeatmap, setIsHeatmap] = useState(false);
  const handleToggle = () => {
    setIsHeatmap((prev) => !prev);
    onToggle(!isHeatmap); // Pass value to parent
  };
  // const sortedCases = (() => {
  //   const inRange = [];
  //   const outOfRange = [];

  //   cases.forEach((item) => {
  //     const speed = item.data?.nodes?.[0]?.doppler_speed;

  //     if (speed >= 3 && speed <= 7) {
  //       inRange.push(item);
  //     } else {
  //       outOfRange.push(item);
  //     }
  //   });

  //   // Sort the inRange array based on doppler_speed
  //   inRange.sort(
  //     (a, b) => a.data.nodes[0].doppler_speed - b.data.nodes[0].doppler_speed
  //   );

  //   setCases([...inRange, ...outOfRange]);
  // })();

  const getAllData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/json-files`,
        // `http://localhost:5000/api/json-files`,
        config
      );
      console.log("data", data);
      if (data.success) {
        setCases(data.data);
        setDCases(data.data);
        setLoading(false);
        setIsSorted(!isSorted);
        return;
      } else {
        showToastMessage("error", "failed");
        console.log("success false");
        setLoading(false);
      }
    } catch (error) {
      // showToastMessage("error", `${error}`);
      console.error(error);
      setLoading(false);
    }
  };
  const test = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api`,
        // `http://localhost:5000/api`,
        config
      );
      console.log(data);
    } catch (error) {
      // showToastMessage("error", `${error}`);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData(); // Initial call

    const interval = setInterval(() => {
      getAllData();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, [fetchAgain]);

  return (
    <>
      <div className="w-full flex h-full">
        <div className="flex flex-col w-6/12 bg-blue-100 min-h-dvh max-h-screen p-5 gap-3 overflow-y-auto">
          {/* header */}
          <div className="flex items-center justify-center gap-4 bg-blue-600 text-white w-full p-2 rounded-md shadow-md sticky top-0 z-30">
            <p className="text-xl font-bold">Priority List</p>
            {loading ? (
              <WhiteSpinner size={"large"} />
            ) : (
              <LuRefreshCcw
                className="text-2xl cursor-pointer"
                onClick={() => setFetchAgain(!fetchAgain)}
              />
            )}

            <IoFilter className="text-2xl cursor-pointer" />
          </div>
          {/* {!loading ? ( */}
          <>
            {cases.map(
              (data, index) => (
                // data.data.detectedInMicrowaveDopler ||
                // data.data.detectedInThermalImage ||
                // data.data.harmfulGasDetected ? (
                <ListItem data={data.data} index={index} />
                // <ListItem data={data.data} index={index} />
              )
              // ) : null
            )}
          </>
          {/* ) : ( */}
          {/* <PulseLoader repeat={10} /> */}
          {/* )} */}
        </div>
        <div className="flex w-6/12  min-h-dvh">
          {/* {loading ? (
            <div className="flex h-full w-full items-center justify-center text-xl text-blue-600 font-thin">
              Loading maps for you...
            </div>
          ) : ( */}
          <div className="w-full flex flex-col">
            {/* Floating div above the map */}
            <div className="flex gap-3 w-full justify-center items-center py-2">
              <p className="text-xl font-thin text-blue-600">Pointers</p>
              <Switch
                checked={isHeatmap}
                onChange={() => handleToggle()}
                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600  cursor-pointer"
              >
                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
              </Switch>
              <p className="text-xl font-thin text-blue-600">Heatmap</p>
            </div>

            {/* Map container */}
            <div className="w-full h-full">
              <MapWithPointers cases={cases} isHeatmap={isHeatmap} />
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Manage;
