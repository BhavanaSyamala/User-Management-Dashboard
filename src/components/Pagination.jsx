import React from "react";

const Pagination = ({ total, rowsPerPage, setRowsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <div style={{ marginTop: "10px" }}>
      Rows per page: 
      <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))}>
        {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <div>
        Page: {currentPage} / {totalPages}
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
