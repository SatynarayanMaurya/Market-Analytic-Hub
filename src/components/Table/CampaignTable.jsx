
import React, { useState } from "react";
import { exportToPDF } from "../../Export/ExportToPdf";
import { exportToCSV } from "../../Export/ExportToCsv";

const PAGE_SIZE = 4;

export default function CampaignTable({ campaignsData, isDark }) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("All");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter
  const filteredData =
    filter === "All"
      ? campaignsData
      : campaignsData.filter((row) => row.status === filter);

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];

    // Convert dates to comparable values if sorting by date
    if (sortField === "date") {
      return sortOrder === "asc"
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    // Sort numerically or alphabetically
    return sortOrder === "asc"
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1;
  });

  // Pagination
  const startIndex = page * PAGE_SIZE;
  const visibleData = sortedData.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className={`${isDark ? "bg-zinc-800" : "bg-white border border-gray-200"} p-4 rounded-xl shadow w-full`}>
      <div className="flex justify-between  items-center ">
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-zinc-800"} mb-4`}>
          Campaigns
        </h2>
        <div className="flex  gap-3 ">
          <button
            onClick={() => exportToPDF(campaignsData)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md 
              bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 
              dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            📄 Export to PDF
          </button>

          <button
            onClick={() => exportToCSV(campaignsData)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md 
              bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 
              dark:bg-green-500 dark:hover:bg-green-600"
          >
            📁 Export to CSV
          </button>
        </div>
      </div>


      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 my-4 text-sm">
        <div>
          <label className={`mr-2 font-medium ${isDark?"text-white border-zinc-100":"text-zinc-700"}`}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
            className={`border px-2 py-1 rounded ${isDark?"text-white border-zinc-100":"text-zinc-700"}`}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <div>
          <label className={`mr-2 font-medium ${isDark?"text-white border-zinc-400":"text-zinc-700"}`}>Sort by:</label>
          <select
            value={sortField || ""}
            onChange={(e) => {
              setSortField(e.target.value);
              setSortOrder("asc");
              setPage(0);
            }}
            className={`border px-2 py-1 rounded ${isDark?"text-white border-zinc-100":"text-zinc-700"}`}
          >
            <option value="">None</option>
            <option value="budget">Budget</option>
            <option value="revenue">Revenue</option>
            <option value="date">Date</option>
          </select>

          {sortField && (
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className={`ml-2 px-2 py-1 border rounded ${isDark?"text-white":"text-zinc-700"}`}
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          )}
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className={`min-w-full text-sm ${isDark ? "text-zinc-200" : "text-zinc-700"}`}>
          <thead>
            <tr className="text-left border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 whitespace-nowrap">Campaign</th>
              <th className="py-2">Budget</th>
              <th className="py-2">Revenue</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, idx) => (
              <tr key={idx} className="border-b border-zinc-100 dark:border-zinc-700">
                <td className="py-2">{row.name}</td>
                <td className="py-2">{row.budget}</td>
                <td className="py-2">{row.revenue}</td>
                <td
                  className={`py-2 ${
                    row.status === "Active" ? "text-green-500" : "text-zinc-400"
                  }`}
                >
                  {row.status}
                </td>
                <td className="py-2">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {visibleData.map((row, idx) => (
          <div
            key={idx}
            className={`p-4 px-8 ${isDark ? "text-[#e3e2e2]" : "text-zinc-600"} rounded-md border ${
              isDark ? "border-zinc-700" : "border-zinc-200 shadow"
            }`}
          >
            <div className="mb-2">
              <span className={`font-medium ${isDark ? "text-white" : "text-zinc-600"}`}>Campaign:</span> {row.name}
            </div>
            <div>
              <span className={`font-medium ${isDark ? "text-white" : "text-zinc-600"}`}>Budget:</span> {row.budget}
            </div>
            <div>
              <span className={`font-medium ${isDark ? "text-white" : "text-zinc-600"}`}>Revenue:</span> {row.revenue}
            </div>
            <div>
              <span className={`font-medium ${isDark ? "text-white" : "text-zinc-600"}`}>Status:</span>{" "}
              <span
                className={`${row.status === "Active" ? "text-green-500" : "text-zinc-400"}`}
              >
                {row.status}
              </span>
            </div>
            <div>
              <span className={`font-medium ${isDark ? "text-white" : "text-zinc-600"}`}>Date:</span> {row.date}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={`flex justify-center gap-4 items-center pt-4 text-sm ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className={`px-3 py-1 rounded-md ${
            page === 0
              ? "opacity-50 cursor-not-allowed"
              : `${isDark?"hover:bg-zinc-700":"hover:bg-zinc-100"} `
          }`}
        >
          Previous
        </button>
        <p>{page+1}/{Math.ceil(sortedData.length/PAGE_SIZE)}</p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={startIndex + PAGE_SIZE >= sortedData.length}
          className={`px-3 py-1 rounded-md ${
            startIndex + PAGE_SIZE >= sortedData.length
              ? "opacity-50 cursor-not-allowed"
              : `${isDark?"hover:bg-zinc-700":"hover:bg-zinc-100"}`
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
