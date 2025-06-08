import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import StudyTimer from "../components/common/StudyTimer";
import useAuthStore from "../../stores/authStore";
import useStudyStatStore from "../../stores/studyStatStore";
import useWrongNoteStore from "../../stores/wrongNoteStore";
import CalendarMiniCard from "../components/dashboard/CalendarMiniCard";
import DashboardQuizCard from "../components/dashboard/DashboardQuizCard";
import CurriculumProgressCard from "../components/dashboard/CurriculumProgressCard";
import "../styles/Dashboard.css";
import "swiper/css";
import "swiper/css/pagination";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { streakCount, fetchStreakCount } = useStudyStatStore();
  const { wrongQuizzes, fetchWrongQuizzes } = useWrongNoteStore();

  useEffect(() => {
    if (user?.userId) {
      fetchStreakCount(user.userId);
      fetchWrongQuizzes();
    }
  }, [user?.userId]);

  const flattenedQuizzes = wrongQuizzes.flatMap((file) => file.quizzes);

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

      <div className="quiz-and-curriculum-wrapper">
        <div className="quiz-column">
          {flattenedQuizzes.length > 0 && (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {flattenedQuizzes.map((item, idx) => (
                <SwiperSlide key={item.id}>
                  <DashboardQuizCard
                    index={idx + 1}
                    quiz={item.quiz}
                    answer={item.answer}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="curriculum-column">
          <CurriculumProgressCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
