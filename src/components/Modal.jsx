import { useState, useEffect } from "react";

function Modal({ setShowModal, setTransactions, editData }) {
  // 🔹 Initialize with today's date for better UX
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    desc: "",
    amount: "",
    type: "expense",
    cat: "Food"
  });

  // 🔹 Sync state when editing
  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Basic Validation
    if (!form.date || !form.desc || !form.amount) return;

    setTransactions(prev => {
      if (editData) {
        // Update existing
        return prev.map(t =>
          t.id === editData.id ? { ...form, id: t.id, amount: Number(form.amount) } : t
        );
      } else {
        // Add new
        return [
          ...prev,
          { ...form, id: Date.now(), amount: Number(form.amount) }
        ];
      }
    });

    setShowModal(false);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={(e) => e.target.className === 'modal-overlay' && setShowModal(false)}
    >
      <div className="modal">
        <h3 className="modal-title" style={{ marginBottom: "20px" }}>
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h3>

        {/* 🔹 ROW 1: DATE & AMOUNT */}
        <div className="form-row">
          <div className="form-group">
            <label className="card-label">DATE</label>
            <input
              className="form-input"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="card-label">AMOUNT (₹)</label>
            <input
              className="form-input"
              type="number"
              name="amount"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 🔹 ROW 2: DESCRIPTION */}
        <div className="form-group" style={{ marginBottom: "12px" }}>
          <label className="card-label">DESCRIPTION</label>
          <input
            className="form-input"
            type="text"
            name="desc"
            placeholder="e.g. Monthly Rent"
            value={form.desc}
            onChange={handleChange}
          />
        </div>

        {/* 🔹 ROW 3: TYPE & CATEGORY */}
        <div className="form-row">
          <div className="form-group">
            <label className="card-label">TYPE</label>
            <select
              className="form-input"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label className="card-label">CATEGORY</label>
            <select
              className="form-input"
              name="cat"
              value={form.cat}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Housing</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Health</option>
              <option>Entertainment</option>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* 🔹 ACTIONS */}
        <div style={{ 
          marginTop: "24px", 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: "10px" 
        }}>
          <button 
            className="btn btn-ghost" 
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button className="btn" onClick={handleSubmit}>
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;