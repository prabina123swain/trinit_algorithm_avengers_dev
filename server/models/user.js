const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
    },
    email:{
     type:String, 
     required:true,
     trim:true
    },
    password:{
     type:String,
     required:true
    },
    accountType:{
     type:String,
     required:true,
     enum:["Student","Instructor"],
     default: "Student"
    }
})

const user = mongoose.model("User",userSchema);
module.exports = user;