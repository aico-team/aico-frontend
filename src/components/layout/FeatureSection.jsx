import React from "react";
import { RiAiGenerate } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";
import { MdAccessTimeFilled, MdQuiz } from "react-icons/md";
import "../../styles/FeatureSection.css";

const features = [
  {
    title: "AI 커리큘럼 생성",
    description: "맞춤형 학습 코스를 자동으로 설계 받으세요.",
    icon: <RiAiGenerate />,
    color: "#EAE4E9",
  },
  {
    title: "공부 시간 기록",
    description: "공부 시간을 기록하고 다른 날과 비교해보세요.",
    icon: <MdAccessTimeFilled />,
    color: "#FFF1E6",
  },
  {
    title: "학습 자료 추천",
    description: "학습 코스에 맞는 자료를 추천 받아 보세요.",
    icon: <IoLogoWechat />,
    color: "#FDE2E4",
  },
  {
    title: "퀴즈 & 오답 정리",
    description: "공부 자료 이미지를 업로드하고, 퀴즈를 풀어보세요.",
    icon: <MdQuiz />,
    color: "#DFE7FD",
  },
  {
    title: "To-do 리스트",
    description: "개인 학습 진척도를 관리하고, 목표를 설정해보세요.",
    icon: <FaListCheck />,
    color: "#E2ECE9",
  },
];

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <h2 className="feature-title">제공하는 기능</h2>
      <p className="feature-subtitle">
        Aico가 제공하는 서비스를 한 눈에 확인해보세요.
      </p>
      <div className="feature-grid">
        {features.map((item, idx) => (
          <div
            className="feature-card"
            key={idx}
            style={{ backgroundColor: item.color }}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
