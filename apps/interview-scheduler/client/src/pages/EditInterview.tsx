import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InterviewType, INTERVIEW_TYPES } from '@/types/interview';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useInterviewForm } from '@/hooks/useInterviewForm';
import { convertToDateTimeLocalFormat } from "@/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from "lucide-react";

export const EditInterview = () => {
    const {
        formData,
        isLoading,
        isError,
        error,
        isPending,
        handleSubmit,
        handleInputChange,
        handleBack
    } = useInterviewForm();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error?.message}</AlertDescription>
            </Alert>
        );
    }

    if (!formData) return null;

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Interview</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="candidateName">Candidate Name</Label>
                        <Input
                            id="candidateName"
                            required
                            value={formData.candidate_name}
                            onChange={(e) => handleInputChange('candidate_name', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="interviewerName">Interviewer Name</Label>
                        <Input
                            id="interviewerName"
                            required
                            value={formData.interviewer_name}
                            onChange={(e) => handleInputChange('interviewer_name', e.target.value)}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className="space-y-2">
                            <Label htmlFor="startTime">Start Date and Time</Label>
                            <Input
                                id="startTime"
                                type="datetime-local"
                                required
                                value={convertToDateTimeLocalFormat(formData.start_time)}
                                onChange={(e) => handleInputChange('start_time', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endTime">End Date and Time</Label>
                            <Input
                                id="endTime"
                                type="datetime-local"
                                required
                                value={convertToDateTimeLocalFormat(formData.end_time)}
                                onChange={(e) => handleInputChange('end_time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Interview Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => handleInputChange('type', value as InterviewType)}
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
                        <Label htmlFor="notes">Notes</Label>
                        <Input
                            id="notes"
                            value={formData.additional_notes || ''}
                            onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" type="button" onClick={handleBack}>
                            Back
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Update Interview'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};