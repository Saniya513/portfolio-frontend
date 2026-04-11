import { useState } from "react";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstname, lastname, email, password })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
<div>
  <h2>Signup</h2>

  <div>
    <label htmlFor="firstname">First Name</label>
    <input
      id="firstname"
      type="text"
      placeholder="First Name"
      onChange={(e) => setFirstname(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="lastname">Last Name</label>
    <input
      id="lastname"
      type="text"
      placeholder="Last Name"
      onChange={(e) => setLastname(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="password">Password</label>
    <input
      id="password"
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button onClick={handleSignup} aria-label="Create a new account">
    Signup
  </button>
</div>
  );
}

export default Signup;