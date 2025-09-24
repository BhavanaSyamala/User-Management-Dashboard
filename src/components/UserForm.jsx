import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";

const UserForm = ({ editingUser, setEditingUser, setUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setCompany(editingUser.company || "");
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !company) {
      alert("All fields are required!");
      return;
    }

    const userData = { name, email, company };

    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u))
        );
        setEditingUser(null);
      } else {
        const res = await addUser(userData);
        setUsers((prev) => [...prev, { id: res.data.id, ...userData }]);
      }

      setName("");
      setEmail("");
      setCompany("");
    } catch {
      alert("Failed to save user.");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Company:</label>
      <input
        type="text"
        placeholder="Enter company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button type="submit">{editingUser ? "Update" : "Add"} User</button>
    </form>
  );
};

export default UserForm;
