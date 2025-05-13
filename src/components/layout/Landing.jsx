import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "../../styles/Landing.css";
import "../../styles/Layout.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <Header />
      <main className="landing-content">
        <section className="intro">
          <h2>Aico는 이런 서비스입니다!</h2>
          <div className="features">
            <div className="feature-box">설명글 ...</div>
            <div className="feature-slide">이미지</div>
          </div>
          <button
            className="registernow-button"
            onClick={() => navigate("/register")}
          >
            Register Now!
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
