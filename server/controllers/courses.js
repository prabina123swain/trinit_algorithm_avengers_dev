const Course = require('../models/courses');
const User = require('../models/user')

exports.createCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseTitle,
      courseImgUrl,
      courseDetails,
      author_id,
      availableSlots,
      price
    } = req.body;

    const existingCourse = await Course.findOne({ courseTitle });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course already exists. Please choose a different course.'
      });
    }

    const newCourse = await Course.create({
      courseId,
      courseTitle,
      courseImgUrl,
      courseDetails,
      author_id,
      availableSlots,
      bookedSlots: [],
      enrolledUsers: [],
      price
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course. Please try again later.'
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId, updates } = req.body;
    let course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    for (let key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === 'availableSlots') {
          if (updates.availableSlots) {
            course.availableSlots.push(...updates.availableSlots);
          }
        } else {
          course[key] = updates[key];
        }
      }
    }
    course = await course.save();

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course. Please try again later.'
    });
  }
};


exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses
    let courses = await Course.find();

    for (let course of courses) {
      const author = await User.findById(course.author_id);
      course.authordetails = author;
    }
    console.log(courses);
    res.status(200).json({
      success: true,
      message: 'Courses fetched successfully',
      courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses. Please try again later.'
    });
  }
};



exports.bookCourse = async (req, res) => {
  try {
    const { courseId, slotIndex, userId } = req.body;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (slotIndex < 0 || slotIndex >= course.availableSlots.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid slot index'
      });
    }

    if (course.bookedSlots.some(slot => slot.day === course.availableSlots[slotIndex].day && slot.time === course.availableSlots[slotIndex].time)) {
      return res.status(400).json({
        success: false,
        message: 'Slot already booked'
      });
    }

    course.bookedSlots.push(course.availableSlots[slotIndex]);
    course.enrolledUsers.push(userId);

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course booked successfully'
    });
  } catch (error) {
    console.error('Error booking course:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking course. Please try again later.'
    });
  }
};