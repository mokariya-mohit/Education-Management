const express = require('express');
const { assignGrade, getGrades } = require('../controllers/gradeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/assign', protect, assignGrade);
router.get('/', protect, getGrades);

module.exports = router;
