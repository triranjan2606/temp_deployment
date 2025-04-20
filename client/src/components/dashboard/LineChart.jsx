import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register only required components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: [
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
      "11:45",
      "12:00",
      "12:15",
    ],
    datasets: [
      {
        label: "Victims Evacuated",
        data: [12, 9, 6, 7, 15, 4, 18, 14, 15, 6, 19],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      //custom_canvas_background_color: {}, // Enable the plugin
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Time",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Victims Evacuated",
        },
      },
    },
  };

  return (
    <div className="px-5 bg-white rounded-xl shadow-md w-full  h-full">
      {/* <h2 className="text-lg font-semibold mb-4">Evacuation Progress</h2> */}
      <Line data={data} options={options} className="" />
    </div>
  );
};

export default LineChart;
