import React, { useEffect, useState } from "react";
import MetricCard from "../components/Cards/MetricCard";
import PieChartComponent from "../components/Charts/PieChart";
import { DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react";
import { mockMetrics, trafficSources ,generateCampaignData} from "../data/mockData";
import RevenueChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import CampaignTable from "../components/Table/CampaignTable";


export default function Dashboard() {
    const [isDark, setIsDark] = useState(
      localStorage.getItem("theme") === "dark"
    );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  const conversionData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug"],
      values: [120, 150, 100, 200, 250, 180, 270,170],
    };
    
  return (
    <div className={`min-h-screen  ${isDark?"bg-zinc-900":"bg-zinc-100"} p-6 space-y-6`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDark ? "text-white":"text-zinc-800"} `}>Dashboard Overview</h1>
        <button
          onClick={toggleTheme}
          className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-md border transition-colors duration-300
            ${isDark
              ? "bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700"
              : "bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-100"}
          `}
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-10.34l-.71-.71M5.05 18.95l-.71-.71M21 12h-1M4 12H3m16.95 5.05l-.71-.71M5.05 5.05l-.71-.71" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C10.75 4.27 10 6.06 10 8c0 3.31 2.69 6 6 6 1.94 0 3.73-.75 5-2-1.1 4.42-5.18 7.75-10 7.75-5.52 0-10-4.48-10-10S6.48 3 12 3z" />
            </svg>
          )}
          <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
        </button>

      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Revenue"
          value={mockMetrics.revenue}
          percentage={12.3}
          icon={<DollarSign className="w-5 h-5" />}
          isGrowth={true}
          isDark={isDark}
        />
        <MetricCard
          label="Users"
          value={mockMetrics.users}
          percentage={8.6}
          icon={<Users className="w-5 h-5" />}
          isGrowth={true}
          isDark={isDark}
        />
        <MetricCard
          label="Conversions"
          value={mockMetrics.conversions}
          percentage={-3.2}
          icon={<CheckCircle className="w-5 h-5" />}
          isGrowth={false}
          isDark={isDark}
        />
        <MetricCard
          label="Growth"
          value={`${mockMetrics?.growth?.toFixed(2)}%`}
          percentage={mockMetrics.growth?.toFixed(2)}
          icon={<TrendingUp className="w-5 h-5" />}
          isGrowth={true}
          isDark={isDark}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${isDark?"bg-zinc-800":"bg-white border border-gray-300 shadow"} pb-12 lg:pb-0 rounded-xl`}>
            <RevenueChart isDark={isDark}/>
        </div>
        <BarChart data={conversionData} isDark={isDark}/>
      </div>

        <div className={isDark?"bg-zinc-800":"bg-white border border-gray-200 rounded-lg shadow"}>
            <div className="">
                <PieChartComponent data={trafficSources}  isDark={isDark} />
            </div>
        </div>

        <CampaignTable campaignsData={generateCampaignData()} isDark={isDark}/>
    </div>
  );
}
