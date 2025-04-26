import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Aico</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/register")}>회원가입</button>
      </div>
    </div>
  );
}

export default App;
