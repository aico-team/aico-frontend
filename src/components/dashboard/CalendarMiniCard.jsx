import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CalendarMiniCard.css";
import { format } from "date-fns";
import useGoalStore from "../../../stores/goalStore";

const CalendarMiniCard = () => {
  const [value, setValue] = useState(new Date());
  const { goals, fetchGoals } = useGoalStore();

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        locale="en-us"
        formatShortWeekday={(locale, date) =>
          ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][date.getDay()]
        }
        tileContent={({ date }) => {
          const dayStr = format(date, "yyyy-MM-dd");
          const goalsForDay = goals.filter((goal) => goal.deadLine === dayStr);
          const hasIncomplete = goalsForDay.some((goal) => !goal.completed);
          const icon =
            goalsForDay.length > 0 ? (hasIncomplete ? "💦" : "✅") : null;

          return (
            <div className="calendar-icon">
              {icon ? (
                <span>{icon}</span>
              ) : (
                <span style={{ visibility: "hidden" }}>💦</span>
              )}
            </div>
          );
        }}
        tileClassName={({ date }) =>
          date.getMonth() !== value.getMonth() ? "hide-other-month" : ""
        }
      />
    </div>
  );
};

export default CalendarMiniCard;
