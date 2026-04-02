# 🏦 FINFLOW — Personal Finance Dashboard

FINFLOW is a responsive React-based finance dashboard designed to track income, expenses, and overall financial health.
It focuses on clean UI, structured state management, and role-based functionality.

---

## 🚀 Features

### 📊 Dashboard Overview
- KPI cards: Balance, Income, Expenses, Savings Rate
- Real-time updates based on transaction data

### 📈 Data Visualization
- Monthly Income vs Expense chart
- Category-wise expense breakdown
- Net balance trend

### 🔐 Role-Based Access (RBAC)
- **Admin:** Full CRUD access (Add, Edit, Delete)
- **Viewer:** Read-only access

### 🧾 Transaction Management
- Search by description
- Filter by date range
- Group by category/type
- Export data (CSV, JSON)

---

## 🎨 Design & User Experience
- Clean dark-themed UI
- Clear visual hierarchy for financial insights
- Smooth interactions and intuitive navigation

---

## 📱 Responsiveness
- Mobile-first design
- Works across mobile, tablet, and desktop
- Layout built using Flexbox and Grid

---

## ⚙️ Technical Implementation

### 🛠 Tech Stack
- React (Functional Components + Hooks)
- Chart.js (Data visualization)
- CSS3 (Custom styling with variables)

### 🧠 State Management
- Centralized state in `App.jsx`
- Props-based data flow
- Single source of truth for transactions

### 🏗 Code Quality
- Modular component structure
- Reusable components
- Clean separation of concerns

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Modal.jsx
│   ├── Nav.jsx
│   └── Topbar.jsx
├── App.jsx
├── data.js
├── styles.css
└── main.jsx

---

## ⚡ Setup Instructions

git clone https://github.com/trushantrathod/Finance-Dashboard.git
cd Finance-Dashboard
npm install
npm run dev

---

## 📝 Additional Notes

- Handles empty/no-data states gracefully
- Chart instances cleaned up to avoid memory leaks
- Designed for easy backend integration

---

## 👨‍💻 Author
Trushant Rathod
