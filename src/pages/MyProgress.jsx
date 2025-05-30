import React, { useEffect, useState } from "react";
import useStudyStatStore from "../../stores/studyStatStore";
import StudyTimeChart from "../components/StudyTimeChart";
import StudyTimeBarChart from "../components/StudyTimeBarChart";
import "../styles/MyProgress.css";

const MyProgress = () => {
  const {
    todayStudyTime,
    streakCount,
    fetchTodayStudyTime,
    fetchStreakCount,
    fetchDailyStats,
    fetchWeeklyStats,
  } = useStudyStatStore();

  //유저 정보 불러오기
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!userId) return;

    //오늘 날짜 및 기간 계산
    const today = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - 6);
    const startStr = start.toISOString().split("T")[0];

    fetchTodayStudyTime(userId);
    fetchStreakCount(userId);
    fetchDailyStats(userId, startStr, today);
    fetchWeeklyStats(userId, today);
  }, [userId]);

  const handleDateSearch = () => {
    if (!startDate || !endDate)
      return alert("시작일과 종료일을 모두 선택해주세요.");
    fetchDailyStats(userId, startDate, endDate);
  };

  return (
    <div className="progress-page">
      <h1 className="title">📊 나의 진행도</h1>

      <section className="summary-grid">
        <div className="summary-card">
          <p>✅ 오늘 공부한 시간: {todayStudyTime ?? "로딩 중..."}</p>
        </div>
        <div className="summary-card">
          <p>🔥 연속 공부 일수: {streakCount ?? "로딩 중..."} </p>
        </div>
      </section>

      <div className="content-grid char-grid">
        <div className="chart-summary-card">
          <section className="chart-section">
            <h3>📅 기간 지정 공부 시간</h3>
            <div className="date-inputs">
              <label>
                시작일
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                종료일
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <button onClick={handleDateSearch}>조회</button>
            </div>
            <StudyTimeBarChart />
          </section>
        </div>

        <div className="chart-summary-card">
          <section className="chart-section">
            <h3>📈 주간 공부 시간</h3>
            <StudyTimeChart />
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
