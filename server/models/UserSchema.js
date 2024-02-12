const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: String,
    },
    password: {
        type: String,
        required: String
    },
    phone: {
        type: Number
    },
    photo: { 
        type: String 
    },
    role: {
        type: String,
        enum: ["patient","doctor","admin"],
        default: "patient",
    },
    gender: { 
        type: String, 
        enum: ["male", "female", "other"] 
    },
    bloodType: { 
        type: String 
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
})

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;