const express = require("express");
const router = express.Router();

//import require controllers and middlewares

const {
    login, Signup,
        } = require("../controllers/Auth");

//const {auth} = require("../middlewares/auth");

//preform login and signup routes

router.post("/login",login);
router.post("/signup",Signup);