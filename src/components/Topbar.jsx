import React from "react";

function Topbar({ role, setRole }) {
  return (
    <div className="topbar">
      
      {/* LEFT: BRAND */}
      <div className="topbar-brand">
        FINFLOW
      </div>

      {/* RIGHT: ROLE SECTION */}
      <div className="topbar-right">
        
        {/* Role Badge */}
        <span className="role-badge">
          {role.toUpperCase()}
        </span>

        {/* Role Selector */}
        <select
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

      </div>
    </div>
  );
}

export default Topbar;