import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AuthHeader from "./AuthHeader";
import "../../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <AuthHeader />
      <div className="layout-main">
        <Sidebar />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
