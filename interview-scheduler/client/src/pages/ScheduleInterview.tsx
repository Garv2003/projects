
// ScheduleInterview.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INTERVIEW_TYPES } from '@/types/interview';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { useScheduleForm } from '@/hooks/useScheduleForm';

export const ScheduleInterview = () => {
    const {
        formData,
        handleInputChange,
        handleSubmit,
        handleNavigateBack
    } = useScheduleForm();

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Schedule New Interview
                </h1>
                <p className="text-gray-500 mt-2">Fill in the details below to schedule a new interview.</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="candidateName">Candidate Name</Label>
                                <Input
                                    id="candidateName"
                                    placeholder="Enter candidate name"
                                    required
                                    value={formData.candidate_name}
                                    onChange={(e) => handleInputChange('candidate_name', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interviewerName">Interviewer Name</Label>
                                <Input
                                    id="interviewerName"
                                    placeholder="Enter interviewer name"
                                    required
                                    value={formData.interviewer_name}
                                    onChange={(e) => handleInputChange('interviewer_name', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startDateTime">Start Date and Time</Label>
                                <Input
                                    id="startDateTime"
                                    type="datetime-local"
                                    required
                                    value={formData.start_time}
                                    onChange={(e) => handleInputChange('start_time', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDateTime">End Date and Time</Label>
                                <Input
                                    id="endDateTime"
                                    type="datetime-local"
                                    required
                                    value={formData.end_time}
                                    onChange={(e) => handleInputChange('end_time', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Interview Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) => handleInputChange('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select interview type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {INTERVIEW_TYPES.map(type => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Input
                                id="notes"
                                placeholder="Add any additional notes or requirements"
                                value={formData.additional_notes}
                                onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleNavigateBack}
                            >
                                Back
                            </Button>
                            <Button type="submit">
                                Schedule Interview
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};