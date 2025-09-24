import React, { useState } from "react";

const FilterPopup = ({ filters, setFilters }) => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState(filters.firstName || "");
  const [email, setEmail] = useState(filters.email || "");

  const applyFilters = () => {
    setFilters({ firstName, email });
    setShow(false);
  };

  return (
    <div>
      <button onClick={() => setShow(!show)}>Filters</button>
      {show && (
        <div style={{ border: "1px solid gray", padding: "10px", marginTop: "5px" }}>
          <input
            type="text"
            placeholder="Filter by name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ marginRight: "5px" }}
          />
          <input
            type="text"
            placeholder="Filter by email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ marginRight: "5px" }}
          />
          <button onClick={applyFilters}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default FilterPopup;
