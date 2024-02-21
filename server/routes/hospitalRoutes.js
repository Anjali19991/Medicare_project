const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.get("/getAllHospitals", hospitalController.getAllHospitals);
router.get("/getHospital/:id", hospitalController.getHospitalDetails);
router.post("/createHospital", hospitalController.createHospital);
//based on the functionality in the controllers more routes can be added
module.exports = router;
