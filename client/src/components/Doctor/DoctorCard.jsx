import React, { useState,useEffect } from 'react';

const DoctorCard = ({ doctor }) => {
    const { name, email, role, phone, photo, specialization, qualification } = doctor;
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const imageData = new Uint8Array(photo.data.data);
                const blob = new Blob([imageData], { type: photo.contentType });

                const reader = new FileReader();

                reader.onload = () => {
                    const base64Image = reader.result;
                    // Ensure photoUrl is different before updating to avoid infinite loop
                    if (base64Image !== photoUrl) {
                        setPhotoUrl(base64Image);
                        console.log(base64Image);
                    }
                };

                reader.readAsDataURL(blob);

            } catch (error) {
                console.error("Error fetching photo:", error);
            }
        };

        fetchPhoto();
    }, [])
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md mb-4">
            <img className="w-full h-64 object-cover" src={photoUrl ? photoUrl : ''} alt={name} />

            <div className="p-4">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-gray-500">{role}</p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-bold">Email:</span> {email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Phone:</span> {phone}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-bold">Specialization:</span> {specialization}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Qualification:</span> {qualification}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
