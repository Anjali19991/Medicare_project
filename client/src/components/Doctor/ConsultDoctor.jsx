import React from 'react'
import { useSelector } from 'react-redux'
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';



export const ConsultDoctor = () => {

    // const doctors = useSelector((state) => state.doctors.doctors)
    // console.log(doctors)
    // const theme = useSelector((state) => state.userState.theme)
    // console.log(theme)


    return (
        <>
            <div className='flex min-h-[86vh] gap-20 px-16  max-[1200px]:flex-col-reverse items-center justify-center'>
                <div className='w-[40%] max-[600px]:w-full max-[1200px]:w-[80%] flex flex-col gap-4'>
                    <h1 className='text-4xl'>Consult Your Doctor</h1>
                    <p>Discover expert healthcare at your fingertips. Connect with certified doctors for personalized consultations and medical guidance.Empower your well-being with convenient access to professional advice. Our platform ensures confidential and cost-effective healthcare solutions tailored to your needs.</p>
                    <div className='flex gap-4'> 
                        {/* <a href='#doctors' className='bg-teal-700 px-4 py-2 rounded-md text-white w-32'>
                            <ScrollLink to='doctors' smooth={true} duration={500}>
                                Consult Now
                            </ScrollLink>
                        </a> */}
                   </div>

                </div>
                <div className='w-[50%] max-[600px]:w-full max-[1200px]:w-[80%]'>
                    <img src="/doctors.png" alt="" />
                </div>
            </div>
            <div className={`flex max-[1000px]:flex-wrap gap-4 max-[1000px]:gap-12 items-center px-12 py-12 bg-slate-600 text-white`}>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2'>
                    <img src="/protection.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>100% Confidential</h1>
                    <p className='text-sm text-center'>All advice & consultations are completely confidential. You can also delete chats whenever you want.</p>
                </div>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2 '>
                    <img src="/badge.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>Certified Doctors</h1>
                    <p className='text-sm text-center'>We offer quality healthcare through our network of certified and experienced doctors.</p>
                </div>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2'>
                    <img src="/24-hour-service.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>Convenience</h1>
                    <p className='text-sm text-center'>Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</p>
                </div>
                <div className='w-1/4 max-[1000px]:w-full flex flex-col items-center gap-2'>
                    <img src="/profits.png" alt="" className='w-40' />
                    <h1 className='text-2xl'>Cost Effective</h1>
                    <p className='text-sm text-center'>We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.</p>
                </div>
            </div>
            <div id='doctors' className='my-8 px-16'>
                <h1 className='text-2xl font-semibold my-8'>Find Doctors</h1>
                {/* <div className='grid grid-cols-4 w-full gap-4'>
                    {
                        doctors.map((doctor) => (
                            <div className={`p-4 ${theme === 'winter' ? 'bg-slate-300 ' : 'bg-slate-700'} shadow-2xl rounded-md text-center`}>
                                <img src={`${doctor.gender === 'Male' ? 'doctor.png' : 'doctor_female.png'}`} alt="" className='w-36 mx-auto' />
                                <div className='flex items-center justify-between'>
                                    <p>Doctor Name:</p>
                                    <p>{doctor.username}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Doctor Email:</p>
                                    <p>{doctor.email}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Doctor Gender:</p>
                                    <p>{doctor.gender}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Doctor Specialisation:</p>
                                    <p>{doctor.specialisation}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Doctor Qualification:</p>
                                    <p>{doctor.Qualification}</p>
                                </div>
                                <div className='mt-4 mb-2'>
                                    <Link className='px-4 py-2 text-white rounded-md bg-teal-500' to={`${doctor.id}`}>Book Appointment</Link>
                                </div>

                            </div>
                        ))
                    }
                </div> */}
            </div>
        </>
    )
}
