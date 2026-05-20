import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Your main website
import AdminPortal from "./admin/AdminPortal";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Unified Admin Space */}
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}