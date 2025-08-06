import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (data) => {
  const doc = new jsPDF();
  const tableColumn = ["Campaign", "Budget", "Revenue", "Status", "Date"];
  const tableRows = data.map(item => [
    item.name,
    item.budget,
    item.revenue,
    item.status,
    item.date,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    startY: 20,
  });

  doc.save("campaigns.pdf");
};
