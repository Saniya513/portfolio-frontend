import React, { useEffect, useState } from "react";
import axios from "axios";

function References() {
  const [references, setReferences] = useState([]);
  const [refFirst, setRefFirst] = useState("");
  const [refLast, setRefLast] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [editRefId, setEditRefId] = useState(null);
  const [editRefFirst, setEditRefFirst] = useState("");
  const [editRefLast, setEditRefLast] = useState("");
  const [editRefEmail, setEditRefEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/references")
      .then(res => setReferences(res.data));
  }, []);

  const addReference = () => {
    axios.post("http://localhost:5000/api/references", {
      firstname: refFirst,
      lastname: refLast,
      email: refEmail
    }).then(res => {
      setReferences([...references, res.data]);
      setRefFirst("");
      setRefLast("");
      setRefEmail("");
    });
  };

  const deleteReference = (id) => {
    axios.delete(`http://localhost:5000/api/references/${id}`)
      .then(() => setReferences(references.filter(r => r._id !== id)));
  };

  const updateReference = () => {
    axios.put(`http://localhost:5000/api/references/${editRefId}`, {
      firstname: editRefFirst,
      lastname: editRefLast,
      email: editRefEmail
    }).then(res => {
      setReferences(references.map(r => r._id === editRefId ? res.data : r));
      setEditRefId(null);
      setEditRefFirst("");
      setEditRefLast("");
      setEditRefEmail("");
    });
  };

  return (
    <div>
        <h1>References</h1>
      <h2>Add Reference</h2>
      <input placeholder="First Name" value={refFirst} onChange={(e) => setRefFirst(e.target.value)} />
      <input placeholder="Last Name" value={refLast} onChange={(e) => setRefLast(e.target.value)} />
      <input placeholder="Email" value={refEmail} onChange={(e) => setRefEmail(e.target.value)} />
      <button onClick={addReference}>Add</button>

      <h2>Edit Reference</h2>
      <input value={editRefFirst} onChange={(e) => setEditRefFirst(e.target.value)} />
      <input value={editRefLast} onChange={(e) => setEditRefLast(e.target.value)} />
      <input value={editRefEmail} onChange={(e) => setEditRefEmail(e.target.value)} />
      <button onClick={updateReference}>Update</button>

      <h2>References</h2>
      {references.map(r => (
<div className="card" key={r._id}>          <p>{r.firstname} {r.lastname}</p>
          <p>{r.email}</p>
          <button onClick={() => {
            setEditRefId(r._id);
            setEditRefFirst(r.firstname);
            setEditRefLast(r.lastname);
            setEditRefEmail(r.email);
          }}>Edit</button>
          <button onClick={() => deleteReference(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default References;