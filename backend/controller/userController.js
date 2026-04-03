import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//JWT TOken

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};


//Login user

const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try{

         //checking user already exists 
         const user =  await userModel.findOne({email});
         if(!user){
            return res.json({sucess:false, message:"User not found"});
         }

         //check password
        
         const  isMatch = await bcrypt.compare(password, user.password);
         if(!isMatch){
            return res.json({success:false, message:"Invalid password"});
         }
          const token = createToken(user._id);
          res.json({success:true, token, user: { id: user._id, name: user.name, email: user.email }});

    }catch(error){
        console.log("Error", error.message);
        res.json({success:false, message:"Error"});
    }

} 






//register user

const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{

        //checking user already exists 
        const exists = await userModel.findOne({email});
        if(exists){
           return  res.json({ success: false, message: "User already Exists" });
        }

        //validating email formate or password
    if(!validator.isEmail(email)){
        return  res.json({ success: false, message: "please enter valid email" });
    }

    if(password.length<8){
        return  res.json({ success: false, message: "please enter valid password" });
    }
    //bcrypt password

     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password, salt);
    
     const newUser = userModel({
             name: name,
             email: email,
             password:hashPassword
             
         });

         const user = await newUser.save();
         const token = createToken(user._id);
         res.json({success:true, message:"User Registered", token, user: { id: user._id, name: user.name, email: user.email }});
    }
    catch (error) {
        console.log("ERROR 👉", error.message);
        res.json({ success: false, message: "Error" });
       
    }
    }




const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.log('Error', error.message);
        res.json({ success: false, message: 'Error' });
    }
};

export {loginUser, registerUser, getMe};