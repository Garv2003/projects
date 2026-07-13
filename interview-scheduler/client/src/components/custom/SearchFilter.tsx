import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SearchFilterProps } from "@/types/components";
import { INTERVIEW_TYPES } from "@/types/interview";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchFilter = ({ searchQuery, setSearchQuery, selectedType, setSelectedType }: SearchFilterProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by candidate or interviewer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>
            <div className="w-full sm:w-48">
                <Select
                    value={selectedType || undefined}
                    onValueChange={setSelectedType}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all" key={'all'}>All</SelectItem>
                        {INTERVIEW_TYPES.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button asChild className="whitespace-nowrap">
                <Link to="/schedule">Schedule Interview</Link>
            </Button>
        </div>
    )
}