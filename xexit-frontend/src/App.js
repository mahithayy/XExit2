// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeHome from "./pages/EmployeeHome";
import HRDashboard from "./pages/HRDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee-home" element={<EmployeeHome />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
