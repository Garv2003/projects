import type { CalendarViewProps } from '@/types/components';
import { Card, CardContent } from "@/components/ui/card";
import { momentLocalizer } from 'react-big-calendar';
import { Calendar } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarView = ({ calendarEvents, view, setView }: CalendarViewProps) => {
    const localizer = momentLocalizer(moment);

    return (
        <Card className='w-full'>
            <CardContent className="p-4">
                <div style={{ height: '600px' }}>
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        view={view as any}
                        onView={(newView: string) => setView(newView)}
                        views={['month', 'week', 'day']}
                        eventPropGetter={(event: any) => ({
                            className: 'cursor-pointer',
                            style: {
                                backgroundColor: event.interview.type === 'Technical' ? '#0ea5e9' :
                                    event.interview.type === 'HR' ? '#10b981' : '#8b5cf6'
                            }
                        })}
                    />
                </div>
            </CardContent>
        </Card>
    )
}