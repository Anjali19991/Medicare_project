const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')
const auth = require('../middleware/auth')

router.get('/profile/:id',doctorController.getDoctorDetails);
router.put('/updateDoctor',doctorController.updateDoctor);
router.get('/getalldoctors',doctorController.getAllDoctors);
router.put('/updateAppointment/:status/:id',auth,doctorController.updateAppointment)

module.exports = router;