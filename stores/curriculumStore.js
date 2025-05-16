import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const dummyCurriculums = [
  {
    id: "dummy-1",
    topic: "예시 커리큘럼 1",
    curriculumMap: {
      1: { description: "커리큘럼 생성해보기", completed: false },
      2: { description: "커리큘럼 수정 및 저장해보기", completed: false },
      3: { description: "이 커리큘럼을 지우기", completed: false },
    },
  },
  {
    id: "dummy-2",
    topic: "예시 커리큘럼 2",
    curriculumMap: {
      1: { description: "챗봇과 대화해보기", completed: false },
      2: { description: "대시보드로 이동하기", completed: false },
      3: { description: "어떤 기능이 있는지 더 둘러보기", completed: false },
      4: { description: "이 커리큘럼을 지우기", completed: false },
    },
  },
];

const useCurriculumStore = create((set) => ({
  curriculums: [],
  isLoading: true,

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
    set({ isLoading: true });

    try {
      const response = await apiClient.get("/curri/list");
      set({ curriculums: response.data, isLoading: false });
    } catch (err) {
      //[개발용] 백엔드 연결이 안될 때 더미 데이터 사용
      console.warn("API 연결 실패. 더미 데이터로 대체");
      set({ curriculums: dummyCurriculums, isLoading: false });

      //[운영용] 추후 배포 / 운영 시에는 아래 코드 활성화 필요
      /*
      if (err.response?.status === 404) {
        console.warn("커리큘럼 없음:", err.response.data);
        set({ curriculums: [] });
      } else {
        console.error("커리큘럼 목록 조회 실패:", err);
        set({ curriculums: dummyCurriculums });
      }
      */
    }
  },
}));

export default useCurriculumStore;
