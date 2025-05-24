import React, { useState } from "react";
import useGoalStore from "../../stores/goalStore";
import useCurriculumStore from "../../stores/curriculumStore";
import "../styles/GoalModal.css";

const GoalModal = ({ isOpen, onClose, selectedDate }) => {
  if (!isOpen) return null;

  const { addGoal } = useGoalStore();
  const { curriculums } = useCurriculumStore();

  const [input, setInput] = useState({
    goalName: "",
    deadLine: selectedDate || "",
    curriculumId: null,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]:
        name === "curriculumId" && value === ""
          ? { ...input, [name]: null }
          : { ...input, [name]: value },
    });
  };

  const handleSubmit = async () => {
    if (!input.goalName || !input.deadLine) return;

    const newGoal = {
      goalName: input.goalName,
      deadLine: input.deadLine,
      curriculumId: input.curriculumId,
    };

    await addGoal(newGoal);
    onClose();
  };

  return (
    <>
      <div className="goal-modal-overlay" onClick={onClose}></div>
      <div className="goal-modal">
        <h2>✔ Todo 생성</h2>

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
          name="deadLine"
          value={input.deadLine}
          onChange={onChange}
          required
        />

        <label>커리큘럼 선택 (선택)</label>
        <select
          name="curriculumId"
          value={input.curriculumId || ""}
          onChange={onChange}
        >
          {" "}
          <option value="">(자유 목표)</option>
          {curriculums.map((curri) => (
            <option key={curri.id} value={curri.id}>
              {curri.title}
            </option>
          ))}
        </select>

        <div className="button-wrapper">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>저장</button>
        </div>
      </div>
    </>
  );
};

export default GoalModal;
