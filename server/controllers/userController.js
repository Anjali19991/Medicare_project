const Doctor = require('../models/DoctorSchema');
const User = require('../models/UserSchema')
const Appointment = require('../models/AppointmentSchema')
const Review = require('../models/ReviewSchema')


exports.getUserDetails = async (req, res) => {
    console.log(req.user)
    const { id } = req.user;
    try {
        const user = await User.findById({ _id: id }).select("-password")
        console.log(user)
        if (user) {
            return res.status(200).json({ user });
        }
        const doctor = await Doctor.findById({ _id: id }).select("-password")
        console.log(doctor);
        if (doctor) {
            return res.status(200).json({ doctor });
        }
        if (!user && !doctor) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    const { newUser } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: newUser }, { new: true })
        console.log(updatedUser);
        res.status(200).json({ success: true, message: "Updated Successfully", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to Update" });
    }
}


exports.bookappointment = async (req, res) => {
    const { doctorId, ticketPrice, appointmentDate } = req.body;
    const { id } = req.user;
    try {
        const user = await User.findOne({ _id: id });
        const doctor = await Doctor.findOne({ _id: doctorId })

        if (!user || !doctor) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const newAppointment = await Appointment.create({ doctor: doctorId, user: id, ticketPrice, appointmentDate })
        console.log(newAppointment);
        user.appointments.push(newAppointment);
        doctor.appointments.push(newAppointment);
        await user.save();
        await doctor.save();
        return res.status(201).json({
            success: true,
            message: "Appointment Booked Successfully"
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message })
    }
}

exports.writeReview = async (req, res) => {
    const { id, role } = req.user;
    const { docId } = req.params;

    if (role !== "patient") {
        return res.status(400).send({ message: "Only Patients can write a review for doctors", success: false });
    }

    try {
        const user = await User.findById(id);
        const doc = await Doctor.findById(docId);

        if (!user || !doc) {
            return res.status(400).send({ message: "User or Doctor not found", success: false });
        }

        const { review, rating } = req.body;
        const newReview = await Review.create({ doctor: docId, user: id, reviewText: review, rating });

        doc.reviews.push(newReview);
        await doc.save();

        return res.status(200).send({ message: "Review Created Successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error in Creating review", success: false });
    }
};



