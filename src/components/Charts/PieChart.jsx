import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartComponent({ data,isDark }) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-zinc-500">Loading chart...</div>;
  }

  const labels = Object.keys(data);
  const values = Object.values(data).map(Number);
  const total = values.reduce((acc, v) => acc + v, 0);
  const centerValue = Math.round((values[0] / total) * 100); // e.g., Direct %

  const colors = ["#3B82F6", "#8B5CF6", "#06B6D4"];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // Donut thickness
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  return (
    <div >
      <p className={`text-lg pl-4 pt-4 font-semibold ${isDark ?"text-white ":"text-zinc-800"}  mb-4 `}>Traffic Sources</p>
    
    <div className={`w-9/12 mx-auto pb-4 ${!isDark ?"bg-white":"bg-zinc-800 shadow"}  rounded-xl   flex flex-col md:flex-row justify-between items-center gap-6`}>
      {/* Legend Section */}
      
      <div className="space-y-2 w-full md:w-1/2 ">
        {labels.map((label, idx) => (
          <div key={label} className={`flex items-center justify-between text-lg ${isDark?"text-zinc-300":"text-zinc-500"}  `}>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[idx] }}
              />
              {label}
            </div>
            <span>{values[idx]}%</span>
          </div>
        ))}
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative w-40 h-40">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-xl font-semibold text-zinc-800 dark:text-white">{centerValue}%</p>
            <p className="text-xs text-zinc-400">Ssc</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
