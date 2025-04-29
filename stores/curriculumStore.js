import { create } from "zustand";

const useCurriculumStore = create((set) => ({
  curriculums: [],

  addCurriculum: (newCurri) =>
    set((state) => ({
      curriculums: [...state.curriculums, newCurri],
    })),

  resetCurriculums: () => set({ curriculums: [] }),
}));

export default useCurriculumStore;
