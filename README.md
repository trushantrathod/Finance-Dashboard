# 🏦 FINFLOW: Personal Finance Dashboard

FINFLOW is a high-performance, responsive personal finance management application built with React. It enables users to track their financial health through real-time analytics, role-based access control, and advanced transaction management.

---

## 🚀 Features

### 📊 Executive Overview
- Real-time KPI cards:
  - Total Balance
  - Total Income
  - Total Expenses
  - Savings Rate (auto-calculated)

### 📈 Visual Analytics
- Interactive charts using Chart.js:
  - Monthly Income vs Expenses
  - Category-wise Spending Breakdown
  - Net Balance Trends

### 🔐 Role-Based Access (RBAC)
- **Admin**
  - Full CRUD access
- **Viewer**
  - Read-only mode

### 🧾 Transaction Management
- Search transactions by description
- Filter by date range
- Group by category or type
- Export data:
  - CSV
  - JSON

### 🎨 UI/UX Highlights
- Dark mode interface
- Responsive (mobile-first design)
- Clean typography (Syne & DM Mono)
- Smooth animations & hover effects
- Optimized layout for all screen sizes

---

## 🛠 Tech Stack

- **Frontend:** React (Hooks & Functional Components)
- **Styling:** CSS3 (Custom + Variables)
- **Charts:** Chart.js
- **Formatting:** Intl.NumberFormat (INR support)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
git clone https://github.com/your-username/finflow.git
cd finflow

### 2. Install Dependencies
npm install

### 3. Run Development Server
npm run dev

### 4. Build for Production
npm run build

---

## 🏗 Architecture

- **Centralized State Management**
  - Managed in `App.jsx` (single source of truth)

- **Component-Based Structure**
  - Modular and reusable components

- **Performance Optimization**
  - Chart cleanup using `useEffect`
  - Efficient rendering

- **Error Handling**
  - Graceful handling of empty/no-data states

---

## 📂 Project Structure

src/
├── components/
│   ├── Dashboard.jsx
│   ├── Modal.jsx
│   ├── Nav.jsx
│   ├── Topbar.jsx
│   └── Transactions.jsx
├── data.js
├── App.jsx
├── styles.css
└── main.jsx

---

## 📱 Responsiveness

- Mobile-first design
- Works across phones, tablets, and desktops
- Optimized layouts using Flexbox & Grid

---

## 📝 Additional Notes

- Accessibility-friendly design (semantic HTML + contrast)
- Local state used (ready for backend integration)
- Easily extendable to Firebase / Node.js

---

## 🔮 Future Enhancements

- Backend integration (Firebase / Express)
- User authentication
- Budget tracking & alerts
- Multi-user support

---

## 💡 Author

Developed using React with focus on performance, scalability, and clean UI.
