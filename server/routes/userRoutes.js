const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')
const userController = require('../controllers/userController.js')

router.get('/getuser',auth,userController.getUserDetails)
router.put('/updateprofile',auth,userController.updateUser)
router.post('/bookappointment',auth,userController.bookappointment)


module.exports = router;