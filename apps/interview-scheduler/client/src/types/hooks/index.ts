import { InterviewType } from "@/types/interview";

export type FormData = {
    candidate_name: string;
    interviewer_name: string;
    start_time: string;
    end_time: string;
    type: InterviewType;
    additional_notes: string;
}