const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')
const auth = require('../middleware/auth')

const error = require('../middleware/error')

router.use(error);

router.get('/profile/:id', doctorController.getDoctorDetails);
router.get('/getdoctor/:id', doctorController.getDoctorDetails);
router.put('/updateDoctor',auth, doctorController.updateDoctor);
router.get('/getalldoctors', doctorController.getAllDoctors);
router.get('/getallconsultdoctors',doctorController.getAllConsultDoctors)
router.put('/updateAppointment/:status/:appointid', auth, doctorController.updateAppointment)
router.post('/manageslots', auth, doctorController.manageSlots)
router.get('/getnewappointments', auth, doctorController.getNewAppointments)
router.post('/addbio',auth,doctorController.addBio)

module.exports = router;