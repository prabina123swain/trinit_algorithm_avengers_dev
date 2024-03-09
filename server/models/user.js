const mongoose=require("mongoose");

const userModel=new mongoose.Schema({
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
     enum:["Student","Instructor"]
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
})

module.exports=mongoose.model("User",userModel);