import { React, useState } from 'react'
import { BsHandIndex } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { register } from '../../features/DoctorSlice';
import { useNavigate } from "react-router-dom";


export const DoctorRegister = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        username: '',
        gender: '',
        email: '',
        specialisation: '',
        Qualification: '',
        password: '',
        cnfPassword: ''
    });

    const handleChange = (e) => {
        setDoctor((prev) => (
            { ...prev, [e.target.name]: e.target.value }
        ))

        console.log(doctor)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(register(doctor))
        navigate("/doctordashboard")
    }



    return (
        <form className='flex min-h-screen items-center justify-center' onSubmit={(e)=>handleSubmit(e)}>
            <div className='bg-teal-600 rounded-md flex flex-col gap-4 p-8 w-3/4 max-[1245px]:w-[90%]'>
                <h1 className='text-2xl text-center text-white'>Register as Doctor</h1>
                <div className='flex max-[600px]:flex-wrap gap-6 my-1 w-full'>
                    <input className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' onChange={(e) => handleChange(e)} type="text" name='username' placeholder='Username' required />
                    <select className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' onChange={(e) => handleChange(e)} name="gender" required>
                        <option value="" defaultValue>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='flex max-[600px]:flex-wrap gap-6 my-1'>
                    <input className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' onChange={(e) => handleChange(e)} name='email' type="email" placeholder='Enter Email' required />
                    <select className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' onChange={(e) => handleChange(e)} name="specialisation" required>
                        <option value="" defaultValue>Specialization</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Internal Medicine">Internal Medicine</option>
                        <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Radiology">Radiology</option>
                        <option value="General Surgery">General Surgery</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                        <option value="Family Medicine">Family Medicine</option>
                        <option value="Chest Medicine">Chest Medicine</option>
                        <option value="Anesthesia">Anesthesia</option>
                        <option value="Pathology">Pathology</option>
                        <option value="ENT">ENT</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='flex max-[600px]:flex-wrap gap-6 my-1'>
                    <select name="Qualification" className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' onChange={(e) => handleChange(e)} required>
                        <option value="" defaultValue>Qualification</option>
                        <option value="RMP">RMP</option>
                        <option value="MBBS">MBBS</option>
                        <option value="MS">MS</option>
                        <option value="MD">MD</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="password" className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' name='password' onChange={(e) => handleChange(e)} placeholder='Password' required />
                </div>
                <div className='flex max-[600px]:flex-wrap gap-6 my-1'>
                    <input type="password" className='px-4 py-2 rounded-sm w-1/2 max-[600px]:w-full outline-none' name='cnfPassword' onChange={(e) => handleChange(e)} placeholder='Confirm Password' required />
                    <button type='submit' className='px-4 py-2 text-white rounded-sm bg-indigo-600 max-[600px]:w-full w-1/2'>Register</button>
                </div>
            </div>
        </form>
    )
}
