const Course = require('../models/Course');

const createCourse = async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    const course = new Course({
        title,
        description,
        teacherId: req.user._id,
        startDate,
        endDate,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
};

const getCourses = async (req, res) => {
    const courses = await Course.find({}).populate('teacherId', 'username');
    res.json(courses);
};

const updateCourse = async (req, res) => {
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);

    if (course) {
        course.title = title || course.title;
        course.description = description || course.description;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (course) {
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
