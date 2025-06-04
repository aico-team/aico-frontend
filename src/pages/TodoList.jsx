import React, { useEffect } from "react";
import useCurriculumStore from "../../stores/curriculumStore";
import useGoalStore from "../../stores/goalStore";
import "../styles/TodoList.css";

const groupByCurriculum = (goals) => {
  const grouped = {};

  for (const goal of goals) {
    const key = goal.curriculumId ?? "none";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(goal);
  }

  return grouped;
};

const TodoList = () => {
  const { goals, fetchGoals, toggleCompleteGoal, deleteGoal } = useGoalStore();
  const { curriculums } = useCurriculumStore();

  useEffect(() => {
    const loadGoals = async () => {
      try {
        await fetchGoals();
      } catch (err) {
        console.warn("⚠️ 목표 불러오기 실패", err);
      }
    };

    loadGoals();
  }, []);

  const groupedGoals = groupByCurriculum(goals);

  console.log("goals", goals);
  console.log("groupedGoals", groupedGoals);

  return (
    <div className="todo-list-page">
      <h1>🗃 목표 목록</h1>
      {Object.entries(groupedGoals).map(([key, goalList]) => {
        const isFreeGoal = key === "none";
        const curriculum = curriculums.find((c) => c.id === Number(key));
        const title = isFreeGoal
          ? "자유 목표"
          : `${curriculum?.topic || `커리큘럼 ${key}`}`;

        return (
          <section key={key} className="goal-section">
            <h2>{title}</h2>
            <ul className="goal-items">
              {goalList.map((goal) => (
                <li
                  key={goal.goalId}
                  className={goal.completed ? "completed-goal" : ""}
                >
                  <span className="goal-name">
                    {goal.completed ? "✅" : "💦"} {goal.goalName}
                  </span>

                  <div className="todo-bttns">
                    <button
                      className="todo-completed-bttn"
                      onClick={() => {
                        if (window.confirm("이 목표를 완료 처리할까요?")) {
                          toggleCompleteGoal(goal.goalId);
                        }
                      }}
                    >
                      완료
                    </button>
                    <button
                      className="todo-delete-bttn"
                      onClick={() => {
                        if (window.confirm("이 목표를 삭제할까요?")) {
                          deleteGoal(goal.goalId);
                        }
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default TodoList;
