const express = require('express');
const router = express.Router();

const {createCourse, bookCourse, updateCourse, getAllCourses} = require('../controllers/courses');


router.post('/tutor/create-new-course',createCourse);
router.post('/tutor/update-course',updateCourse);
router.post('/user/book-course-slot',bookCourse);
router.post('/user/all-courses',getAllCourses);

module.exports = router;