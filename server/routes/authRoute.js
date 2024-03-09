const express = require('express');
const router = express.Router();


const {login, Signup} = require('../controllers/Auth');
const {CompleteStudentDetails, CompleteTutorDetails} = require('../controllers/CompleteProfile')

router.post('/login',login);
router.post('/signup',Signup);
router.post('/complete-tutor-profile', CompleteTutorDetails);
router.post('/complete-student-profile', CompleteStudentDetails);

module.exports = router;