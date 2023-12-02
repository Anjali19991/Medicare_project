import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaBell } from 'react-icons/fa'; // Example icon, replace with your preferred icon
import NavBarComponent from './NavBarComponent';



const AdminAnnouncements = () => {
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementContent, setAnnouncementContent] = useState('');
    const [announcementsList, setAnnouncementsList] = useState([]);

    const handleTitleChange = (e) => {
        setAnnouncementTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setAnnouncementContent(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (announcementTitle.trim() !== '' && announcementContent.trim() !== '') {
            // Add the announcement to the list with timestamp
            const newAnnouncement = {
                title: announcementTitle,
                content: announcementContent,
                timestamp: new Date().toLocaleString(),
            };

            setAnnouncementsList([...announcementsList, newAnnouncement]);

            // Clear the input fields
            setAnnouncementTitle('');
            setAnnouncementContent('');
        }
    };

    return (
        <>
            <NavBarComponent />

            <div className="flex items-center   h-screen bg-teal-50">
                {/* Left Section with SVG */}
                <div className="flex left-6">
                    <img src="/admin-announcement.svg" alt="Admin Announcement" className="w-80 h-80 ml-24 -mt-20" />
                </div>

                {/* Right Section with Form */}
                <div className="max-w-md bg-white p-6 rounded-lg shadow-xl ml-48 -mt-64 h-96">
                    <h1 className="text-3xl font-bold mb-4 text-teal-800">
                        <FaBell className="text-4xl inline-block mr-2" />
                        Admin Announcements
                    </h1>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Announcement Title"
                            value={announcementTitle}
                            onChange={handleTitleChange}
                            className="border p-2 rounded focus:outline-none focus:border-teal-500 w-full"
                        />

                        <textarea
                            rows={4}
                            placeholder="Announcement Content"
                            value={announcementContent}
                            onChange={handleContentChange}
                            className="border p-2 rounded focus:outline-none focus:border-teal-500 w-full"
                        />

                        <button
                            type="submit"
                            className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 flex items-center w-full"
                        >
                            <IoMdSend className="mr-2 text-xl" />
                            Post Announcement
                        </button>
                    </form>
                </div>

               {/* Announcement List */}
{announcementsList.length > 0 && (
    <div className="max-w-md bg-white p-6 rounded-lg shadow-xl ml-40 -mt-80 overflow-hidden">
        <div className="mt-8 max-h-80 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2 text-teal-800">Announcements:</h2>
            <ul>
                {announcementsList.map((announcement, index) => (
                    <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
                        <strong className="text-teal-600">{announcement.title} ({announcement.timestamp}):</strong>
                        <div className="whitespace-pre-wrap break-words">{announcement.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)}



            </div>
        </>

    );
};

export default AdminAnnouncements;
