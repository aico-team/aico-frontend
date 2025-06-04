import React, { useState, useEffect } from "react";
import useGoalStore from "../../stores/goalStore";
import useCurriculumStore from "../../stores/curriculumStore";
import "../styles/GoalModal.css";

const GoalModal = ({
  isOpen,
  onClose,
  selectedDate,
  isEdit = false,
  initialGoal = null,
}) => {
  if (!isOpen) return null;

  const { addGoal, editGoal } = useGoalStore();
  const { curriculums } = useCurriculumStore();

  const [input, setInput] = useState({
    goalName: "",
    deadline: selectedDate || "",
    currId: null,
  });

  useEffect(() => {
    if (isEdit && initialGoal) {
      setInput({
        goalName: initialGoal.goalName || "",
        deadline: initialGoal.deadline || selectedDate || "",
        currId: initialGoal.currId || "",
      });
    } else {
      setInput({
        goalName: "",
        deadline: selectedDate || "",
        currId: null,
      });
    }
  }, [isEdit, initialGoal, selectedDate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: name === "currId" && value === "" ? null : value,
    }));
  };

  const handleSubmit = async () => {
    if (!input.goalName || !input.deadline) return;

    if (isEdit && initialGoal) {
      await editGoal(initialGoal.goalId, {
        goalName: input.goalName,
        deadline: input.deadline,
        currId: input.currId,
      });
    } else {
      await addGoal({
        goalName: input.goalName,
        deadline: input.deadline,
        currId: input.currId,
      });
    }
    onClose();
  };

  return (
    <>
      <div className="goal-modal-overlay" onClick={onClose}></div>
      <div className="goal-modal">
        <h2>{isEdit ? "✏️ Todo 수정" : "✔ Todo 생성"}</h2>

        <label>Todo 이름</label>
        <input
          name="goalName"
          value={input.goalName}
          onChange={onChange}
          required
        />

        <label>데드 라인</label>
        <input
          type="date"
          name="deadline"
          value={input.deadline}
          onChange={onChange}
          required
        />

        <label>커리큘럼 선택 (선택)</label>
        <select
          name="currId"
          value={input.currId || ""}
          onChange={onChange}
        >
          <option value="">(자유 목표)</option>
          {curriculums.map((curri) => (
            <option key={curri.id} value={curri.id}>
              {curri.topic}
            </option>
          ))}
        </select>

        <div className="button-wrapper">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>
            {isEdit ? "수정 완료" : "저장"}
          </button>
        </div>
      </div>
    </>
  );
};

export default GoalModal;
