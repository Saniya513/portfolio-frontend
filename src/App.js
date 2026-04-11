import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import References from "./pages/References";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
        
        <nav>
          <Link to="/">Home</Link>

          {isLoggedIn && <Link to="/users">Users</Link>}
          {isLoggedIn && <Link to="/projects">Projects</Link>}
          {isLoggedIn && <Link to="/services">Services</Link>}
          {isLoggedIn && <Link to="/references">References</Link>}

          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/signup">Signup</Link>}

          {isLoggedIn && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/references" element={<References />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;