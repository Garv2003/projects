import { InterviewState } from "@/types/store/interview";
import { Interview } from "@/types/interview";
import { create } from "zustand";

export const useInterviewStore = create<InterviewState>()((set) => ({
    interviews: [],
    setInterviews: (interviews: Interview[]) => set({ interviews }),
}));