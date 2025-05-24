import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useGoalStore = create((set) => ({
  //변수 선언
  goals: [],
  isLoading: true,

  //새 목표를 생성
  addGoal: async (newGoal) => {
    try {
      const response = await apiClient.post("/goals", newGoal);
      set((state) => ({
        goals: [...state.goals, response.data],
      }));
    } catch (err) {
      console.warn("목표 생성 실패:", err);
    }
  },

  //모든 목표 불러오기
  fetchGoals: async () => {
    set({ isLoading: true });

    try {
      const response = await apiClient.get("/goals");
      set({ goals: response.data, isLoading: false });
    } catch (err) {
      console.warn("목표 불러오기 실패:", err);
      set({ goals: [], isLoading: false });
    }
  },

  //목표 수정
  editGoal: async (goalId, updateData) => {
    try {
      await apiClient.put(`/goals/${goalId}`, updateData);
      set((state) => ({
        goals: state.goals.map((g) =>
          g.goalId === goalId ? { ...g, ...updateData } : g
        ),
      }));
    } catch (err) {
      console.warn("목표 수정 실패:", err);
    }
  },

  //목표 삭제
  deleteGoal: async (goalId) => {
    try {
      await apiClient.delete(`/goals/${goalId}`);
      set((state) => ({
        goals: state.goals.filter((g) => g.goalId !== goalId),
      }));
    } catch (err) {
      console.warn("목표 삭제 실패:", err);
    }
  },
  //목표 완료 토글
  toggleCompleteGoal: async (goalId) => {
    try {
      await apiClient.patch(`/goals/${goalId}/toggle-completed`);
      set((state) => ({
        goals: state.goals.map((g) =>
          g.goalId === goalId
            ? {
                ...g,
                completed: !g.completed,
              }
            : g
        ),
      }));
    } catch (err) {
      console.warn("목표 완료 요청 실패:", err);
    }
  },
}));

export default useGoalStore;
