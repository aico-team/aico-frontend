import "./styles/App.css";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
}

export default App;
