import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await fetch("http://localhost:5000/api/services");
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async () => {
    await fetch("https://portfolio-backend-1-b71s.onrender.com/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ name, description })
    });

    fetchServices();
  };

  const deleteService = async (id) => {
    await fetch(`https://portfolio-backend-1-b71s.onrender.com/api/services/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    fetchServices();
  };

  return (
    <div>
  <h2>Services</h2>

  <div>
    <label htmlFor="name">Service Name</label>
    <input
      id="name"
      type="text"
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="description">Description</label>
    <input
      id="description"
      type="text"
      placeholder="Description"
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>

  <button onClick={addService} aria-label="Add new service">
    Add Service
  </button>

  <ul>
    {services.map((s) => (
      <li key={s._id}>
        {s.name} - {s.description}
        <button
          onClick={() => deleteService(s._id)}
          aria-label={`Delete service ${s.name}`}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>
  );
}

export default Services;