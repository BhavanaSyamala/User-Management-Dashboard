import React from "react";

function Home({ setView }) {
  return (
    <div className="home-container">
      <h1>Welcome to User Management Dashboard</h1>
      <div className="home-buttons">
        <button onClick={() => setView("dashboard")}>Go to Dashboard</button>
        <button onClick={() => setView("addUser")}>Add New User</button>
      </div>
    </div>
  );
}

export default Home;
