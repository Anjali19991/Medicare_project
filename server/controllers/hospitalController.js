const Hospital = require("../models/HospitalSchema.js");

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch hospitals" });
  }
};

exports.searchHospitalByName = async (req, res) => {
  const { name } = req.query;

  try {
    const hospitals = await Hospital.find({
      name: { $regex: new RegExp(`^.*${name}.*$`) },
    });
    if (hospitals.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hospitals found with that name" });
    }
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to search for hospitals" });
  }
};

exports.getHospitalDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById({ _id: id }).populate([
      "doctors",
      "patients",
    ]);
    if (!hospital) {
      return res.status(400).json({
        success: false,
        message: "Hospital not found",
      });
    }
    return res.status(200).json({
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
