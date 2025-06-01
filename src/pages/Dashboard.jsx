import React, { useEffect } from "react";
import StudyTimer from "../components/common/StudyTimer";
import useAuthStore from "../../stores/authStore";
import useStudyStatStore from "../../stores/studyStatStore";
import CalendarMiniCard from "../components/dashboard/CalendarMiniCard";
import CurriculumProgressCard from "../components/dashboard/CurriculumProgressCard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { streakCount, fetchStreakCount } = useStudyStatStore();

  useEffect(() => {
    if (user?.userId) {
      fetchStreakCount(user.userId);
    }
  }, [user?.userId]);

  return (
    <div>
      <div className="greeting-and-cards">
        <div className="greeting-left">
          <div className="greeting-section">
            <h2>{user?.nickname}님, 안녕하세요 👋</h2>
            <p>🔥 {streakCount ?? 0}일째 공부중입니다!</p>
          </div>

          <div className="left-card">
            <StudyTimer />
          </div>
        </div>

        <div className="right-card">
          <CalendarMiniCard />
        </div>
      </div>

      <div className="card-grid">
        <div className="full-card message-card">
          <p>메시지 기능 준비중...</p>
        </div>
        <div className="full-card">
          <CurriculumProgressCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
