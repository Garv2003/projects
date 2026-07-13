
import { ScheduledList, SearchFilter, CalendarView } from "@/components/custom";
import { DeleteConfirmation } from "@/components/custom/dialog";
import { useInterviews } from '@/hooks/useInterviews';

export const Dashboard = () => {
    const {
        filteredInterviews,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        deleteId,
        setDeleteId,
        view,
        setView,
        calendarEvents,
        handleDelete,
        isLoading,
        isPending
    } = useInterviews();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <div className='w-full flex gap-2'>
                <CalendarView
                    calendarEvents={calendarEvents}
                    view={view}
                    setView={setView}
                />
                <ScheduledList
                    filteredInterviews={filteredInterviews}
                    setDeleteId={setDeleteId}
                    isPending={isPending}
                    deleteId={deleteId}
                />
                <DeleteConfirmation
                    deleteId={deleteId}
                    setDeleteId={setDeleteId}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};