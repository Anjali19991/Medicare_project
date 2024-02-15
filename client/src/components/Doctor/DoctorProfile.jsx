import React from 'react'
import { useAuth } from '../../AuthContext'

export const DoctorProfile = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className='text-center text-3xl'>Doctor Profile</h1>
            {
                user ? (
                    <div className='mt-8 min-h-[80vh] flex justify-center items-center'>
                        <div className='max-w-md shadow-2xl'>
                            <h1 className='text-2xl'>{user.name}</h1>
                            <div>
                                <label htmlFor="email">
                                    Email:
                                </label>
                                <input type="text" name='email' value={user.email} />
                            </div>
                            <div>
                                <label htmlFor=""></label>
                            </div>

                        </div>
                    </div>
                ) : (
                    ""
                )
            }
        </div>
    )
}
