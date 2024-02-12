const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')


router.get('/profile/:id',doctorController.getDoctorDetails);
router.put('/updateDoctor',doctorController.updateDoctor)

module.exports = router;