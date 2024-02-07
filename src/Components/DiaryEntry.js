import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DiaryEntry() {
    const { date } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState('');

    const handleSave = () => {
        // Here you would typically send the entry to your backend or store it locally
        console.log(`Saving entry for ${date}: ${entry}`);
        navigate('/calendar'); // Redirect back to the calendar after save
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Diary Entry for {date}</h2>
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                style={{ width: '100%', height: '150px', marginBottom: '10px' }}
            ></textarea>
            <button onClick={handleSave}>Save Entry</button>
        </div>
    );
}

export default DiaryEntry;