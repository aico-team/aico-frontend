import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FiTrash2 } from "react-icons/fi";
import GoalModal from "../components/GoalModal";
import useGoalStore from "../../stores/goalStore";
import "../styles/CalendarPage.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { goals, fetchGoals, toggleCompleteGoal, deleteGoal } = useGoalStore();
  //캘린더의 일자 선택시 GoalModal에 넘겨주는 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);
  const [initialGoal, setInitialGoal] = useState(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const param = searchParams.get("date");
    if (param) {
      const parsed = new Date(param);
      if (!isNaN(parsed)) {
        setSelectedDate(parsed);
        setValue(parsed);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        await fetchGoals();
      } catch (err) {
        console.warn("목표 불러오기 실패", err);
      }
    };
    loadGoals();
  }, []);

  const selectedDayStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const todayGoals = Array.isArray(goals)
    ? goals.filter((goal) => goal.deadLine === selectedDayStr)
    : [];

  return (
    <div className="calendar-page">
      <h1>📅 캘린더</h1>

      <div className="calendar-layout">
        <div className="calendar-box">
          <div className="calendar-wrapper">
            <Calendar
              onChange={setValue}
              value={value}
              locale="en-us"
              formatShortWeekday={(locale, date) =>
                ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][date.getDay()]
              }
              formatDay={(locale, date) => date.getDate().toString()}
              tileClassName={({ date }) => {
                const isOtherMonth = date.getMonth() !== value.getMonth();
                return isOtherMonth ? "hide-other-month" : "";
              }}
              tileContent={({ date }) => {
                const dayStr = format(date, "yyyy-MM-dd");
                const goalsForDay = goals.filter(
                  (goal) => goal.deadLine === dayStr
                );
                const hasIncomplete = goalsForDay.some(
                  (goal) => !goal.completed
                );
                const icon =
                  goalsForDay.length > 0 ? (hasIncomplete ? "💦" : "✅") : null;

                return (
                  <div className="calendar-status-wrapper">
                    {icon ? (
                      <span>{icon}</span>
                    ) : (
                      <span style={{ visibility: "hidden" }}>💦</span>
                    )}
                  </div>
                );
              }}
              onClickDay={(date) => {
                setSelectedDate(date);
                setIsEdit(false);
                setInitialGoal(null);
                setIsOpen(true);
              }}
            />
          </div>
        </div>

        <div className="goal-list">
          <h3>📝 {selectedDayStr}의 Todo</h3>
          {todayGoals.length === 0 ? (
            <p>등록된 목표가 없습니다.</p>
          ) : (
            <div className="goal-card-container">
              {todayGoals.map((goal) => (
                <div className="goal-card" key={goal.goalId}>
                  <h4>{goal.goalName}</h4>

                  <button
                    className="todo-delete-button"
                    onClick={() => {
                      if (
                        window.confirm("정말 해당 Todo를 삭제하시겠습니까?")
                      ) {
                        deleteGoal(goal.goalId);
                      }
                    }}
                  >
                    <FiTrash2 />
                  </button>
                  <p>
                    커리큘럼:{" "}
                    {goal.curriculumId ? (
                      <span
                        className="curriculum-link"
                        onClick={() => navigate("/CurriculumList")}
                      >
                        {`커리큘럼 ${goal.curriculumId}`}
                      </span>
                    ) : (
                      "없음"
                    )}
                  </p>
                  <p>상태: {goal.completed ? "✅ 완료" : "💦 진행 중"}</p>
                  <div className="todobtn-wrapper">
                    <button
                      className="todo-edit-button"
                      onClick={() => {
                        setIsEdit(true);
                        setInitialGoal(goal);
                        setIsOpen(true);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="todo-completed-button"
                      onClick={() => {
                        if (window.confirm("해당 Todo를 완료하셨습니까?")) {
                          toggleCompleteGoal(goal.goalId);
                        }
                      }}
                    >
                      완료
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isOpen && selectedDate && (
          <GoalModal
            isOpen={isOpen}
            selectedDate={format(selectedDate, "yyyy-MM-dd")}
            onClose={() => setIsOpen(false)}
            isEdit={isEdit}
            initialGoal={initialGoal}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
