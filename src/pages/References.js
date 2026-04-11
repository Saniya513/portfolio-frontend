import { useEffect, useState } from "react";

function References() {
  const [references, setReferences] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const token = localStorage.getItem("token");

  const fetchReferences = async () => {
    const res = await fetch("https://portfolio-backend-1-b71s.onrender.com/api/references");
    const data = await res.json();
    setReferences(data);
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const addReference = async () => {
    await fetch("https://portfolio-backend-1-b71s.onrender.com/api/references", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ name, review })
    });

    fetchReferences();
  };

  const deleteReference = async (id) => {
    await fetch(`https://portfolio-backend-1-b71s.onrender.com/api/references/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    fetchReferences();
  };

  return (
    <div>
  <h2>References</h2>

  <div>
    <label htmlFor="name">Client Name</label>
    <input
      id="name"
      type="text"
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="review">Review</label>
    <input
      id="review"
      type="text"
      placeholder="Review"
      onChange={(e) => setReview(e.target.value)}
    />
  </div>

  <button onClick={addReference} aria-label="Add new reference">
    Add Reference
  </button>

  <ul>
    {references.map((r) => (
      <li key={r._id}>
        {r.name} - {r.review}
        <button
          onClick={() => deleteReference(r._id)}
          aria-label={`Delete reference from ${r.name}`}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>
  );
}

export default References;