export interface CreateInterviewDto {
    candidate_name: string;
    interviewer_name: string;
    start_time: string;
    end_time: string;
    type: string;
    additional_notes?: string;
}

export interface InterviewResponse {
    success: boolean;
    data: {
        interviews: Interview[]
    }
}

export interface Interview {
    _id: string;
    candidate_name: string;
    interviewer_name: string;
    start_time: string;
    end_time: string;
    type: string;
    additional_notes?: string;
}

export interface InterviewByIdResponse {
    success: boolean;
    data: Interview
}

export type InterviewType = 'Technical' | 'HR' | 'Behavioral';

export const INTERVIEW_TYPES: InterviewType[] = ['Technical', 'HR', 'Behavioral'];