import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

/**
 * Dashboard Component
 * * Provides a comprehensive visual overview of financial health.
 * Features:
 * - Real-time statistics calculation (Balance, Income, Expenses, Savings Rate).
 * - Multi-chart integration (Bar, Doughnut, Line) using Chart.js.
 * - Dynamic rendering based on active tabs (Overview vs. Insights).
 * - Automatic cleanup of chart instances to prevent memory leaks.
 */
function Dashboard({ transactions, tab }) {
  // 🔹 REFS: Persistent storage for Chart instances and DOM nodes
  const barCanvasRef = useRef(null);
  const pieCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);
  
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  // 🔹 HELPER: CURRENCY FORMATTER
  // Formats numbers to Indian Rupee (INR) standard without decimals
  const fmt = (n) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(n);
  };

  // 🔹 LOGIC: AGGREGATE STATISTICS
  // Calculates high-level totals and the savings rate percentage
  const getStats = () => {
    if (!transactions.length) return { income: 0, expenses: 0, balance: 0, savings: 0 };
    
    let income = 0, expenses = 0;
    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expenses += Math.abs(t.amount);
    });

    return {
      income,
      expenses,
      balance: income - expenses,
      savings: income > 0 ? Math.round((1 - expenses / income) * 100) : 0
    };
  };

  // 🔹 LOGIC: MONTHLY TIME-SERIES DATA
  // Filters and maps data for the Q1 period (Jan, Feb, Mar)
  const getMonthly = () => {
    const months = ["Jan", "Feb", "Mar"];
    const income = [0, 0, 0], expenses = [0, 0, 0];
    transactions.forEach(t => {
      const m = parseInt(t.date.split("-")[1]) - 1;
      if (m >= 0 && m <= 2) {
        if (t.type === "income") income[m] += t.amount;
        else expenses[m] += Math.abs(t.amount);
      }
    });
    return { months, income, expenses };
  };

  // 🔹 LOGIC: CATEGORICAL DISTRIBUTION
  // Prepares data for the Doughnut chart by summing expenses per category
  const getCategories = () => {
    const map = {};
    transactions.forEach(t => {
      if (t.type === "expense") {
        map[t.cat] = (map[t.cat] || 0) + Math.abs(t.amount);
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };

  // 🔹 DATA INITIALIZATION
  const stats = getStats();
  const monthly = getMonthly();
  const categories = getCategories();
  const topCat = categories[0];

  // 🔥 SIDE EFFECT: CHART RENDERING & LIFECYCLE
  // Manages the initialization, update, and destruction of charts
  useEffect(() => {
    // Shared styling for Y and X axis across different charts
    const commonScales = {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: {
          color: "#7b8099",
          font: { family: "'DM Mono', monospace", size: 11 },
          callback: (v) => `₹${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`
        }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#7b8099", font: { family: "'DM Mono', monospace", size: 11 } }
      }
    };

    // --- OVERVIEW: BAR CHART (Income vs Expenses) ---
    if (tab === "overview" && barCanvasRef.current) {
      if (barChartRef.current) barChartRef.current.destroy();
      barChartRef.current = new Chart(barCanvasRef.current, {
        type: "bar",
        data: {
          labels: monthly.months,
          datasets: [
            {
              label: "Income",
              data: monthly.income,
              backgroundColor: "#6ee7b733",
              borderColor: "#6ee7b7",
              borderWidth: 2,
              borderRadius: 6,
              barPercentage: 0.6,
            },
            {
              label: "Expenses",
              data: monthly.expenses,
              backgroundColor: "#fb718533",
              borderColor: "#fb7185",
              borderWidth: 2,
              borderRadius: 6,
              barPercentage: 0.6,
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: commonScales }
      });
    }

    // --- OVERVIEW: DONUT CHART (Spending Breakdown) ---
    if (tab === "overview" && pieCanvasRef.current) {
      if (pieChartRef.current) pieChartRef.current.destroy();
      pieChartRef.current = new Chart(pieCanvasRef.current, {
        type: "doughnut",
        data: {
          labels: categories.map(c => c[0]),
          datasets: [{
            data: categories.map(c => c[1]),
            backgroundColor: ["#818cf8", "#f97316", "#6ee7b7", "#fbbf24", "#38bdf8"],
            borderWidth: 3,
            borderColor: "#13161e"
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: "80%", plugins: { legend: { display: false } } }
      });
    }

    // --- INSIGHTS: LINE CHART (Net Trend) ---
    if (tab === "insights" && lineCanvasRef.current) {
      if (lineChartRef.current) lineChartRef.current.destroy();
      const net = monthly.months.map((_, i) => monthly.income[i] - monthly.expenses[i]);
      lineChartRef.current = new Chart(lineCanvasRef.current, {
        type: "line",
        data: {
          labels: monthly.months,
          datasets: [{
            label: "Net Balance",
            data: net,
            borderColor: "#6ee7b7",
            backgroundColor: "#6ee7b711",
            fill: true,
            tension: 0.4,
            pointRadius: 4
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: commonScales }
      });
    }

    // CLEANUP: Destroy all chart instances on component unmount
    return () => {
      [barChartRef, pieChartRef, lineChartRef].forEach(ref => {
        if (ref.current) ref.current.destroy();
      });
    };
  }, [tab, transactions]);

  // 🔹 GUARD: EMPTY STATE
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>No Data to Display</h3>
        <p>Start by adding your first transaction in the Transactions tab.</p>
      </div>
    );
  }

  return (
    <>
      {/* KPI SUMMARY CARDS */}
      <div className="cards-grid">
        <div className="card accent-green">
          <div className="card-label">TOTAL BALANCE</div>
          <div className="card-value">{fmt(stats.balance)}</div>
        </div>
        <div className="card accent-purple">
          <div className="card-label">TOTAL INCOME</div>
          <div className="card-value">{fmt(stats.income)}</div>
        </div>
        <div className="card accent-red">
          <div className="card-label">TOTAL EXPENSES</div>
          <div className="card-value">{fmt(stats.expenses)}</div>
        </div>
        <div className="card accent-orange">
          <div className="card-label">SAVINGS RATE</div>
          <div className="card-value">{stats.savings}%</div>
        </div>
      </div>

      {/* OVERVIEW SECTION: MAIN GRAPHS */}
      {tab === "overview" && (
        <div className="charts-row">
          <div className="chart-card">
            <div className="chart-title">MONTHLY INCOME vs EXPENSES</div>
            <div className="chart-wrap"><canvas ref={barCanvasRef}></canvas></div>
          </div>
          <div className="chart-card">
            <div className="chart-title">SPENDING BREAKDOWN</div>
            <div className="chart-wrap"><canvas ref={pieCanvasRef}></canvas></div>
          </div>
        </div>
      )}

      {/* INSIGHTS SECTION: METRICS & TRENDS */}
      {tab === "insights" && (
        <>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-title">TOP CATEGORY</div>
              <div className="insight-value" style={{color: 'var(--accent3)'}}>{topCat?.[0] || "N/A"}</div>
            </div>
            <div className="insight-card">
              <div className="insight-title">TRANSACTIONS</div>
              <div className="insight-value">{transactions.length}</div>
            </div>
          </div>
          <div className="chart-card" style={{ marginTop: "20px" }}>
            <div className="chart-title">MONTHLY BALANCE TREND</div>
            <div className="chart-wrap"><canvas ref={lineCanvasRef}></canvas></div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;