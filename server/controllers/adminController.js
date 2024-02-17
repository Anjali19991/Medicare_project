const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema");


exports.approve = async (req, res) => {
    const { docId } = req.params;
    const { id, role } = req.user;
    // console.log(req.user);
    if (role !== 'admin') {
        return res.status(400).send({ message: "Invalid Request" })
    }
    console.log(id);
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(docId, { isApproved: "approved" }, { new: true })
        console.log(updatedDoctor);
        return res.status(200).json({ success: true, message: "Doctor Approved" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to approve doctor" })
    }
}

exports.cancel = async (req, res) => {
    const { docId } = req.params;
    const { id, role } = req.user;
    // console.log(req.user);
    if (role !== 'admin') {
        return res.status(400).send({ message: "Invalid Request" })
    }
    console.log(id);
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(docId, { isApproved: "cancelled" }, { new: true })
        console.log(updatedDoctor);
        return res.status(200).json({ success: true, message: "Doctor License Cancelled" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to cancel doctor" })
    }
}


exports.block = async (req, res) => {
    const { userId } = req.params;
    const { id, role } = req.user;
    if (role !== 'admin') {
        return res.status(400).send({ message: "Invalid Request" })
    }
    console.log(id);
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { isActive: "blocked" }, { new: true })
        console.log(updatedUser);
        return res.status(200).json({ success: true, message: "User Blocked" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to block the User" })
    }

}