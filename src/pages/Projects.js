import React, { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectTitle, setEditProjectTitle] = useState("");
  const [editProjectDesc, setEditProjectDesc] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data));
  }, []);

  const addProject = () => {
    axios.post("http://localhost:5000/api/projects", {
      title: projectTitle,
      description: projectDesc
    }).then(res => {
      setProjects([...projects, res.data]);
      setProjectTitle("");
      setProjectDesc("");
    });
  };

  const deleteProject = (id) => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
      .then(() => setProjects(projects.filter(p => p._id !== id)));
  };

  const updateProject = () => {
    axios.put(`http://localhost:5000/api/projects/${editProjectId}`, {
      title: editProjectTitle,
      description: editProjectDesc
    }).then(res => {
      setProjects(projects.map(p => p._id === editProjectId ? res.data : p));
      setEditProjectId(null);
      setEditProjectTitle("");
      setEditProjectDesc("");
    });
  };

  return (
    <div>
        <h1>Projects</h1>
      <h2>Add Project</h2>
      <input placeholder="Title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
      <input placeholder="Description" value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} />
      <button onClick={addProject}>Add</button>

      <h2>Edit Project</h2>
      <input value={editProjectTitle} onChange={(e) => setEditProjectTitle(e.target.value)} />
      <input value={editProjectDesc} onChange={(e) => setEditProjectDesc(e.target.value)} />
      <button onClick={updateProject}>Update</button>

      <h2>Projects</h2>
      {projects.map(p => (
        <div className="card" key={p._id}>
          <strong>{p.title}</strong>
          <p>{p.description}</p>
          <button onClick={() => {
            setEditProjectId(p._id);
            setEditProjectTitle(p.title);
            setEditProjectDesc(p.description);
          }}>Edit</button>
          <button onClick={() => deleteProject(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Projects;