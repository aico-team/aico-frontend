import React from "react";
import {
  FiCpu,
  FiBarChart2,
  FiUsers,
  FiCheckSquare,
  FiClock,
} from "react-icons/fi";
import "../../styles/FeatureSection.css";

const features = [
  {
    title: "AI 커리큘럼 생성",
    description: "GPT가 맞춤형 학습 계획을 자동으로 설계해줍니다.",
    icon: <FiCpu />,
  },
  {
    title: "학습 진도 시각화",
    description: "공부량을 시각적으로 추적하여 동기를 부여합니다.",
    icon: <FiBarChart2 />,
  },
  {
    title: "그룹 학습 및 채팅",
    description: "그룹과 함께 소통하며 스터디를 이어갈 수 있습니다.",
    icon: <FiUsers />,
  },
  {
    title: "To-do 리스트",
    description: "개인 학습 과제를 직접 관리하고 체크할 수 있습니다.",
    icon: <FiCheckSquare />,
  },
  {
    title: "공부 시간 기록",
    description: "공부 시간을 기록하고 랭킹을 통해 비교해보세요.",
    icon: <FiClock />,
  },
];

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <h2 className="feature-title">Aico 주요 기능</h2>
      <div className="feature-grid">
        {features.map((item, idx) => (
          <div className="feature-card" key={idx}>
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
