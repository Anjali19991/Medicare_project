import React from 'react'
import { useState } from 'react';

export const AppointmentForm = () => {
    const [appointment, setAppointment] = useState({
        name: '',
        gender: '',
        age: '',
        problem: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(appointment);
    };

    return (
        <div className="flex bg-teal-200 min-h-screen items-center flex-col gap-8 justify-center">
            <form onSubmit={handleSubmit} className='flex bg-white flex-col gap-4 shadow-2xl w-[30rem] p-8'>
            <p className='text-2xl text-center'>Appointment Form</p>
                <label htmlFor="pname" className="relative">
                    <input
                        type="text"
                        id="pname"
                        name="name"
                        placeholder='Patient Name'
                        value={appointment.name}
                        onChange={handleChange}
                        className='px-4 py-2 rounded-md w-full outline-none bg-slate-300'
                        required
                    />
                    <span id="name-error"></span>
                </label>
                <label htmlFor="Gender">
                    <select
                        name="gender"
                        id="Gender"
                        placeholder='Patient Gender'
                        value={appointment.gender}
                        onChange={handleChange}
                        className='px-4 py-2 rounded-md w-full outline-none bg-slate-300'
                        required

                    >
                        <option value="" disabled selected>
                            Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label htmlFor="age">
                    <input
                        name="age"
                        type="number"
                        id="age"
                        value={appointment.age}
                        onChange={handleChange}
                        placeholder="Patient's Age"
                        className='px-4 py-2 rounded-md w-full outline-none bg-slate-300'
                        min="3"
                        max="80"
                        required
                    />
                </label>
                <label htmlFor="problem" className="relative">
                    <textarea
                        name="problem"
                        id="problem"
                        cols="3"
                        placeholder="Patient's Problem"
                        className='px-4 py-2 rounded-md w-full outline-none bg-slate-300'
                        rows="3"
                        value={appointment.problem}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <span id="problem-error"></span>
                </label>
                <label htmlFor="date">
                    <input
                        name="date"
                        type="text"
                        id="date"
                        placeholder='Appointment Date DD-MM-YYYY'
                        onChange={handleChange}
                        className='px-4 py-2 rounded-md w-full outline-none bg-slate-300'
                        required
                    />
                </label>
                <p className="error"></p>
                <label htmlFor="time">
                    <input
                        type="text"
                        name="time"
                        id="time"
                        value={appointment.time}
                        placeholder='Appointment Time'
                        onChange={handleChange}
                        min="09:00"
                        max="17:00"
                        className='px-4 py-2 rounded-md w-full bg-slate-300'
                        required
                    />
                </label>
                <button type="submit" className='py-2 px-4 bg-teal-500 rounded-md text-white'>Book Appointment</button>
            </form>
        </div>
    );
}



