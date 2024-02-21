const Hospital = require("../models/HospitalSchema");
const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema");
const Announcement = require("../models/AnnouncementScheme");

exports.approve = async (req, res) => {
  const { docId } = req.params;
  const { id, role } = req.user;
  // console.log(req.user);
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  console.log(id);
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      { isApproved: "approved" },
      { new: true }
    );
    console.log(updatedDoctor);
    return res.status(200).json({ success: true, message: "Doctor Approved" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to approve doctor" });
  }
};

exports.cancel = async (req, res) => {
  const { docId } = req.params;
  const { id, role } = req.user;
  // console.log(req.user);
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  console.log(id);
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      { isApproved: "cancelled" },
      { new: true }
    );
    console.log(updatedDoctor);
    return res
      .status(200)
      .json({ success: true, message: "Doctor License Cancelled" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to cancel doctor" });
  }
};
exports.block = async (req, res) => {
  const { userId } = req.params;
  const { id, role } = req.user;
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  console.log(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: "blocked" },
      { new: true }
    );
    console.log(updatedUser);
    return res.status(200).json({ success: true, message: "User Blocked" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to block the User" });
  }
};

exports.postAnnouncement = async (req, res) => {
  const { announcementTitle, announcementContent } = req.body; // Adjust field names

  if (!announcementTitle || !announcementContent) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  const { id, role } = req.user;

  if (role !== "admin") {
    return res.status(400).json({
      success: false,
      message: "Invalid Request - Only admins can post announcements",
    });
  }

  try {
    const newAnnouncement = new Announcement({
      title: announcementTitle,
      content: announcementContent,
    });
    const savedAnnouncement = await newAnnouncement.save();

    return res.status(201).json({
      success: true,
      message: "Announcement posted successfully",
      announcement: savedAnnouncement,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to post announcement" });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();

    return res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve announcements" });
  }
};

exports.deleteHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }
    await Hospital.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Hospital deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete hospital" });
  }
};

exports.approveHospital = async (req, res) => {
  const { id, approval } = req.body;
  const hospital = await Hospital.findById(id);
  if (!hospital) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
    });
  }
  hospital.set("approved", approval);
  const updatedHospital = await hospital.save();
  if (!updatedHospital) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
    });
  }
  return res.status(200).send({
    success: true,
    message: (!approval ?? "Dis") + "Approved the hospital",
  });
};

exports.updateMedicineDeliveryStatus = async(req,res) =>{

}

