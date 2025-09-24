import React, { useState } from "react";
import Home from "./pages/Home";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Syamala", email: "Syamala97@gmail.com", company: "Tacnique" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", company: "TechMahendra" },
    { id: 3, name: "Devi ",  email: "devi@example.com", company: "Infosys"},
    { id: 4, name: "Ramya ",  email: "ramya@example.com", company: "wipro"},
    { id: 5, name: "John ",  email: "john@example.com", company: "capgemini"},
    { id: 6, name: "Mani ",  email: "mani@example.com", company: "Tcs"},
    { id: 7, name: "Seetha ",  email: "seetha@example.com", company: "Microsoft"},
    { id: 8, name: "sujatha ",  email: "sujatha@example.com", company: "Google"},
    { id: 9, name: "Hasini ",  email: "hasini@example.com", company: "Bytexl"},
    { id: 10, name: "steve ",  email: "steve@example.com", company: "Accenture"}
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [view, setView] = useState("home"); // home / dashboard / addUser

  return (
    <div className="app-container">
      {view === "home" && <Home setView={setView} />}
      {view === "dashboard" && (
        <div className="dashboard">
          <h1>User Management Dashboard</h1>
          <UserList
            users={users}
            setEditingUser={setEditingUser}
            setUsers={setUsers}
          />
          <button onClick={() => setView("addUser")} style={{marginTop: "20px"}}>
            Add New User
          </button>
          <button onClick={() => setView("home")} style={{marginLeft: "10px"}}>
            Back to Home
          </button>
        </div>
      )}
      {view === "addUser" && (
        <div className="dashboard">
          <h1>Add / Edit User</h1>
          <UserForm
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            setUsers={setUsers}
            setView={setView}
          />
          <button onClick={() => setView("dashboard")} style={{marginTop: "20px"}}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
