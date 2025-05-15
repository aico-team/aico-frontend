import React from "react";
import { RiAiGenerate } from "react-icons/ri";
import { FaBarsProgress, FaListCheck } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import "../../styles/FeatureSection.css";

const features = [
  {
    title: "AI 커리큘럼 생성",
    description: "GPT가 맞춤형 학습 계획을 자동으로 설계해줍니다.",
    icon: <RiAiGenerate />,
    color: "#EAE4E9",
  },
  {
    title: "학습 진도 시각화",
    description: "공부량을 시각적으로 추적하여 동기를 부여합니다.",
    icon: <FaBarsProgress />,
    color: "#FFF1E6",
  },
  {
    title: "그룹 학습 및 채팅",
    description: "그룹과 함께 소통하며 스터디를 이어갈 수 있습니다.",
    icon: <IoLogoWechat />,
    color: "#FDE2E4",
  },
  {
    title: "To-do 리스트",
    description: "개인 학습 과제를 직접 관리하고 체크할 수 있습니다.",
    icon: <FaListCheck />,
    color: "#DFE7FD",
  },
  {
    title: "공부 시간 기록",
    description: "공부 시간을 기록하고 랭킹을 통해 비교해보세요.",
    icon: <MdAccessTimeFilled />,
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
