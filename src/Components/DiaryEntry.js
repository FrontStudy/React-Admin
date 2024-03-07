import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DiaryEntry() {
    const { date } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        const entriesForCurrentDate = savedEntries.filter(entry => entry.date === date);
        setEntries(entriesForCurrentDate);
    }, [date]);
    
    const handleSave = () => {
        const title = entry.trim();
        if (title) { 
            const newEntry = {
                id: Date.now().toString(),
                title: title,
                date: date
            };
            let savedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
            savedEntries.push(newEntry);
            localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
            // navigate('/calendar');
        }
    };

    return (
    <div style={{ display: 'flex', padding: '50px' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
            <h2>나의 일기장 {date}</h2>
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                style={{ width: '100%', height: '300px', marginBottom: '10px' }}
            ></textarea>
            <button onClick={() => handleSave()}>저장</button>
        </div>

        <div style={{ flex: 1 }}>
        <h2>Previous Entries</h2>
        <ul>
            {entries.map((entry, index) => (
                <li key={index}>{date} {entry.title}</li>
            ))}
        </ul>
        </div>
    </div>
    );
}

export default DiaryEntry;