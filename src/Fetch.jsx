import React, { useEffect, useState } from "react";
import "./App.css";

function Fetching() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setError(null);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError("Failed to fetch data. Check your internet."));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Info</h1>
      {error && <p className="error">{error}</p>}
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="card">
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
          </div>
        ))}
      </div>
      <button className="reload-btn" onClick={fetchUsers}>Reload Data</button>
    </div>
  );
}

export default Fetching;