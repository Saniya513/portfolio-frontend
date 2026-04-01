import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import References from "./pages/References";

function App() {
  return (
    <Router>
<div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
        <nav>
  <Link to="/">Home</Link>
  <Link to="/users">Users</Link>
  <Link to="/projects">Projects</Link>
  <Link to="/services">Services</Link>
  <Link to="/references">References</Link>
</nav>
        <Routes>
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