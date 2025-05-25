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
        {isOpen && (
          <GoalModal
            isOpen={isOpen}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
