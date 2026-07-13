import { Interview } from "@/types/interview";

export type InterviewState = {
    interviews: Interview[];
    setInterviews: (interviews: Interview[]) => void;
}