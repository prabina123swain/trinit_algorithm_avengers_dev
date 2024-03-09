//Create middlewires for verifying the role of user
require("dotenv").config();
const jwt=require("jsonwebtoken");

const auth= async (req,res,next)=>{
    try{
        const token=req.body.token;
    //Verify if token exist or not
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }
    //extract process object from token for finding role of that object
        try{
    const payload=jwt.verify(token,process.env.JWT_SECRET);
       // console.log(payload);
         //insert role to request for accessing latar in isStudent/isAdmin middlewire below
        req.user=payload; 
       // console.log(req.user.role);
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Error in extracting data from token"
            })
        };
        next();
    }
    catch(err){
        return res.status(200).json({
            success:true,
            message:"failed in verifing the user"
        })
    }
}


const isStudent= async (req,res,next)=>{
   try{ 
  //  console.log(req.user.role);
    if(req.user.role!="Student"){
        return res.status(401).json({
            success:false,
            message:"CHECK VALID AUTHENTICATED USER THIS IS ONLY FOR STUDENT"
        })
    }
    next();
   }
   catch(err){
    return res.status(200).json({
        success:true,
        message:"failed in verifing the Role of Student"
    })
   }
}

const isAdmin= async (req,res,next)=>{
   // console.log(req.user.role);
    try{ 
     if(req.user.role!="Admin"){
         return res.status(401).json({
             success:false,
             message:"CHECK VALID AUTHENTICATED USER THIS IS ONLY FOR ADMIN"
         })
     }
     next();
    }
    catch(err){
     return res.status(200).json({
         success:true,
         message:"failed in verifing the Role of Admin"
     })
    }
 }

module.exports={auth,isAdmin,isStudent};