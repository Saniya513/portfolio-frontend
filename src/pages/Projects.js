import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // GET
  const fetchProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ADD
  const addProject = async () => {
    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ title, description })
    });

    fetchProjects();
  };

  // DELETE
  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    fetchProjects();
  };

  return (
    <div>
  <h2>Projects</h2>

  <div>
    <label htmlFor="title">Project Title</label>
    <input
      id="title"
      type="text"
      placeholder="Title"
      onChange={(e) => setTitle(e.target.value)}
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

  <button onClick={addProject} aria-label="Add new project">
    Add Project
  </button>

  <ul>
    {projects.map((p) => (
      <li key={p._id}>
        {p.title} - {p.description}
        <button
          onClick={() => deleteProject(p._id)}
          aria-label={`Delete project ${p.title}`}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>
  );
}

export default Projects;