const Course = require('../models/Course');
const User = require('../models/User');

const enrollStudent = async (req, res) => {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (course && student) {
        if (!course.enrolledStudents.includes(studentId)) {
            course.enrolledStudents.push(studentId);
            await course.save();
            res.status(200).json({ message: 'Student enrolled successfully' });
        } else {
            res.status(400).json({ message: 'Student already enrolled' });
        }
    } else {
        res.status(404).json({ message: 'Course or Student not found' });
    }
};

const removeStudent = async (req, res) => {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);

    if (course) {
        course.enrolledStudents = course.enrolledStudents.filter(
            (id) => id.toString() !== studentId
        );
        await course.save();
        res.status(200).json({ message: 'Student removed from course' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

module.exports = { enrollStudent, removeStudent };
