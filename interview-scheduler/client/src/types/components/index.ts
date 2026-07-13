import { Interview } from "@/types/interview";
import React from "react";

export type DeleteConfirmationProps = {
    deleteId: string | null;
    setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
    handleDelete: () => void;
}

export type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    interview: Interview;
}

export type CalendarViewProps = {
    calendarEvents: CalendarEvent[];
    view: string;
    setView: React.Dispatch<React.SetStateAction<string>>
}

export type ScheduledListProps = {
    filteredInterviews: Interview[]
    setDeleteId: React.Dispatch<React.SetStateAction<string | null>>
    isPending: boolean
    deleteId: string | null
}

export type ShceduledItemsProps = {
    interview: Interview;
    setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
    isPending: boolean
    deleteId: string | null
}

export type SearchFilterProps = {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedType: string | null;
    setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
}
