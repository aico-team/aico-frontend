import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useCurriculumStore = create((set) => ({
  curriculums: [],

  //새 커리큘럼을 기존 목록에 추가
  addCurriculum: (newCurri) =>
    set((state) => ({
      curriculums: [...state.curriculums, newCurri],
    })),

  //여러 커리큘럼을 받아올때
  setCurriculums: (curriList) => set({ curriculums: curriList }),

  //커리큘럼 삭제
  deleteCurriculum: async (id) => {
    try {
      await apiClient.delete(`/curri/${id}`);
      set((state) => ({
        curriculums: state.curriculums.filter((c) => c.id !== id),
      }));
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("존재하지 않는 커리큘럼입니다.");
      } else {
        console.error("커리큘럼 삭제 실패:", err);
      }
    }
  },

  //모든 커리큘럼 삭제
  resetCurriculums: () => set({ curriculums: [] }),

  //커리큘럼 목록 불러오기
  fetchCurriculumList: async () => {
    try {
      const response = await apiClient.get("/curri/list");
      set({ curriculums: response.data });
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("커리큘럼 없음:", err.response.data);
        set({ curriculums: [] });
      } else {
        console.error("커리큘럼 목록 조회 실패:", err);
      }
    }
  },
}));

export default useCurriculumStore;
