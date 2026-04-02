import { useState } from "react";
import Modal from "./Modal";

/**
 * Transactions Component
 * Handles the display, filtering, grouping, and exporting of financial records.
 * * @param {Array} transactions - The list of transaction objects.
 * @param {Function} setTransactions - State setter to update the transaction list.
 * @param {String} role - User role ('admin' or 'viewer') to determine edit permissions.
 */
function Transactions({ transactions, setTransactions, role }) {
  // 🔹 STATE MANAGEMENT
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 LOGIC: FILTERING
  // Filters transactions based on the search string and the selected date range.
  const filtered = transactions.filter(t => {
    const matchesSearch = t.desc.toLowerCase().includes(search.toLowerCase());
    const matchesDate = (!startDate || t.date >= startDate) && (!endDate || t.date <= endDate);
    return matchesSearch && matchesDate;
  });

  // 🔹 LOGIC: GROUPING
  // Organizes filtered data into categories (e.g., by Category or Type) for display.
  const getGroupedData = () => {
    if (groupBy === "none") return { "All Records": filtered };
    return filtered.reduce((acc, t) => {
      const key = t[groupBy] || "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(t);
      return acc;
    }, {});
  };

  const grouped = getGroupedData();

  // 🔹 UTILITY: EXPORT FUNCTIONALITY
  // Generates and downloads a file (CSV or JSON) containing the currently filtered data.
  const handleExport = (format) => {
    if (!filtered.length) return;
    let content = "";
    const fileName = `finflow_export_${new Date().toISOString().split('T')[0]}`;

    if (format === 'json') {
      content = JSON.stringify(filtered, null, 2);
    } else {
      const headers = "Date,Description,Category,Type,Amount\n";
      const rows = filtered.map(t => `${t.date},"${t.desc}",${t.cat},${t.type},${t.amount}`).join("\n");
      content = headers + rows;
    }

    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${format}`;
    link.click();
  };

  // 🔹 EVENT HANDLERS
  const openAdd = () => { setEditData(null); setShowModal(true); };
  const openEdit = (tx) => { setEditData(tx); setShowModal(true); };
  const deleteTx = (id) => setTransactions(prev => prev.filter(t => t.id !== id));

  return (
    <>
      {/* SECTION HEADER & EXPORT TOOLS */}
      <div className="section-header">
        <div className="section-title">Transactions ({filtered.length})</div>
        <div className="export-tools">
          <button className="btn btn-ghost" onClick={() => handleExport('csv')}>Export CSV</button>
          <button className="btn btn-ghost" style={{ marginLeft: "8px" }} onClick={() => handleExport('json')}>JSON</button>
        </div>
      </div>

      {/* ADVANCED FILTER BAR */}
      <div className="card filters-grid" style={{ marginBottom: "20px" }}>
        <div className="filter-group">
          <label className="card-label">SEARCH</label>
          <input className="filter-input" placeholder="Find..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        
        <div className="filter-group">
          <label className="card-label">DATE RANGE</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input type="date" className="filter-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" className="filter-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="filter-group">
          <label className="card-label">GROUP BY</label>
          <select className="filter-input" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="none">None</option>
            <option value="cat">Category</option>
            <option value="type">Type</option>
          </select>
        </div>

        {role === "admin" && <button className="btn" onClick={openAdd}>+ Add</button>}
      </div>

      {/* DATA DISPLAY: GROUPED TABLES */}
      {filtered.length === 0 ? (
        <div className="card empty">No transactions found matching filters.</div>
      ) : (
        Object.entries(grouped).map(([groupName, items]) => (
          <div key={groupName} style={{ marginBottom: "24px" }}>
            {groupBy !== "none" && <div className="group-title">{groupName.toUpperCase()}</div>}
            <div className="card" style={{ overflowX: "auto", padding: "0" }}>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                    {role === "admin" && <th style={{ textAlign: "right" }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {items.map((t) => (
                    <tr key={t.id}>
                      <td className="mono">{t.date}</td>
                      <td>{t.desc}</td>
                      <td><span className="cat-pill">{t.cat}</span></td>
                      <td className="mono" style={{ color: t.type === 'income' ? 'var(--success)' : 'var(--danger)' }}>{t.type}</td>
                      <td style={{ textAlign: "right" }} className={t.type === 'income' ? 'income-amt' : 'expense-amt'}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(t.amount)}
                      </td>
                      {role === "admin" && (
                        <td style={{ textAlign: "right" }}>
                          <button className="btn btn-edit" onClick={() => openEdit(t)}>Edit</button>
                          <button className="btn btn-delete" style={{ marginLeft: "6px", backgroundColor: "var(--danger)" }} onClick={() => deleteTx(t.id)}>Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* MODAL FOR ADDING/EDITING */}
      {showModal && <Modal setShowModal={setShowModal} setTransactions={setTransactions} editData={editData} />}
    </>
  );
}

export default Transactions;