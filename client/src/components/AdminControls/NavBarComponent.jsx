// NavBarComponent.js
import React from 'react';

const NavBarComponent = () => {
    return (
        <nav className="bg-teal-500 p-5">
            <div className="container mx-auto flex items-center justify-center">
                <ul className="flex space-x-7 text-white text-lg font-semibold">
                    <li>
                        <a href="/admin-dashboard" className="hover:underline">Dashboard</a>
                    </li>
                    <li>
                        <a href="/users" className="hover:underline">All Users</a>
                    </li>
                    <li>
                        <a href="/admin-verification" className="hover:underline">Approval Requests</a>
                    </li>
                    <li>
                        <a href="/admin-announcements" className="hover:underline">Post Announcements</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBarComponent;
