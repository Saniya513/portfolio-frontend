import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [editServiceId, setEditServiceId] = useState(null);
  const [editServiceTitle, setEditServiceTitle] = useState("");
  const [editServiceDesc, setEditServiceDesc] = useState("");

  useEffect(() => {
    axios.get("https://portfolio-backend-e0d6.onrender.com/api/services")
      .then(res => setServices(res.data));
  }, []);

  const addService = () => {
    axios.post("https://portfolio-backend-e0d6.onrender.com/api/services", {
      title: serviceTitle,
      description: serviceDesc
    }).then(res => {
      setServices([...services, res.data]);
      setServiceTitle("");
      setServiceDesc("");
    });
  };

  const deleteService = (id) => {
    axios.delete(`https://portfolio-backend-e0d6.onrender.com/api/services/${id}`)
      .then(() => setServices(services.filter(s => s._id !== id)));
  };

  const updateService = () => {
    if (!editServiceId) return;

    axios.put(`https://portfolio-backend-e0d6.onrender.com/api/services/${editServiceId}`, {
      title: editServiceTitle,
      description: editServiceDesc
    }).then(res => {
      setServices(services.map(s => s._id === editServiceId ? res.data : s));
      setEditServiceId(null);
      setEditServiceTitle("");
      setEditServiceDesc("");
    });
  };

  return (
    <div>
      <h1>Services</h1>

      <h2>Add Service</h2>
      <input placeholder="Title" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} />
      <input placeholder="Description" value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} />
      <button onClick={addService}>Add</button>

      <h2>Edit Service</h2>
      <input value={editServiceTitle} onChange={(e) => setEditServiceTitle(e.target.value)} />
      <input value={editServiceDesc} onChange={(e) => setEditServiceDesc(e.target.value)} />
      <button onClick={updateService}>Update</button>

      <h2>Services</h2>
      {services.map(s => (
        <div className="card" key={s._id} style={{ margin: "10px 0" }}>
          <strong>{s.title}</strong>
          <p>{s.description}</p>

          <button onClick={() => {
            setEditServiceId(s._id);
            setEditServiceTitle(s.title);
            setEditServiceDesc(s.description);
          }}>Edit</button>

          <button onClick={() => deleteService(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Services;