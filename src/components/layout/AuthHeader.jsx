import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/AuthHeader.css";
import useAuthStore from "../../../stores/authStore";
import FriendAlertIcon from "../friends/FriendAlertIcon";

const AuthHeader = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [setUser]);

  if (!user) return null;

  return (
    <header className="auth-header">
      <div className="auth-header-left">
        <Link to="/" className="auth-logo">
          Aico
        </Link>
      </div>

      <div className="auth-header-center"></div>

      <div className="auth-header-right">
        <FriendAlertIcon />
        <img
          src="https://via.placeholder.com/30"
          alt="프로필"
          className="profile-img"
        />
        <span className="nickname">{user.nickname}</span>
      </div>
    </header>
  );
};

export default AuthHeader;
