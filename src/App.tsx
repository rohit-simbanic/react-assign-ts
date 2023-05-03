import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header/Header";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AddNewUser from "./Pages/AddNewUser";
import EditUser from "./Pages/EditUser";

const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addUser" element={<AddNewUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
