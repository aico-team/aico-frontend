import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="layout-header">
      <div className="logo">Aico</div>
      <div className="auth-buttons">
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/register")}>회원가입</button>
      </div>
    </header>
  );
};

export default Header;
