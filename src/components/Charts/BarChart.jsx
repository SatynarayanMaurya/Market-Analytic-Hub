// ConversionsBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ data,isDark }) {
  const labels = data?.labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const values = data?.values || [120, 150, 100, 200, 250, 180, 270];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Conversions",
        data: values,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#3B82F6"); // blue-500
          gradient.addColorStop(1, "#6366F1"); // indigo-500
          return gradient;
        },
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: { display: false },
  //   },
  //   scales: {
  //     x: {
  //       ticks: { color: "#9CA3AF" }, // Tailwind gray-400
  //       grid: { display: false },
  //     },
  //     y: {
  //       ticks: {
  //         color: "#9CA3AF",
  //         beginAtZero: true,
  //       },
  //       grid: {
  //         color: "#1F2937", // dark grid lines (gray-800)
  //       },
  //     },
  //   },
  // };

  const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { color: "#9CA3AF" }, // Tailwind gray-400
      grid: { display: false },    // ❌ No vertical grid lines
    },
    y: {
      ticks: {
        color: "#9CA3AF",
        beginAtZero: true,
        callback: (val) => `$${val}`, // Optional: show currency
      },
      grid: {
        display: true,
        color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)", // ✅ theme-aware Y-axis lines
      },
    },
  },
};

  return (
    <div className={` ${isDark ? "bg-zinc-800":"bg-white border border-gray-200"} dark: p-4 rounded-xl shadow w-full`}>
      <h2 className={`text-lg font-semibold ${isDark?"text-white":"text-zinc-800"}  mb-4`}>
        Conversions
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
