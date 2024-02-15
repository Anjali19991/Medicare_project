import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';


export const DoctorDashboard = () => {

    const [active, setActive] = useState("home");
    const { user, setUser } = useAuth();

    console.log(user);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(!user){
    //         navigate('/',{replace:true});
    //     }
    // })

    return (
        <>
        <div>
            Doctor Dashboard
        </div>
            {/* <nav className='absolute h-full bg-teal-800 w-64'>
                <Link to={'/'}>
                    <h1 className='m-4 text-3xl font-bold text-center text-white'>MEDICARE</h1>
                </Link>
                <ul className='mt-24'>
                    <li className={`p-4 cursor-pointer hover:bg-slate-300 hover:text-black duration-300 transition-all ${active === 'home' ? 'bg-slate-300 text-black' : 'text-white'}`} onClick={() => setActive("home")} >Home</li>
                    <li className={`p-4 cursor-pointer hover:bg-slate-300 hover:text-black duration-300 transition-all ${active === 'newAppointments' ? 'bg-slate-300 text-black' : 'text-white'}`} onClick={() => setActive("newAppointments")}>New Appointments</li>
                    <li className={`p-4 cursor-pointer hover:bg-slate-300 hover:text-black duration-300 transition-all ${active === 'pastAppointments' ? 'bg-slate-300 text-black' : 'text-white'}`} onClick={() => setActive("pastAppointments")} >Past Appointments</li>
                    <li className={`p-4 cursor-pointer hover:bg-slate-300 hover:text-black duration-300 transition-all ${active === 'profile' ? 'bg-slate-300 text-black' : 'text-white'}`} onClick={() => setActive("profile")}>Profile</li>
                </ul>
            </nav>
            <div className='my-16 ml-72 mr-8'>
                <div className={`${active === 'home' ? 'block' : 'hidden'}`}>
                    <h1 className='text-3xl'>Welcome!!!</h1>
                    <div className=' m-16 text-white grid grid-cols-3 max-[1200px]:grid-cols-2 gap-8 items-center justify-center place-items-center overflow-hidden'>
                        <div className='rounded-full shadow-2xl w-64 h-64 flex flex-col gap-8 items-center  justify-center bg-indigo-500 hover:-translate-y-2 hover:scale-105 duration-300 transition-all cursor-pointer' >
                            <h1 className='font-semibold text-5xl'>5</h1>
                            <h2 className='text-xl'>New Appointments</h2>
                        </div>
                        <div className='rounded-full shadow-2xl w-64 h-64 flex flex-col gap-8 items-center justify-center bg-orange-500 hover:-translate-y-2 hover:scale-105 duration-300 transition-all cursor-pointer'>
                            <h1 className='font-semibold text-5xl'>12</h1>
                            <h2 className='text-xl'>Past Appointments</h2>
                        </div>
                        <div className='rounded-full  shadow-2xl w-64 h-64 flex flex-col gap-8 items-center justify-center bg-red-500 hover:-translate-y-2 hover:scale-105 duration-300 transition-all cursor-pointer'>
                            <h1 className='font-semibold text-5xl'>3</h1>
                            <h2 className='text-xl'>Rejected Appointments</h2>
                        </div>
                    </div>
                </div>
                <div className={`${active === 'newAppointments' ? 'block' : 'hidden'}`}>
                    <h1 className='text-2xl'>New Appointments</h1>
                    <div className='mt-8'>
                        <table className='min-w-full border-b-2 border-t-2 border-gray-300'>
                            <thead>
                                <tr className='shadow-xl'>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Name</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Gender</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Age</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Problem</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Appointment Date</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Appointment Slot</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Accept/Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b-2 border-t-2 border-gray-300'>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>John</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>M</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>25</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Fever</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>06/12/2023</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>11:00 AM</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>
                                        <button className='px-2 rounded-sm bg-green-400 font-bold'>√</button>
                                        <button className='ml-2 px-2 rounded-sm bg-red-400 font-bold'>X</button>
                                    </td>
                                </tr>
                                <tr className='border-b-2 border-t-2 border-gray-300'>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Vijay</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>M</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>18</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Cold</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>12/12/2023</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>4:00 PM</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>
                                        <button className='px-2 rounded-sm bg-green-400 font-bold'>√</button>
                                        <button className='ml-2 px-2 rounded-sm bg-red-400 font-bold'>X</button>
                                    </td>
                                </tr>
                                <tr className='border-b-2 border-t-2 border-gray-300'>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Preethi</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>F</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>20</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>HeadAche</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>08/12/2023</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>9:00 AM</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>
                                        <button className='px-2 rounded-sm bg-green-400 font-bold'>√</button>
                                        <button className='ml-2 px-2 rounded-sm bg-red-400 font-bold'>X</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${active === 'pastAppointments' ? 'block' : 'hidden'}`}>
                    <h1 className='text-2xl'>Past Appointments</h1>
                    <div className='mt-8'>
                        <table className='min-w-full border-b-2 border-t-2 border-gray-300'>
                            <thead>
                                <tr className='shadow-xl'>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Name</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Gender</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Age</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Patient Problem</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Appointment Date</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Appointment Slot</th>
                                    <th className='border-b-2 border-gray-300 px-4 py-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b-2 border-t-2 border-gray-300'>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Vivek</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>M</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>19</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Fever</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>01/12/2023</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>11:00 AM</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>
                                        Completed
                                    </td>
                                </tr>
                                <tr className='border-b-2 border-t-2 border-gray-300'>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Vijay</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>M</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>18</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Cold</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>03/12/2023</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>4:00 PM</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>
                                        Completed
                                    </td>
                                </tr>
                                <tr className='border-b-2 border-t-2 border-gray-300'>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>Preethi</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>F</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>20</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>HeadAche</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>04/12/2023</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>9:00 AM</td>
                                    <td className='border-b-2 text-center border-gray-300 px-4 py-2'>
                                        Completed
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`${active === 'profile' ? 'block' : 'hidden'}`}>
                    <h1 className='text-2xl'>Profile</h1>
                    <div className='mt-8'>
                        <div className='grid grid-cols-1 items-center justify-center gap-4'>
                            <div>
                                <strong>Name:</strong> Dr. John Doe
                            </div>
                            <div>
                                <strong>Email:</strong> john.doe@example.com
                            </div>
                            <div>
                                <strong>Specialization:</strong> Cardiology
                            </div>
                            <div>
                                <strong>Qualification:</strong> MD, Cardiologist
                            </div>
                            <div>
                                <strong>Gender:</strong> Male
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
