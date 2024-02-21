import React,{useEffect} from 'react'
import { useAuth } from '../../AuthContext'

export const NewAppointments = () => {

    const { user } = useAuth();
    useEffect(()=>{
        if(user){
            console.log(user)
        }
    },[])
    return (
        <>
            <h1>New Appointments</h1>
            {
                user && user.appointments.length !==0 ? (
                    <div>
                        {
                            user.appointments.map((appointment)=>{
                                return (
                                    <div>
                                        <p>{appointment.createdAt}</p>
                                        <p>{appointment.status}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                ):(<>No Appintments</>)
            }
        </>
    )
}
