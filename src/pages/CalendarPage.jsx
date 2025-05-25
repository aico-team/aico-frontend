import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import GoalModal from "../components/GoalModal";
import useGoalStore from "../../stores/goalStore";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { goals, fetchGoals } = useGoalStore();
  //캘린더의 일자 선택시 GoalModal에 넘겨주는 상태
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const selectedDayStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const todayGoals = Array.isArray(goals)
    ? goals.filter((goal) => goal.deadLine === selectedDayStr)
    : [];

  return (
    <div className="calendar-page">
      <h1>📅 캘린더</h1>

      <Calendar
        onChange={setValue}
        value={value}
        tileContent={({ date }) => {
          const day = format(date, "yyyy-MM-dd");
          const hasGoal =
            Array.isArray(goals) && goals.some((goal) => goal.deadLine === day);
          return hasGoal ? <div className="goal-dot" /> : null;
        }}
        onClickDay={(date) => {
          setSelectedDate(date);
          setIsOpen(true);
        }}
      />

      <div className="modalbtn-wrapper">
        <button onClick={() => setIsOpen(true)}>새 목표 생성</button>
        {isOpen && selectedDate && (
          <GoalModal
            isOpen={isOpen}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>

      <div className="goal-list">
        <h3>📝 {selectedDayStr}의 목표</h3>
        {todayGoals.length === 0 ? (
          <p>등록된 목표가 없습니다.</p>
        ) : (
          <div className="goal-card-container">
            {todayGoals.map((goal) => (
              <div className="goal-card" key={goal.goalId}>
                <h4>{goal.goalName}</h4>
                <p>
                  커리큘럼:{" "}
                  {goal.curriculumId ? `${goal.curriculumId}` : "없음"}
                </p>
                <p>상태: {goal.completed ? "✅ 완료" : "💦 진행 중"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
