import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://portfolio-backend-1-b71s.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
  <h2>Login</h2>

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

<button onClick={handleLogin} aria-label="Login to your account">
  Login
</button></div>
  );
}

export default Login;