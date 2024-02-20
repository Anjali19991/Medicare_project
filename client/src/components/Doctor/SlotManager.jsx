import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useAuth } from '../../AuthContext';
import { useLocation } from 'react-router-dom';

const SlotManager = () => {
    const { user } = useAuth();
    // console.log(user.timeSlots)
    const location = useLocation()
    console.log(location.state);

    // Add a conditional check for user and user.timeSlots
    const initialDaySlots = user && user.timeSlots ? user.timeSlots : [];

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [daySlots, setDaySlots] = useState(initialDaySlots);
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    console.log(token)

    const handleAddSlot = () => {
        if (startTime && endTime) {
            const newSlot = {
                startTime,
                endTime,
            };
            setDaySlots([...daySlots, newSlot]);
            setStartTime('');
            setEndTime('');
        }
        console.log(daySlots);
    };

    const handleRemoveSlot = (index) => {
        const updatedSlots = [...daySlots];
        updatedSlots.splice(index, 1);
        setDaySlots(updatedSlots);
    };

    useEffect(() => {
        const initialDaySlots = user && user.timeSlots ? user.timeSlots : [];
        setDaySlots(initialDaySlots);
    }, [user])

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/doctor/manageslots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ daySlots }),
            });

            console.log(response);

            if (response.ok) {
                // Handle success
                const data = await response.json();
                console.log(data);
            } else {
                // Handle error
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {daySlots.length > 0 && (
                <div>
                    <p className="my-2">Your Current Time Slots:</p>
                    <ul className='flex gap-4'>
                        {daySlots.map((slot, index) => (
                            <li key={index} className='px-2 py-2 text-center w-28 border border-green-300 shadow-md rounded-md'>
                                {slot.startTime} - {slot.endTime}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-4">
                <label className="block my-2 text-gray-700">Add New Time Slots:</label>
                <div className="flex items-center gap-2">
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md"
                    />
                    <span>-</span>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md"
                    />
                    <button onClick={handleAddSlot} className="bg-blue-500 text-white p-2 rounded-md">
                        Add Slot
                    </button>
                    <button onClick={handleSubmit} className='bg-teal-700 text-white p-2 rounded-md'>
                        Set Slots
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlotManager;
