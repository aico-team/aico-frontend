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

const formatDate = (date) => date.toISOString().split("T")[0];

//오늘 기준 일주일 날짜 배열 생성
const getLast7Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};

const StudyTimeChart = () => {
  const { weeklyStats } = useStudyStatStore();

  //공부 안 한 날짜는 응답에 포함되지 않기에 minutes:0으로 처리
  const statsMap = new Map(
    weeklyStats.map((item) => [item.date, item.minutes])
  );

  const data = getLast7Days().map((date) => ({
    date,
    minutes: statsMap.get(date) ?? 0,
  }));

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
