import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useStudyStatStore from "../../stores/studyStatStore";

const StudyTimeChart = () => {
  const { weeklyStats } = useStudyStatStore();

  const data = Array.isArray(weeklyStats)
    ? weeklyStats.map((item) => ({
        date: item.date,
        minutes: item.minutes,
      }))
    : [];

  console.log("📊 그래프 데이터 확인:", data);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="분" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudyTimeChart;
