import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data));
  }, []);

  const addUser = () => {
    axios.post("http://localhost:5000/api/users", { email })
      .then(res => {
        setUsers([...users, res.data]);
        setEmail("");
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => setUsers(users.filter(u => u._id !== id)));
  };

  const updateUser = () => {
    axios.put(`http://localhost:5000/api/users/${editId}`, { email: editEmail })
      .then(res => {
        setUsers(users.map(u => u._id === editId ? res.data : u));
        setEditId(null);
        setEditEmail("");
      });
  };

  return (
    <div>
        <h1>Users</h1>
      <h2>Add User</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={addUser}>Add</button>

      <h2>Edit User</h2>
      <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
      <button onClick={updateUser}>Update</button>

      <h2>Users</h2>
      {users.map(u => (
<div className="card" key={u._id}>          {u.email}
          <button onClick={() => {
            setEditId(u._id);
            setEditEmail(u.email);
          }}>Edit</button>
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Users;