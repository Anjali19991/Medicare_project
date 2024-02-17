const express = require('express');
const adminController = require('../controllers/adminController')
const router = express.Router();
const auth = require('../middleware/auth')

router.put('/approve/:docId', auth, adminController.approve)
router.put('/cancel/:docId', auth, adminController.cancel)

module.exports = router


