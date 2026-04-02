function Nav({ tab, setTab }) {
  return (
    <div className="nav">
      <button
        className={`nav-btn ${tab === "overview" ? "active" : ""}`}
        onClick={() => setTab("overview")}
      >
        Overview
      </button>

      <button
        className={`nav-btn ${tab === "transactions" ? "active" : ""}`}
        onClick={() => setTab("transactions")}
      >
        Transactions
      </button>

      <button
        className={`nav-btn ${tab === "insights" ? "active" : ""}`}
        onClick={() => setTab("insights")}
      >
        Insights
      </button>
    </div>
  );
}

export default Nav;