export const exportToCSV = (data, filename = "campaigns.csv") => {
  const csvHeader = ["Campaign", "Budget", "Revenue", "Status", "Date"];
  const csvRows = [
    csvHeader,
    ...data.map((item) => [
      item.name,
      item.budget,
      item.revenue,
      item.status,
      item.date,
    ]),
  ];

  const csvContent = csvRows
    .map((row) => row.map(String).map(v => `"${v}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
