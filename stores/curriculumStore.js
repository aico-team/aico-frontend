import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useCurriculumStore = create((set, get) => ({
  curriculums: [],
  isLoading: true,
  progressMap: {}, //진척도
  //추천 자료 관련 상태
  recommendations: {}, //단계별 추천 자료
  expandedSteps: new Set(), //현재 열려 있는 단계
  loadingSteps: new Set(), //로딩 중인 단계 추적

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

  //모든 커리큘럼 삭제 - 예비용
  resetCurriculums: () => set({ curriculums: [] }),

  //커리큘럼 목록 불러오기
  fetchCurriculumList: async () => {
    set({ isLoading: true });

    //각 커리큘럼에 대한 진척도
    try {
      const response = await apiClient.get("/curri/list");
      set({ curriculums: response.data, isLoading: false });

      response.data.forEach((curri) => {
        useCurriculumStore.get().fetchProgress(curri.id);
      });
    } catch (err) {
      console.warn("API 연결 실패", err);
      if (err.response?.status === 404) {
        console.warn("커리큘럼 없음: ", err.response.data);
      } else {
        console.error("커리큘럼 목록 조회 실패", err);
      }
      set({ curriculums: [], isLoading: false });
    }
  },

  toggleCompleteStep: async (id, step, completed) => {
    set((state) => {
      const updated = state.curriculums.map((curri) => {
        if (curri.id !== id) return curri;

        return {
          ...curri,
          curriculumMap: {
            ...curri.curriculumMap,
            [step]: {
              ...curri.curriculumMap[step],
              completed: completed,
            },
          },
        };
      });
      return { curriculums: updated };
    });

    try {
      const response = await apiClient.post("/curri/complete", {
        id: id,
        stage: step,
        completed: completed,
      });

      const progress = response.data;
      console.log(`[진척도] ${id} 커리큘럼의 현재 진척도: ${progress}%`);
    } catch (err) {
      console.warn("진척도 요청 무시됨" + err);
    }
  },

  fetchProgress: async (id) => {
    try {
      const response = await apiClient.get(`/curri/complete/${id}`);
      const percent = response.data;

      set((state) => ({
        progressMap: {
          ...state.progressMap,
          [id]: percent,
        },
      }));
    } catch (err) {
      console.warn("진척도를 불러오는데 실패했음", err);
    }
  },

  fetchRecommendations: async (id, step) => {
    const { loadingSteps, recommendations } = get();
    //key 생성
    const key = `${id}-${step}`;

    //자료가 로딩중이거나 이미 자료가 존재할때는 불필요한 API 요청을 방지

    if (recommendations[key]) {
      set((state) => ({
        expandedSteps: new Set(state.expandedSteps).add(key),
      }));
      return;
    }

    if (loadingSteps.has(key)) return;

    //로딩-set에 key추가
    set((state) => ({
      loadingSteps: new Set(state.loadingSteps).add(key),
    }));

    //API 호출 및 결과 저장
    try {
      const response = await apiClient.post("/curri/recommend", {
        id: id,
        stage: step,
      });

      const studyData = response.data;

      set((state) => ({
        recommendations: {
          ...state.recommendations,
          [key]: studyData,
        },
        expandedSteps: new Set(state.expandedSteps).add(key),
      }));
    } catch (err) {
      console.log("추천 자료 불러오기 실패", err);
    } finally {
      //API 호출 후 로딩 상태 제거
      set((state) => {
        const newSet = new Set(state.loadingSteps);
        newSet.delete(key);
        return { loadingSteps: newSet };
      });
    }
  },

  toggleExpandedStep: (key) => {
    set((state) => {
      const newSet = new Set(state.expandedSteps);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return { expandedSteps: newSet };
    });
  },
}));

export default useCurriculumStore;
