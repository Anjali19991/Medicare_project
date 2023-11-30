import React, { useState, useEffect } from 'react';
import MedicineCard from './MedicineCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/MedicineSlice';
import { IoSearchOutline } from "react-icons/io5";

export const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedMedicines, setSearchedMedicines] = useState([]);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = (medicine) => {
        dispatch(addToCart(medicine));
    };

    function handleSearch(e) {
        const input = e.target.value;
        setSearchInput(input);
        if (input.trim() !== '') {
            searchMedicines(input);
        } else {
            setSearchedMedicines([]);
        }
    }

    function searchMedicines(input) {
        const searchedMedicines = medicines.filter((medicine) => {
            return medicine.name.toLowerCase().includes(input.toLowerCase());
        });
        setSearchedMedicines(searchedMedicines);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../medicines.json');
                const data = await response.json();
                console.log(data)
                setMedicines(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='my-20 py-4 px-8 max-[480px]:px-1 -z-10'>
                <div className='text-center relative w-96 mx-auto max-[400px]:w-64'>
                    <IoSearchOutline className='text-xl absolute top-[50%] left-4 -translate-y-1/2' />
                    <input type="text" placeholder='Search For Medicines....' className='px-12 py-2 border-2 border-teal-700 rounded-md w-96 outline-none max-[400px]:w-64' onChange={(e) => handleSearch(e)} />
                </div>
                <div className={searchedMedicines.length === 0 ? 'flex items-center min-h-[75vh] justify-center my-4' : 'my-4'}>
                    {
                        searchInput === '' ? (
                            <div className="grid grid-cols-3 max-[1435px]:grid-cols-2 max-[1435px]:place-items-center items-center max-[1000px]:grid-cols-1 gap-x-16 gap-y-8">
                                {medicines.map((medicine, index) => (
                                    <MedicineCard key={index} medicineData={medicine} onAddToCart={() => handleAddToCart(medicine)} isAddedToCart={isAddedToCart} setIsAddedToCart={setIsAddedToCart} />
                                ))}
                            </div>
                        ) : (
                            searchedMedicines.length > 0 ? (
                                <div className="grid grid-cols-3 max-[1435px]:grid-cols-2 max-[1435px]:place-items-center items-center max-[1000px]:grid-cols-1 gap-x-16 gap-y-8">
                                    {searchedMedicines.map((medicine, index) => (
                                        <MedicineCard key={index} medicineData={medicine} onAddToCart={() => handleAddToCart(medicine)} isAddedToCart={isAddedToCart} setIsAddedToCart={setIsAddedToCart} />
                                    ))}
                                </div>
                            ) : (
                                <p className='text-xl'>No matching medicines found</p>
                            )
                        )
                    }
                </div>
            </div>
       
        </>
    );
};
