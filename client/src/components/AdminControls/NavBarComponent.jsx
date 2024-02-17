import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from '../../AuthContext';


const NavBarComponent = () => {

    const cookies = new Cookies();
    const {user,setUser} = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        cookies.remove('TOKEN')
        setUser(null)
        navigate('/')
      };

    return (
        <nav className="bg-teal-800 p-5">
            <div className="container mx-auto flex items-center justify-between">

                {/* Home link on the left with special styling */}
                <Link to="/" className="text-white text-lg font-semibold hover:underline bg-gray-800 px-4 py-2 rounded">Home</Link>

                <ul className="flex space-x-7 text-white text-lg font-semibold">
                    <li>
                        <Link to="/admin-dashboard" className="hover:underline">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/users" className="hover:underline">All Users</Link>
                    </li>
                    <li>
                        <Link to="/admin-verification" className="hover:underline">Approval Requests</Link>
                    </li>
                    <li>
                        <Link to="/admin-announcements" className="hover:underline">Post Announcements</Link>
                    </li>
                    <button
                        className="text-xl hover:bg-gray-50 hover:text-teal-800 px-2 py-2 text-white-800 font-semibold rounded shadow"
                        onClick={handleLogout}
                    >
                        <FiLogOut />
                    </button>
                </ul>
            </div>
        </nav>
    );
};

export default NavBarComponent;
