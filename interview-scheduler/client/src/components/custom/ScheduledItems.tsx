import { ShceduledItemsProps } from "@/types/components"
import { Edit2, Trash2, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import moment from "moment";

export const ScheduledItems = ({ interview, setDeleteId, isPending, deleteId }: ShceduledItemsProps) => {
    return (
        <div
            key={interview._id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
        >
            <div className="space-y-1">
                <h3 className="font-medium">{interview.candidate_name}</h3>
                <p className="text-sm text-gray-500">
                    with {interview.interviewer_name} • {interview.type}
                </p>
                <p className="text-sm text-gray-500">
                    {moment(interview.start_time).format('MMMM D, YYYY h:mm A')}
                </p>
                <p className="text-sm text-gray-500">
                    {moment(interview.end_time).format('MMMM D, YYYY h:mm A')}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <Button variant="outline" size="icon" asChild
                    disabled={isPending && deleteId === interview._id}
                >
                    <Link to={`/edit/${interview._id}`}>
                        <Edit2 className="h-4 w-4" />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDeleteId(interview._id)}
                    disabled={isPending && deleteId === interview._id}
                >
                    {isPending && deleteId === interview._id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    )
}