import { useState } from 'react';
import { IoMdCheckmark, IoIosPin, IoIosCall, IoMdMail, IoIosKey, IoIosShareAlt } from 'react-icons/io';
import { GiHospital } from 'react-icons/gi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HospitalForm = () => {
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        pincode: '',
        socials: '',
    });

    const showToast = (message, type) => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const [hospitalName, setHospitalName] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState('');
    const [socials, setSocials] = useState([{ name: '', url: '' }]);

    const handleNameChange = (e) => {
        setHospitalName(e.target.value);
    };

    const locationChange = (e) => {
        setLocation(e.target.value);
    };

    const contactChange = (e) => {
        setContactNumber(e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };



    const pinCodeChange = (e) => {
        setPincode(e.target.value);
    };


    const handleSocialNameChange = (index, value) => {
        const updatedSocials = [...socials];
        updatedSocials[index].name = value;
        setSocials(updatedSocials);
    };

    const handleSocialURLChange = (index, value) => {
        const updatedSocials = [...socials];
        updatedSocials[index].url = value;
        setSocials(updatedSocials);
    };


    const validate = (data) => {
        const newErrors = {};

        for (const item in data) {
            const value = Array.isArray(data[item]) ? data[item] : String(data[item]);

            if (Array.isArray(value)) {
                if (value.length === 0) {
                    newErrors[item] = `${item.charAt(0).toUpperCase() + item.slice(1)} can't be empty`;
                }
            } else {
                if (value.trim().length === 0) {
                    newErrors[item] = `${item.charAt(0).toUpperCase() + item.slice(1)} can't be empty`;
                }
            }
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const details = {
            name: hospitalName,
            address: location,
            phoneNumber: contactNumber,
            email: email,
            pincode: pincode,
            socials: socials,
            timestamp: Date.now(),
            status: 'pending',
        };

        if (validate(details)) {
            fetch('http://localhost:3000/hospital/register-hospital', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Data submitted successfully:', data);

                    if (data.success) {
                        showToast('Hospital registration request successful, wait for approval!', 'success');
                        setHospitalName('');
                        setLocation('');
                        setContactNumber('');
                        setEmail('');
                        setPincode('');
                        setSocials([{ name: '', url: '' }]); 
                    } else {
                        console.log('Failed to register hospital:', data.message);
                        showToast('Failed to register hospital', 'error');
                    }
                })
                .catch((err) => {
                    console.log('Error', err);
                    showToast('Error submitting data', 'error');
                });
        }
    };



    return (
        <div className="h-full w-full -mt-6 flex items-center justify-center min-h-[70vh]">
            <div className="flex flex-row p-10 rounded-md shadow-2xl">
                <div className="bg-teal-700 p-6 shadow-lg flex items-center justify-center flex-col w-[32rem] rounded-l-md">
                    <h1 className="text-white font-medium text-3xl">Quality Healthcare </h1>
                    <h3 className="text-white text-lg mt-4 w-[24rem]">
                        Join our network of healthcare providers by registering your hospital. By doing so,
                        you will gain access to a platform dedicated to delivering quality healthcare services.
                        We value your commitment to healthcare excellence and look forward to having you on board.
                    </h3>
                </div>

                <section className="grid place-items-center bg-zinc-200 rounded-r-md">
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 bg-base-100 shadow-lg flex flex-col gap-y-4 bg-opacity-40 w-[26rem] min-h-[60vh]"
                    >
                        <h4 className="text-center text-3xl font-bold text-teal-800">
                            Hospital Registration
                        </h4>

                        {/* Section 1: Hospital Information */}
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <GiHospital className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${errors.name ? "border-red-500" : ""}`}
                                placeholder="Hospital Name"
                                type="text"
                                id="name"
                                name="name"
                                required
                                onChange={handleNameChange}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                        {/* Section 2: PIN Code */}
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <IoIosKey className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${errors.pinCode ? "border-red-500" : ""}`}
                                placeholder="PIN Code"
                                type="number"
                                id="pinCode"
                                name="pinCode"
                                required
                                onChange={pinCodeChange}
                            />
                        </div>
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}

                        {/* Section 3: Address */}
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <IoIosPin className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${errors.address ? "border-red-500" : ""}`}
                                placeholder="Address"
                                type="text"
                                id="address"
                                name="address"
                                required
                                onChange={locationChange}
                            />
                        </div>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

                        {/* Section 4: Email */}
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <IoMdMail className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${errors.email ? "border-red-500" : ""}`}
                                placeholder="Email"
                                type="email"
                                id="email"
                                name="email"
                                required
                                onChange={emailChange}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                        {/* Section 5: Contact Number */}
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <IoIosCall className="text-teal-500 mr-2" />
                            <input
                                className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md flex-1 ${errors.phoneNumber ? "border-red-500" : ""}`}
                                placeholder="Contact Number"
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                pattern="[0-9]{10}"
                                title="Please enter a valid 10-digit phone number"
                                required
                                onChange={contactChange}
                            />
                        </div>
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}



                        {/* Section 7: Social Media Link */}
                        <div className="flex items-center border-b-2 border-teal-500 py-2">
                            <IoIosShareAlt className="text-teal-500 mr-2" />
                            <div className="flex flex-col flex-1">
                                <input
                                    className={`px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md ${errors.socials ? "border-red-500" : ""}`}
                                    placeholder="Social Media Name"
                                    type="text"
                                    id={`socialName${0}`}  // Use a unique ID for each input
                                    name={`socialName${0}`}  // Use a unique name for each input
                                    required
                                    onChange={(e) => handleSocialNameChange(0, e.target.value)}
                                />
                                <input
                                    className={`mt-2 px-4 py-2 focus:border-teal-400 focus:outline-none border-none focus:ring-1 focus:ring-teal-600 rounded-md ${errors.socials ? "border-red-500" : ""}`}
                                    placeholder="Social Media URL"
                                    type="text"
                                    id={`socialURL${0}`}  // Use a unique ID for each input
                                    name={`socialURL${0}`}  // Use a unique name for each input
                                    required
                                    onChange={(e) => handleSocialURLChange(0, e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.socials && <p className="text-red-500 text-sm mt-1">{errors.socials}</p>}


                        {/* Section 8: Submit Button */}
                        <div className="mt-2">
                            <button
                                className="px-4 py-3 w-full text-white rounded-md bg-teal-600"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e); 
                                }}
                            >
                                Register <IoMdCheckmark className="ml-2" />
                            </button>
                        </div>


                    </form>
                </section>
            </div>
        </div>
    );
};


export default HospitalForm;
