import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // GET users
  useEffect(() => {
    axios
      .get("https://portfolio-backend-e0d6.onrender.com/api/users")
      .then((res) => setUsers(res.data));
  }, []);

  // ADD user
  const addUser = () => {
    if (!email) return;

    axios
      .post("https://portfolio-backend-e0d6.onrender.com/api/users", { email })
      .then((res) => {
        setUsers([...users, res.data]);
        setEmail("");
      });
  };

  // DELETE user
  const deleteUser = (id) => {
    axios
      .delete(`https://portfolio-backend-e0d6.onrender.com/api/users/${id}`)
      .then(() => setUsers(users.filter((u) => u._id !== id)));
  };

  // UPDATE user
  const updateUser = () => {
    if (!editId) return;

    axios
      .put(
        `https://portfolio-backend-e0d6.onrender.com/api/users/${editId}`,
        { email: editEmail }
      )
      .then((res) => {
        setUsers(users.map((u) => (u._id === editId ? res.data : u)));
        setEditId(null);
        setEditEmail("");
      });
  };

  return (
    <div>
      <h1>Users</h1>

      {/* ADD USER */}
      <h2>Add User</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={addUser}>Add</button>

      {/* EDIT USER */}
      <h2>Edit User</h2>
      <input
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
        placeholder="Update email"
      />
      <button onClick={updateUser}>Update</button>

      {/* USERS LIST */}
      <h2>Users</h2>
      {users.map((u) => (
        <div
          className="card"
          key={u._id}
          style={{ margin: "10px 0" }}
        >
          <span style={{ marginRight: "10px" }}>{u.email}</span>

          <button
            onClick={() => {
              setEditId(u._id);
              setEditEmail(u.email);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteUser(u._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;