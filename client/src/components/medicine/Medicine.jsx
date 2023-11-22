import React, { useState, useEffect } from 'react';
import MedicineCard from './MedicineCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/MedicineSlice';



export const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const dispatch = useDispatch();


    const handleAddToCart = (medicine) => {
        dispatch(addToCart(medicine));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../medicines.json');
                const data = await response.json();
                setMedicines(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='py-4 px-8 max-[480px]:px-1'>
            <div>
                {
                    medicines.length !== 0 ? (
                        <div className="grid grid-cols-3 max-[1435px]:grid-cols-2 max-[1435px]:place-items-center items-center max-[1000px]:grid-cols-1 gap-x-16 gap-y-8">
                            {medicines.map((medicine, index) => (
                                <MedicineCard key={index} medicineData={medicine} onAddToCart={() => handleAddToCart(medicine)} />
                            ))}
                        </div>
                    ) : (
                        <p>No Medicines</p>
                    )
                }
            </div>
        </div>
    );
};

