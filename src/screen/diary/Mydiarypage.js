import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import koLocale from '@fullcalendar/core/locales/ko';

function Mydiarypage() {

  const navigate = useNavigate();
    const [entries, setEntries] = useState([
        { title: 'Example Event 1', date: '2023-05-11' },
        { title: 'Example Event 2', date: '2023-05-13' },
    ]);

    const dateClick = (info) => {
        navigate(`/diary/${info.dateStr}`);
    };

    useEffect(() => {
        let savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        savedEntries.sort((a, b) => a.id - b.id);
        setEntries(savedEntries);
    }, []);

    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <span>{eventInfo.event.title}</span>
                <button data-entry-id={eventInfo.event.id} className="delete-event-btn" style={{ marginLeft: '5px', fontSize: 'smaller' }}>
                    Delete
                </button>
            </div>
        );
    };
    
    // You'll then need to set up a global event listener to handle clicks on delete buttons
    useEffect(() => {
        const handleGlobalClick = (e) => {
            if (e.target.matches('.delete-event-btn')) {
                const entryId = e.target.getAttribute('data-entry-id');
                deleteEntry(entryId);
            }
        };
    
        document.addEventListener('click', handleGlobalClick);
    
        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);

    function deleteEntry(entryId) {
        let savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        const filteredEntries = savedEntries.filter(entry => entry.id !== entryId);
        localStorage.setItem('diaryEntries', JSON.stringify(filteredEntries));
        setEntries(filteredEntries);
    }

  return (
    <div id='mydiary'>
      <div className='diarymain diarycontentBox'>
        <div className='maincalendar'>
          <div>
              <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={koLocale}
              headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              end: 'dayGridMonth'
              }}
              height="75vh"
              dateClick={dateClick}
              events={entries}
              eventContent={renderEventContent}
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mydiarypage;