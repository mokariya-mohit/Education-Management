const express = require('express');
const { enrollStudent, removeStudent } = require('../controllers/enrollmentController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enroll', protect, admin, enrollStudent);
router.post('/remove', protect, admin, removeStudent);

module.exports = router;
