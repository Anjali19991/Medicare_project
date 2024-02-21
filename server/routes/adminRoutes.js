const express = require('express');
const adminController = require('../controllers/adminController')
const router = express.Router();
const auth = require('../middleware/auth')

router.put('/approvedoctor/:docId', auth, adminController.approve)
router.put('/canceldoctor/:docId', auth, adminController.cancel)
router.post('/post-announcement', auth, adminController.postAnnouncement);
router.get('/display-announcements',  adminController.getAnnouncements);
router.put('/approvehospital/:hospId',auth,adminController.approveHospital)
router.put('/cancelhospital/:hospId', auth, adminController.rejectHospital)



module.exports = router


