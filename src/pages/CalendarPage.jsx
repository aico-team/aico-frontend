import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FiTrash2 } from "react-icons/fi";
import GoalModal from "../components/GoalModal";
import useGoalStore from "../../stores/goalStore";
import "../styles/CalendarPage.css";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const { goals, fetchGoals, toggleCompleteGoal, deleteGoal } = useGoalStore();
  //캘린더의 일자 선택시 GoalModal에 넘겨주는 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);
  const [initialGoal, setInitialGoal] = useState(null);

  console.log(goals);

  useEffect(() => {
    const loadGoals = async () => {
      const todayStr = format(new Date(), "yyyy-MM-dd");
      try {
        await fetchGoals();
      } catch (err) {
        console.warn("목표 불러오기 실패. 더미 데이터로 대체", err);
        useGoalStore.setState({
          goals: [
            {
              goalId: 1,
              goalName: "운영체제 정리",
              deadLine: todayStr,
              curriculumId: 1,
              completed: false,
            },
            {
              goalId: 2,
              goalName: "GPT API 테스트",
              deadLine: todayStr,
              curriculumId: null,
              completed: true,
            },
            {
              goalId: 3,
              goalName: "토픽 아이디어 정리",
              deadLine: todayStr,
              curriculumId: null,
              completed: false,
            },
          ],
        });
        console.log("🔧 더미 goals 설정:", useGoalStore.getState().goals);
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

      <div className="modalbtn-wrapper">
        <button
          onClick={() => {
            setIsEdit(false);
            setInitialGoal(true);
            setIsOpen(true);
          }}
        >
          새 목표 생성
        </button>
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
          setIsEdit(false);
          setInitialGoal(null);
          setIsOpen(true);
        }}
      />

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
                    if (window.confirm("정말 해당 Todo를 삭제하시겠습니까?")) {
                      deleteGoal(goal.goalId);
                    }
                  }}
                >
                  <FiTrash2 />
                </button>
                <p>
                  커리큘럼:{" "}
                  {goal.curriculumId ? `${goal.curriculumId}` : "없음"}
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
    </div>
  );
};

export default CalendarPage;
