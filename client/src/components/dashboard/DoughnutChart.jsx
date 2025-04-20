import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({labels,dataa,textToShow}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        // label: "Victim Status",
        data: dataa,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Rescued
          "rgba(255, 206, 86, 0.6)", // Trapped
          "rgba(255, 99, 132, 0.6)", // Missing
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // ❌ This hides the legend (color indicators)
        // position: "bottom",
      },
    },
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow flex">
      <div className="h-full w-1/3 flex items-center justify-center text-wrap bg-blue-600 text-white rounded-l-2xl">
        <h2 className="text-2xl font-bold mt-4 text-center ">
          {textToShow}
        </h2>
      </div>
      <div className="h-full p-2 border-b-2 border-blue-600 rounded-r-2xl">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
