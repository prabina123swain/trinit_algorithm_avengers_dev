const express = require("express");
const router = express.Router();

//import require controllers and middlewares

const {login, Signup} = require("../controllers/Auth");

//const {auth} = require("../middlewares/auth");

//preform login and signup routes

router.post("/api/v1/login",login);
router.post("/api/v1/signup",Signup);