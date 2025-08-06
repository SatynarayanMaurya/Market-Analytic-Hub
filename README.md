# Market Analytic Hub 📊

Market Analytic Hub is a modern, responsive React dashboard application designed for monitoring and managing advertising campaigns. It supports features like data visualization, dark mode toggling, data export (PDF/CSV), pagination, sorting, and mobile responsiveness.

## 🚀 Features

- ⚡ Fully responsive dashboard layout
- 🌗 Dark Mode toggle with persistence (localStorage)
- 📈 Campaign data visualization (charts and tables)
- 📤 Export data to **PDF** and **CSV**
- 🔍 Pagination, filtering, and sorting in campaign table
- 🌓 Dark and light theme styling using Tailwind CSS
- 📱 Optimized for both desktop and mobile

---

## 📂 Project Structure

```bash
Market-Analytic-Hub/
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Logos and image files
│   ├── components/            # Reusable components (Sidebar, TopNav, ChartCard, CampaignTable, etc.)
│   ├── data/                  # Mock data using @faker-js/faker
│   ├── pages/
│   │   └── Dashboard.jsx      # Main dashboard page
│   ├── Export/
│   │   ├── exportToCSV.js     # CSV export function
│   │   └── exportToPdf.js     # PDF export function
│   ├── App.jsx                # Root application
│   ├── index.css              # Tailwind and global styles
│   └── main.jsx               # Entry point for Vite
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **React.js** ⚛️
- **Tailwind CSS** 💨
- **Chart.js** 📊
- **jsPDF** & **jspdf-autotable** 📄 (for PDF export)
- **faker.js** 🧪 (for generating mock data)
- **FileSaver.js** & **Blob** (for CSV export)

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
https://github.com/SatynarayanMaurya/Market-Analytic-Hub.git
cd Market-Analytic-Hu
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Run the App
```bash
npm run dev
```
## 🎨 Theme Support

This dashboard supports **dark mode**. Click on the "Change the Theme" button to toggle between Light and Dark themes. The user's preference is stored in `localStorage`.

## 📤 Export Features

You can export the campaign table:

- 📄 As PDF – uses `jsPDF` & `autoTable`
- 📊 As CSV – uses `papaparse`

