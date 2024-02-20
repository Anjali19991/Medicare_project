const express = require('express');
const adminController = require('../controllers/adminController')
const router = express.Router();
const auth = require('../middleware/auth')

router.put('/approve/:docId', auth, adminController.approve)
router.put('/cancel/:docId', auth, adminController.cancel)
router.post('/post-announcement', auth, adminController.postAnnouncement);
router.get('/display-announcements',  adminController.getAnnouncements);


module.exports = router


