import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AuthHeader.css";

const AuthHeader = () => {
  //TODO임시 사용자 정보 (추후 props 나 Zustand 연결)
  const user = {
    nickname: "username",
    profileImage: "https://via.placeholder.com/30",
  };

  return (
    <header className="auth-header">
      <div className="auth-header-left">
        <Link to="/" className="auth-logo">
          Aico
        </Link>
      </div>

      <div className="auth-header-center"></div>

      <div className="auth-header-right">
        <img src={user.profileImage} alt="프로필" className="profile-img" />
        <span className="nickname">{user.nickname}</span>
      </div>
    </header>
  );
};

export default AuthHeader;
