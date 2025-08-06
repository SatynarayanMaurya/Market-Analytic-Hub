
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";


export default function MetricCard({ icon, label, value, percentage, isGrowth = true ,isDark=true}) {
  return (
    <div className={` ${isDark?"bg-zinc-800":"bg-white border border-gray-300"}  shadow rounded-xl p-4 w-full transition-all`}>
      <div className="flex items-center justify-between">
        <div className={`text-sm font-medium ${isDark ? "text-zinc-400":"text-zinc-500"}  `}>{label}</div>
        <div className="text-zinc-400">{icon}</div>
      </div>
      <div className={`mt-2 text-2xl font-semibold ${isDark ? "text-white":"text-zinc-800"} `}>{value}</div>
      {percentage !== undefined && (
        <div
          className={`mt-1 flex items-center text-sm ${
            isGrowth ? "text-green-500" : "text-red-500"
          }`}
        >
          {isGrowth ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="ml-1">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
