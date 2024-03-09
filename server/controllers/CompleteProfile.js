const Tutor = require("../models/tutor");
const Student = require("../models/student");
const User = require("../models/user");

exports.CompleteTutorDetails = async (req, res) => {
  try {
    const { email, bio, phone, languages, profilePhotoLink } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with the provided email",
      });
    }

    if (user.accountType !== "Tutor") {
      return res.status(400).json({
        success: false,
        message: 'Account type is not "tutor". Cannot complete tutor profile.',
      });
    }

    const existingTutor = await Tutor.findOne({ user_id: user._id });
    if (existingTutor) {
      return res.status(400).json({
        success: false,
        message: "Tutor profile already completed",
      });
    }

    const newTutor = await Tutor.create({
      user_id: user._id,
      bio,
      phone,
      languages,
      profilePhotoLink,
    });

    res.status(201).json({
      success: true,
      message: "Tutor profile completed successfully",
      tutor: newTutor,
    });
  } catch (error) {
    console.error("Error completing tutor profile:", error);
    res.status(500).json({
      success: false,
      message: "Error completing tutor profile. Please try again later.",
    });
  }
};

exports.CompleteStudentDetails = async (req, res) => {
  try {
    const { email, about, phone, preferences, profilePhotoLink } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with the provided email",
      });
    }

    if (user.accountType !== "Student") {
      return res.status(400).json({
        success: false,
        message: 'Account type is not "student". Cannot complete student profile.',
      });
    }

    const existingStudent = await Student.findOne({ user_id: user._id });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student profile already completed",
      });
    }

    const newStudent = await Student.create({
      user_id: user._id,
      about,
      phone,
      preferences,
      profilePhotoLink,
    });

    res.status(201).json({
      success: true,
      message: "Student profile completed successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error completing student profile:", error);
    res.status(500).json({
      success: false,
      message: "Error completing student profile. Please try again later.",
    });
  }
};
