import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "../../styles/Landing.css";
import landingImage from "./../../assets/landing-image.jpg";
import FeatureSection from "./FeatureSection";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <Header />
      <div className="wave-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path
            fill="#d8f5f2"
            fillOpacity="1"
            d="M0,128L30,160C60,192,120,256,180,277.3C240,299,300,277,360,240C420,203,480,149,540,144C600,139,660,181,720,181.3C780,181,840,139,900,133.3C960,128,1020,160,1080,160C1140,160,1200,128,1260,128C1320,128,1380,160,1410,176L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </div>
      <main className="landing-content">
        <section className="intro">
          <div className="intro-left">
            <h1>AI가 당신의 학습 코치가 됩니다!</h1>
            <p>Aico가 맞춤형 커리큘럼과 효율적인 학습관리를 돕습니다.</p>
            <button
              className="registernow-button"
              onClick={() => navigate("/register")}
            >
              Start Now!
            </button>
          </div>
          <div className="intro-right">
            <img src={landingImage} alt="AICO 일러스트" />
          </div>
        </section>
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
