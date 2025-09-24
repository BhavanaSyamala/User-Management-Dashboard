import React, { useState } from "react";

const UserList = ({ users, setEditingUser, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterCompany, setFilterCompany] = useState("All");
  const usersPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key]?.toLowerCase() || "";
    const bValue = b[sortConfig.key]?.toLowerCase() || "";
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Unique companies for dropdown filter
  const uniqueCompanies = ["All", ...new Set(users.map((u) => u.company || ""))];

  // Filtering
  const filteredUsers = sortedUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.company && u.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCompany =
      filterCompany === "All" || u.company === filterCompany;

    return matchesSearch && matchesCompany;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="table-container">
      {/* 🔍 Search + Filter */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by name, email, or company"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={filterCompany}
          onChange={(e) => {
            setFilterCompany(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {uniqueCompanies.map((company, idx) => (
            <option key={idx} value={company}>
              {company || "No Company"}
            </option>
          ))}
        </select>
      </div>

      {/* 📋 Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => requestSort("name")} style={{ cursor: "pointer" }}>
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
            </th>
            <th onClick={() => requestSort("email")} style={{ cursor: "pointer" }}>
              Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
            </th>
            <th onClick={() => requestSort("company")} style={{ cursor: "pointer" }}>
              Company {sortConfig.key === "company" ? (sortConfig.direction === "asc" ? "⬆️" : "⬇️") : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📄 Pagination controls */}
      {filteredUsers.length > usersPerPage && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ marginRight: "10px" }}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
