import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useStudyStatStore = create((set) => ({
  todayStudyTime: null,
  streakCount: null,
  dailyStats: [],
  weeklyStats: [],

  fetchTodayStudyTime: async (userId) => {
    const response = await apiClient.get(`/study-time/today`, {
      params: { userId },
    });
    const seconds = response.data;
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    set({ todayStudyTime: `${h}:${m}:${s}` });
  },

  fetchStreakCount: async (userId) => {
    const response = await apiClient.get(`/study-time/streak`, {
      params: { userId },
    });
    set({ streakCount: response.data });
  },

  fetchDailyStats: async (userId, start, end) => {
    try {
      const response = await apiClient.get(`/study-time/daily`, {
        params: { userId, start, end },
      });

      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error("Invalid dailyStats data");
      }
      set({ dailyStats: response.data });
    } catch (error) {
      console.warn("dailyStats API 실패 - 더미 데이터 사용", error);

      set({
        dailyStats: [
          { date: "2025-05-25", minutes: 30 },
          { date: "2025-05-26", minutes: 45 },
          { date: "2025-05-27", minutes: 20 },
          { date: "2025-05-28", minutes: 60 },
          { date: "2025-05-29", minutes: 50 },
          { date: "2025-05-30", minutes: 70 },
          { date: "2025-05-31", minutes: 90 },
        ],
      });
    }
  },

  fetchWeeklyStats: async (userId, date) => {
    try {
      const response = await apiClient.get(`/study-time/weekly`, {
        params: { userId, date },
      });

      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error("Invalid weeklyStats data");
      }

      set({ weeklyStats: response.data });
    } catch (error) {
      console.warn("weeklyStats API 실패 - 더미 데이터 사용", error);
      set({
        weeklyStats: [
          { date: "2025-05-25", minutes: 30 },
          { date: "2025-05-26", minutes: 45 },
          { date: "2025-05-27", minutes: 20 },
          { date: "2025-05-28", minutes: 60 },
          { date: "2025-05-29", minutes: 50 },
          { date: "2025-05-30", minutes: 70 },
          { date: "2025-05-31", minutes: 90 },
        ],
      });
    }
  },
}));

export default useStudyStatStore;
