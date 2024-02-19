import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'universal-cookie';

export const AppointmentForm = () => {
    const location = useLocation();
    const [doctor, setDoctor] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);

    const cookie = new Cookies();

    const token = cookie.get('TOKEN')

    useEffect(() => {
        console.log(location.state);
        if (location.state) {
            setDoctor(location.state);
        }
    }, [location.state]);

    const filterSundays = (date) => {
        return date.getDay() !== 0; // 0 corresponds to Sunday
    };

    const filterFutureDates = (date) => {
        const currentDate = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(currentDate.getDate() + 7);
        return date >= currentDate && date <= nextWeek;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Reset selected slot when changing the date
        setSelectedSlot(null);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleSubmit = async () => {
        console.log('Selected Date:', selectedDate);
        console.log('Selected Slot:', selectedSlot);

        if (token) {
            try {
                const response = await fetch('http://localhost:3000/user/bookappointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        doctorId: doctor._id,
                        selectedDate,
                        selectedSlot,
                        ticketPrice: 150
                    }),
                });

                if (response.ok) {
                    // Handle success
                    const data = await response.json();
                    console.log('Backend response:', data);
                } else {
                    // Handle error
                    const data = await response.json();
                    console.log(data)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex my-12 px-12 items-start gap-8 justify-center">
                <img
                    className="w-1/3 h-full object-cover rounded-md shadow-md"
                    src={doctor.photo || 'placeholder-image.jpg'}
                    alt={doctor.name}
                    onError={(e) => {
                        e.target.src = 'placeholder-image.jpg'; // Replace with your placeholder image
                    }}
                />
                <div className="ml-4">
                    <div>
                        <h2 className="text-4xl font-semibold">Dr.{doctor.name}</h2>
                        <p className='text-xl font-light my-2'>{doctor.specialization},{doctor.qualification}</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui hic rerum voluptas obcaecati iure laborum blanditiis eligendi suscipit, alias deserunt est nobis id praesentium nam reiciendis ab sequi quo neque?</p>
                    </div>
                    <div className='flex gap-8 items-center'>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-md">Select Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                filterDate={(date) => filterSundays(date) && filterFutureDates(date)}
                                className="border border-gray-300 p-2 rounded-md mt-1"
                            />
                        </div>
                        {doctor && doctor.timeSlots && doctor.timeSlots.length > 0 && (
                            <div className='mt-4'>
                                <p className="mb-1 text-md">Select a Time Slot:</p>
                                <ul className='flex gap-4'>
                                    {doctor.timeSlots.map((slot, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSlotSelect(slot)}
                                            className={`px-2 py-2 cursor-pointer text-center w-28 border border-green-300 shadow-md rounded-md ${selectedSlot === slot ? 'bg-green-300' : ''
                                                }`}
                                        >
                                            {slot.startTime} - {slot.endTime}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    {/* Add a button or a form to submit the selected data */}
                    <button onClick={handleSubmit} className='my-4 px-4 py-2 bg-teal-700 text-white rounded-md shadow-md'>Book Appointment</button>
                </div>
            </div>
        </div>
    );
};
