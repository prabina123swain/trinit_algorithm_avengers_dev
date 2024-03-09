//In this controller we have to define all the logic related to authentication and authorization
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/user");


require("dotenv").config();

//SendOTP middleware


exports.Signup=async (req,res)=>{
    try{
     //fetch data from req.body
        const {  
         firstName,
         lastName,        
         email,    
         accountType, 
         password,        
         confirmPassword,
         // countrycode,
        } =req.body;
        console.log(email,password,confirmPassword,firstName,lastName,accountType);
      //check all required details are filled or not
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(500).json({
                success:false,
                message:"All fields are required", 
            })
        }
      //check entry password matched or not  
        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Password does not matched",
            })
         }

       //check for existing user
        const isUserExist=await User.findOne({email});
        if(isUserExist){
           return res.status(400).json({
               success:false,
               message:"Alredy Registered User ",
           })  
        }

     //Hashing password for secure password
      const rounds=10;  //rounds define no of rounds for hashing the password
      let hashedPassword;
      try{
        hashedPassword= await bcrypt.hash(password,rounds);
      }
      catch(err){
        return res.status(402).json({
            success:false,
            message:'error in encrypting password '
        })
      }
       console.log("Hashed password is ",hashedPassword);
     //We need to create a profile because there exist one-to-one mapping
     //between user and user profile as user is registred correspoding profile is being created

    //insert user details to database
    const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
    })
   
     return res.status(200).json({
       success:true,
       message:"User registered successfully ",
       user
     })
    }
    catch(err){
        console.log("error in sign up",err);
       return res.status(500).json({
           success:false,
           message:"Error in Sign up the user please try again",
       })
    }
}

//Login

exports.login = async(req,res) =>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"All details are required for login",
            }) 
        }
       //find details of user from database
        const user = await User.findOne({email});
        
        //check user is exist or not 
        if(!user){
           return res.status(500).json({
               success:false,
               message:"User is not registered do registration",
           })  
        }

       //match the password 
       const matched=await bcrypt.compare(password,user.password);
       if(!matched){
        return res.status(401).json({
            success:false,
            message:"Password is not matched  ",
        })
       }
     //perform tokenization
     //create json web token by jwt.sign(payload, secretOrPrivateKey, [options, callback])
     const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType
     };
    //jwt creation requires 3 things payload(all info related to store),secret key,options(contains additional info)
     const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"3h" });
     
    // console.log("token created ",token);
     //insert token to user body for use during authorization
     user.toObject();
     user.token=token;
     //change password to undefined fro security perpose ,It will not affect DB data i.e password will not change in DB
     user.password=undefined;
     
     //insert a token to cooike for instance action
     //cookie creation has 3 parts 1-cookie name,2-data to store 3-options
     const options={
        expiresIn:new Date(Date.now()+3*24*60*60*1000), //3 days from current time
        httpOnly:true
     }
     res.cookie("token",token,options).status(200).json({
        success:true,
        message:"Logged  in successfully ",
        user
     })

    }
    catch(err){
        console.log("error in log in ",err);
        return res.status(500).json({
            success:false,
            message:"Error in Login the user please try again",
        })
    }
}
