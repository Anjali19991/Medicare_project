import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const AnnouncementsDisplay = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:3001/announcements');
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const formatTimestamp = (timestamp) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <div className="min-h-screen bg-teal-50 p-8">
            <h1 className="text-4xl font-bold mb-6 text-teal-800">
                <FaBell className="text-5xl inline-block mr-2" />
                Announcements
            </h1>

            {announcements.length === 0 ? (
                <p className="text-teal-700">No announcements available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white rounded-md shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4 text-teal-800">{announcement.title}</h2>
                            <p className="text-teal-700 mb-4">{announcement.content}</p>
                            <p className="text-teal-600">{formatTimestamp(announcement.timestamp)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnnouncementsDisplay;
