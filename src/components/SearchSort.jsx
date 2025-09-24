import React from "react";

const SearchSort = ({ searchTerm, setSearchTerm }) => (
  <div>
    <input
      type="text"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      style={{ marginBottom: "10px", width: "50%" }}
    />
  </div>
);

export default SearchSort;
