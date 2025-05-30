import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useStudyStatStore = create((set) => ({
  todayStudyTime: null,
  streakCount: null,
  dailyStats: [],
  weeklyStats: [],

  fetchTodayStudyTime: async (userId) => {
    try {
      const response = await apiClient.get(`/study-time/today`, {
        params: { userId },
      });
      const seconds = response.data;

      if (isNaN(seconds)) throw new Error("유효하지 않은 todayStudyTime 응답");

      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");

      set({ todayStudyTime: `${h}:${m}:${s}` });
    } catch (err) {
      console.warn("todayStudyTime API 실패로 더미값을 사용합니다.", err);
      set({ todayStudyTime: "00:00:00" });
    }
  },

  fetchStreakCount: async (userId) => {
    try {
      const response = await apiClient.get(`/study-time/streak`, {
        params: { userId },
      });

      const value = Number(response.data);
      if (isNaN(value)) throw new Error("유효하지 않은 streakCount 응답");

      set({ streakCount: value });
    } catch (err) {
      console.warn("streakCount API 실패로 더미값을 사용합니다.", err);
      set({ streakCount: 0 });
    }
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
      console.warn("dailyStats API 실패 - 데이터 없음", error);

      set({
        dailyStats: [],
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
      console.warn("weeklyStats API 실패 - 데이터 없음", error);
      set({
        weeklyStats: [],
      });
    }
  },
}));

export default useStudyStatStore;
