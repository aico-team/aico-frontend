import React, { useState } from "react";
import GoalModal from "../components/GoalModal";

const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1>📅 캘린더</h1>
      <button onClick={() => setIsOpen(true)}>새 목표 생성</button>
      {isOpen && (
        <GoalModal
          isOpen={isOpen}
          selectedDate={"2025-05-31"}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
