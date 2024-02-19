const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema.js');
const OTP = require('../models/OtpSchema.js');
const Doctor = require('../models/DoctorSchema.js')
const { uploadImage } = require('../utils/uploadImage.js')




const SECRET = "fakhawkehqw232dasasd"

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, SECRET, {
        expiresIn: '15d'
    })
}

const hashedPass = async()=>{
    const hashedPass = await bcrypt.hash("Admin@123", 10);
    console.log(hashedPass);
}

hashedPass();

// exports.signup = async (req, res) => {
//     console.log(req.file)
//     try {
//         console.log(req.body);
//         // const { name, email, password, role, otp } = req.body;
//         const { name, email, password, role } = req.body;
//         if (!name || !email || !password || !role) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'All fields are required',
//             });
//         }


//         const ExistingUser = await User.findOne({ email })
//         // const ExistingDoctor = await Doctor.findOne({ email })
//         if (ExistingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User already exists',
//             });
//         }
//         let newUser;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         if (role === "doctor") {
//             const {specialization,qualification,phone} = req.body;
//             console.log(specialization);
//             newUser = await Doctor.create({
//                 name: name,
//                 email,
//                 password: hashedPassword,
//                 photo:{
//                     data:req.file.buffer,
//                     contentType:req.file.mimetype
//                 },
//                 specialization,
//                 qualification,
//                 phone
//             });
//         } else {
//             newUser = await User.create({
//                 name: name,
//                 email,
//                 password: hashedPassword,
//                 role,
//                 photo:{
//                     data:req.file.buffer,
//                     contentType:req.file.mimetype
//                 }
//             });
//         }
//         return res.status(201).json({
//             success: true,
//             message: 'User registered successfully',
//             user: newUser,
//         });
//         // const existingUser = await User.findOne({email})
//         // if(existingUser){
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: 'User already exists',
//         //     });
//         // }

//         // const response = await OTP.findOne({ email });
//         // if (otp !== response.otp) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: 'The OTP is not valid',
//         //     });
//         // }

//         // let hashedPassword;
//         // try {
//         //     hashedPassword = await bcrypt.hash(password, 10);
//         // } catch (error) {
//         //     return res.status(500).json({
//         //         success: false,
//         //         message: `Hashing password error for ${password}: ` + error.message,
//         //     });
//         // }
//         // // const newUser = await User.create({
//         // //     name,
//         // //     email,
//         // //     password: hashedPassword,
//         // //     role
//         // // });
//         // const newUser = await User.create({
//         //     name:name,
//         //     email,
//         //     password: hashedPassword,
//         //     role
//         // });

//         // if (role === "doctor") {
//         //     const newDoctor = await Doctor.create({
//         //         name:name,
//         //         email,
//         //         password: hashedPassword,
//         //         role
//         //     })
//         //     return res.status(201).json({
//         //         success: true,
//         //         message: 'User registered successfully',
//         //         user: newDoctor,
//         //     });
//         // }
//         // return res.status(201).json({
//         //     success: true,
//         //     message: 'User registered successfully',
//         //     user: newUser,
//         // });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }

exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        let newUser;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (req.file) {
            const cloudinaryResult = await uploadImage(req);
            console.log(cloudinaryResult);
            const photoURL = cloudinaryResult.data.secure_url;
            console.log(photoURL);
            if (role === "doctor") {
                const { specialization, qualification, phone } = req.body;
                newUser = await Doctor.create({
                    name,
                    email,
                    password: hashedPassword,
                    photo: photoURL,
                    specialization,
                    qualification,
                    phone
                });
            } else {
                newUser = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    photo: photoURL,
                });
            }

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: newUser,
            });
        } else {
            // Handle case where no file is provided
            return res.status(400).json({
                success: false,
                message: 'Profile picture is required',
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        // Check if the user exists in the regular user collection
        const regularUser = await User.findOne({ email });

        // Check if the user exists in the doctor collection
        const doctor = await Doctor.findOne({ email });

        if (!regularUser && !doctor) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            });
        }

        let user;
        if (regularUser) {
            user = regularUser;
        } else if (doctor) {
            user = doctor;
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            });
        }

        const token = generateToken(user);

        res.json({
            message: 'Successfully logged in',
            success: true,
            token,
            user
        }).status(200);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
