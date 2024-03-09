const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//Signup
exports.Signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      accountType,
      password,
      confirmPassword,
    } = req.body;

    console.log(`${firstName} ${lastName} ${email} ${accountType} ${password} ${confirmPassword}`)
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "Password does not matched",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "Alredy Registered User ",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(402).json({
        success: false,
        message: "error in encrypting password ",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully ",
      user,
    });
  } catch (err) {
    console.log("error in sign up", err);
    return res.status(500).json({
      success: false,
      message: "Error in Sign up the user please try again",
    });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body.password);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required for login",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "3h" });
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in user. Please try again later.",
    });
  }
};
