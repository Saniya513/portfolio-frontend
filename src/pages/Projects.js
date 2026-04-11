import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // GET
  const fetchProjects = async () => {
    const res = await fetch("https://portfolio-backend-1-b71s.onrender.com/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ADD
  const addProject = async () => {
    await fetch("https://portfolio-backend-1-b71s.onrender.com/api/projects", {
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
    await fetch(`https://portfolio-backend-1-b71s.onrender.com/api/projects/${id}`, {
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

      <label htmlFor="title">Project Title</label>
<input
  id="title"
  type="text"
  placeholder="Title"
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  id="description"
  type="text"
  placeholder="Description"
  onChange={(e) => setDescription(e.target.value)}
/>
      <button onClick={addProject}>Add Project</button>

      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            {p.title} - {p.description}
            <button onClick={() => deleteProject(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;