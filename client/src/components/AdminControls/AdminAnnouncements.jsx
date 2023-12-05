import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import NavBarComponent from './NavBarComponent';

const AdminAnnouncements = () => {
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementContent, setAnnouncementContent] = useState('');

    const handleTitleChange = (e) => {
        setAnnouncementTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setAnnouncementContent(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (announcementTitle.trim() !== '' && announcementContent.trim() !== '') {
            const newAnnouncement = {
                title: announcementTitle,
                content: announcementContent,
                timestamp: new Date().toLocaleString(),
            };

            try {
                const response = await fetch('http://localhost:3001/announcements', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAnnouncement),
                });

                if (response.ok) {
                    console.log('Announcement posted successfully');
                    // Clear the input fields
                    setAnnouncementTitle('');
                    setAnnouncementContent('');
                } else {
                    console.error('Failed to post announcement:', response.statusText);
                }
            } catch (error) {
                console.error('Error posting announcement:', error);
            }
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
                        Post Announcement
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
            </div>
        </>
    );
};

export default AdminAnnouncements;
