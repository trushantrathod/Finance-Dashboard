import { useState } from "react";
import Topbar from "./components/Topbar";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import { initialData } from "./data";

function App() {
  // 🔹 Role State (Admin / Viewer)
  const [role, setRole] = useState("admin");

  // 🔹 Navigation State (Overview / Transactions / Insights)
  const [tab, setTab] = useState("overview");

  // 🔹 Transactions Data
  const [transactions, setTransactions] = useState(initialData);

  return (
    <div id="app">
      
      {/* 🔝 TOPBAR */}
      <Topbar role={role} setRole={setRole} />

      {/* 🧭 NAVIGATION */}
      <Nav tab={tab} setTab={setTab} />

      {/* 📦 MAIN CONTENT */}
      <div className="main">

        {/* 📊 OVERVIEW + INSIGHTS */}
        {(tab === "overview" || tab === "insights") && (
          <Dashboard 
            transactions={transactions} 
            tab={tab} 
          />
        )}

        {/* 💳 TRANSACTIONS */}
        {tab === "transactions" && (
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
            role={role}
          />
        )}

      </div>
    </div>
  );
}

export default App;