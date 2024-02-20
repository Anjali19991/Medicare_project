const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')
const userController = require('../controllers/userController.js')

router.get('/getuser', auth, userController.getUserDetails)
router.put('/updateprofile', auth, userController.updateUser)
router.post('/bookappointment', auth, userController.bookappointment)
router.post('/writereview/:docId', auth, userController.writeReview)
router.get('/getuserappointments', auth, userController.getUserAppointments)


module.exports = router;