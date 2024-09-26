const Grade = require('../models/Grade');

const assignGrade = async (req, res) => {
    const { studentId, courseId, grade } = req.body;

    const newGrade = new Grade({
        studentId,
        courseId,
        grade,
    });

    const createdGrade = await newGrade.save();
    res.status(201).json(createdGrade);
};

const getGrades = async (req, res) => {
    const grades = await Grade.find({ studentId: req.user._id }).populate(
        'courseId',
        'title'
    );
    res.json(grades);
};

module.exports = { assignGrade, getGrades };
