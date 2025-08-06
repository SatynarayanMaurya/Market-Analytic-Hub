import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function RevenueChart({ data ,isDark}) {
  const labels = data?.labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Jul","Aug"];
  const values = data?.values || [0, 1800, 1600, 2600, 2200, 3900, 4800,4400,5000];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: values,
        borderColor: "#3B82F6", // Tailwind blue-500
        backgroundColor: "transparent",
        tension: 0.4, // smooth curve
        pointRadius: 0, // hide points
        borderWidth: 3,
        paddingBottom:8
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        color: "#9CA3AF", // text color for Y-axis
        callback: (val) => `$${val}`,
      },
      grid: {
        display: true, // ✅ show horizontal (Y) lines
        color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)", // grid line color for dark/light
      },
    },
    x: {
      ticks: {
        color: "#9CA3AF", // text color for X-axis
      },
      grid: {
        display: false, // ❌ hide vertical (X) lines
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};


  return (
    <div className={`${isDark ? "bg-zinc-800 shadow":"bg-white"}   p-4 rounded-xl  w-full lg:h-92 h-48`}>
      <h2 className={`text-lg font-semibold ${isDark ? "text-white":"text-zinc-800"}    mb-4`}>
        Revenue
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
