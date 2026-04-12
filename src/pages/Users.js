import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const BASE_URL = "https://portfolio-backend-1-b71s.onrender.com";

  // GET USERS
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ADD USER
  const addUser = () => {
    if (!email) return;

    axios
      .post(`${BASE_URL}/api/users`, { email })
      .then((res) => {
        setUsers([...users, res.data]);
        setEmail("");
      })
      .catch((err) => console.log(err));
  };

  // DELETE USER ✅ FIXED
  const deleteUser = (id) => {
    axios
      .delete(`${BASE_URL}/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((u) => u._id !== id));

        // 🔥 FIX: prevent crash
        if (editId === id) {
          setEditId(null);
          setEditEmail("");
        }
      })
      .catch((err) => console.log(err));
  };

  // UPDATE USER
  const updateUser = () => {
    if (!editId) return;

    axios
      .put(`${BASE_URL}/api/users/${editId}`, {
        email: editEmail,
      })
      .then((res) => {
        setUsers(users.map((u) => (u._id === editId ? res.data : u)));
        setEditId(null);
        setEditEmail("");
      })
      .catch((err) => console.log(err));
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
        <div key={u._id} style={{ margin: "10px 0" }}>
          <span>{u.email}</span>

          <button
            onClick={() => {
              setEditId(u._id);
              setEditEmail(u.email);
            }}
          >
            Edit
          </button>

          <button onClick={() => deleteUser(u._id)}>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}

export default Users;