import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
    const navigate = useNavigate();

    const dateClick = (info) => {
        navigate(`/diary/${info.dateStr}`);
    };

    return (
        <div style={{ margin: '15px' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                height="85vh"
                dateClick={dateClick}
                events={[
                    { title: 'Example Event 1', date: '2023-05-11' },
                    { title: 'Example Event 2', date: '2023-05-13' },
                ]}
            />
        </div>
    );
}

export default DashBoard;