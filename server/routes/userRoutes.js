const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')
const userController = require('../controllers/userController.js')


const error = require('../middleware/error')

router.use(error);

router.get('/getAllUsers',auth,userController.getAllUsers)
router.get('/getuser', auth, userController.getUserDetails)
router.put('/updateprofile', auth, userController.updateUser)
router.post('/bookappointment', auth, userController.bookappointment)
router.post('/writereview', auth, userController.writeReview)
router.get('/getuserappointments', auth, userController.getUserAppointments)
router.post('/buymedicines',auth,userController.buymedicines)
router.get('/getmedicinehistory',auth,userController.getMedicinesBought)

module.exports = router;