import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScheduledItems } from "./ScheduledItems"
import type { ScheduledListProps } from "@/types/components"

export const ScheduledList = ({ filteredInterviews, setDeleteId, isPending, deleteId }: ScheduledListProps) => {
    return (
        <Card>
            <ScrollArea className='w-[400px] h-[700px]'>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        {filteredInterviews.map(interview => (
                            <ScheduledItems key={interview._id} interview={interview} setDeleteId={setDeleteId} isPending={isPending} deleteId={deleteId} />
                        ))}
                        {filteredInterviews.length === 0 && (
                            <Alert>
                                <AlertDescription>
                                    No interviews found. Try adjusting your search or filter criteria.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>
            </ScrollArea >
        </Card>
    )
}