import mongoose from "mongoose";


const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    location: String,
    contactNumber: Number,
    email: String,
    noOfDoctors: Number,
    approved: { type: String, default: "null" },
    registrationType: { type: String, default: "Hospital" },
});

const Hospital = mongoose.model("HospitalDetails", hospitalSchema);

export default Hospital;