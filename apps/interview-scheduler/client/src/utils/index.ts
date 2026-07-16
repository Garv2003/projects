import { Interview } from "@/types/interview";

export const hasConflict = (
    interviews: Interview[],
    newInterview: Partial<Interview>,
): boolean => {
    if (!newInterview.start_time || !newInterview.end_time ||
        !newInterview.interviewer_name || !newInterview.candidate_name) {
        return false;
    }

    const newStart = new Date(newInterview.start_time);
    const newEnd = new Date(newInterview.end_time);

    if (isNaN(newStart.getTime()) || isNaN(newEnd.getTime())) {
        return false;
    }

    const durationInMs = newEnd.getTime() - newStart.getTime();
    const durationInMinutes = durationInMs / (1000 * 60);

    if (durationInMinutes < 60 || newEnd <= newStart) {
        return true;
    }

    return interviews.some(interview => {
        const existingStart = new Date(interview.start_time);
        const existingEnd = new Date(interview.end_time);
        if (isNaN(existingStart.getTime()) || isNaN(existingEnd.getTime())) {
            return false;
        }
        const existingDurationInMs = existingEnd.getTime() - existingStart.getTime();
        const existingDurationInMinutes = existingDurationInMs / (1000 * 60);
        if (existingDurationInMinutes < 60 || existingEnd <= existingStart) {
            return true;
        }
        const hasTimeOverlap = !(
            newEnd <= existingStart ||
            newStart >= existingEnd
        );

        if (!hasTimeOverlap) return false;
        const sameInterviewer = interview.interviewer_name === newInterview.interviewer_name;
        const sameCandidate = interview.candidate_name === newInterview.candidate_name;
        return sameInterviewer || sameCandidate;
    });
};

export const isValidInterviewTime = (
    startDateTime: string,
    endDateTime: string
): { isValid: boolean; error?: string } => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (isNaN(startDate.getTime())) {
        return { isValid: false, error: 'Invalid start time' };
    }
    if (isNaN(endDate.getTime())) {
        return { isValid: false, error: 'Invalid end time' };
    }

    const durationInMs = endDate.getTime() - startDate.getTime();
    const durationInMinutes = durationInMs / (1000 * 60);

    if (durationInMinutes < 60) {
        return { isValid: false, error: 'Interview must be at least 1 hour long' };
    }

    if (endDate <= startDate) {
        return { isValid: false, error: 'End time must be after start time' };
    }

    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const startDayOfWeek = startDate.getDay();

    if (startHour < 9 || startHour >= 17) {
        return { isValid: false, error: 'Interviews must be scheduled between 9 AM and 5 PM' };
    }

    if (startDayOfWeek === 0 || startDayOfWeek === 6) {
        return { isValid: false, error: 'Interviews cannot be scheduled on weekends' };
    }

    if (startMinutes !== 0) {
        return { isValid: false, error: 'Interviews must start at the top of the hour' };
    }

    const endHour = endDate.getHours();
    if (endHour > 17) {
        return { isValid: false, error: 'Interviews must end by 5 PM' };
    }

    return { isValid: true };
};

export const convertToDateTimeLocalFormat = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};