const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')
const userController = require('../controllers/userController.js')

router.get('/getuser',auth,userController.getUserDetails)
router.put('/updateprofile/:id',userController.updateUser)


module.exports = router;