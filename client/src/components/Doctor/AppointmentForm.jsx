import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie'

const AppointmentForm = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setDoctor(location.state);
        }
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        age: 0,
        problem: '',
        selectedDate: new Date(),
        ticketPrice: 150,
        selectedTime: '',
        doctorId: location.state ? location.state._id : ''
    });

    const cookies = new Cookies();
    const token = cookies.get('TOKEN');

    const [doctor, setDoctor] = useState({});


    const handleDateChange = (date) => {
        setFormData({ ...formData, selectedDate: date });
    };

    const handleTimeChange = (e) => {
        setFormData({ ...formData, selectedTime: e.target.value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData((prevData) => ({ ...prevData, doctorId: doctor._id }));
        try {
            const response = await fetch('http://localhost:3000/user/bookappointment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Failed to book appointment');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
        console.log('Form submitted:', formData);
        setFormData({
            name: '',
            gender: '',
            age: 0,
            problem: '',
            selectedDate: new Date(),
            selectedTime: '',
            ticketPrice: 150,
            doctorId: location.state ? location.state._id : '',
        });
    };

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    return (
        <div className='flex items-center justify-center min-h-[85vh]'>
            <form onSubmit={handleSubmit} className='flex flex-col bg-gray-100 rounded-md shadow-sm w-[500px] border-2 p-4'>
                <h1 className='text-xl text-center mb-4'>Appointment Form</h1>
                <label className=''>
                    Name of the Patient:
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className='w-full border-b-1 my-1 border-black bg-gray-50 rounded-md'
                    placeholder="Enter Patient's name"
                    onChange={handleChange}
                    required
                />

                <label className=''>
                    Patient Gender:
                </label>
                <select
                    name="gender"
                    className='w-full border-b-1 my-1 border-black bg-gray-50 rounded-md'
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                        Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label className=''>
                    Patient's Age:
                </label>
                <input
                    type="number"
                    name="age"
                    className='w-full border-b-1 my-1 bg-gray-50 border-black rounded-md'
                    value={formData.age}
                    onChange={handleChange}
                    min="3"
                    max="80"
                    required
                />

                <label htmlFor="message" className="block mb-2">
                    Problem:
                </label>
                <textarea
                    name="problem"
                    rows="4"
                    className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Tell the doctor about the problem..."
                ></textarea>

                <div className='flex my-2 gap-4 items-center'>
                    <label className=''>
                        Appointment Date:
                        <br />
                        <DatePicker
                            className='border-b-1 my-1 bg-gray-50 border-black rounded-md'
                            selected={formData.selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            maxDate={maxDate}
                            required
                        />
                    </label>
                    <label className=''>
                        Time of Consultation:
                        <br />
                        <select
                            name="selectedTime"
                            className='my-1 bg-gray-50 border-black rounded-md w-full'
                            value={formData.selectedTime}
                            onChange={handleTimeChange}
                        >
                            <option value="">Select Time</option>
                            {doctor && doctor.timeSlots && doctor.timeSlots.length && doctor.timeSlots.map((slot, index) => (
                                <option key={index} value={`${slot.startTime} - ${slot.endTime}`}>
                                    {slot.startTime} - {slot.endTime}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <label htmlFor="ticketPrice">Consultation Fee:</label>
                <input className='my-2' name='ticketPrice' type="number" value={150} readOnly />
                <button type="submit" id="submit-btn" className='mt-4 bg-teal-700 text-white px-4 py-2 rounded-md'>
                    Book Appointment
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
