import React, { useEffect } from "react";
import useStudyStatStore from "../../stores/studyStatStore";

const MyProgress = () => {
  const {
    todayStudyTime,
    streakCount,
    dailyStats,
    weeklyStats,
    fetchTodayStudyTime,
    fetchStreakCount,
    fetchDailyStats,
    fetchWeeklyStats,
  } = useStudyStatStore();

  //유저 정보 불러오기
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

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

  return (
    <div>
      <h1>📊 나의 진행도</h1>

      <div>
        <p>✅ 오늘 공부한 시간: {todayStudyTime ?? "로딩 중..."}</p>
        <p>🔥 연속 공부 일수: {streakCount ?? "로딩 중..."}</p>
      </div>

      <div>
        <h3>📅 일간 공부 시간</h3>
        <pre>{JSON.stringify(dailyStats, null, 2)}</pre>
      </div>

      <div>
        <h3>📈 주간 공부 시간</h3>
        <pre>{JSON.stringify(weeklyStats, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MyProgress;
