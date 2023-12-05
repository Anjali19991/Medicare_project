import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom
import { FaBell } from 'react-icons/fa';
import { HomeLayout } from '../../pages';

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
        <>
        <HomeLayout/>
           <div className="min-h-screen bg-teal-50 p-8 text-center announcements-page">
            {/* <Link to="/" className="text-teal-800 mb-4 block text-xl absolute top-0 left-0 p-4 font-semibold ml-10">
                Back to Home
            </Link> */}

            <h1 className="text-4xl font-bold mb-6 text-teal-800">
                <FaBell className="text-5xl inline-block mr-2" />
                Announcements
            </h1>

            {announcements.length === 0 ? (
                <p className="text-teal-700">No announcements available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white rounded-md shadow-md p-6 announcement-card">
                            <h2 className="text-xl font-bold mb-4 text-teal-800">{announcement.title}</h2>
                            <p className="text-teal-700 mb-4">{announcement.content}</p>
                            <p className="text-teal-600">{formatTimestamp(announcement.timestamp)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default AnnouncementsDisplay;
