const Doctor = require('../models/DoctorSchema')
const Appointment = require('../models/AppointmentSchema');


exports.getDoctorDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById({ _id: id }).select("-password")
        if (!doctor) {
            return res.status(400).json({ success: false, message: "Doctor not found" })
        }
        return res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateDoctor = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({ success: true, message: "Updated Successfully", data: updatedDoctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to Update" });
    }
}

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('reviews');
        console.log(doctors)
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch" })
    }
}

exports.updateAppointment = async (req, res) => {
    console.log(req.user)
    console.log("hello")
    console.log(req.params);
    const { id, status } = req.params;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate({ _id: id }, { status: status });
        console.log(updatedAppointment);
        res.status(200).json({ success: true, message: "Appointment Updated" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error In updating Appointment" });
    }

}

exports.manageSlots = async (req, res) => {
    const { daySlots } = req.body;

    try {
        // Assuming you have the doctor's ID from authentication
        const doctorId = req.user.id;

        // Find the doctor by ID
        const doctor = await Doctor.findById(doctorId);

        // Add the new slots to the doctor's timeSlots array
        doctor.timeSlots = [...doctor.timeSlots, ...daySlots];

        // Save the doctor with the new timeSlots
        await doctor.save();

        res.status(200).json({ message: 'Slots added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}