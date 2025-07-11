import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import User from "../models/User.Model.js";

dotenv.config()

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email ID Is Already Exist..." });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User Registration Successfully...", newUser })
    } catch (error) {
        return res.status(500).json({message: "User Registration Failed...", error: error.message})
    }
}


export const login = async (req, res ) =>{
    try {
        const {email,password}= req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"Email ID Not Exist"})
        }

        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Password..." });
        }

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRETKEY, {expiresIn: "3d"} )
        return res.status(200).json({message : "Login Succesfully...", user:user.name, token})
    } catch (error) {
         return res.status(500).json({message : "Login Failed...", error: error.message})
    }
}


export const getProfile = async (req, res)=> {
    try {
         // Get the user ID from the request (added by middleware)
        const userId = req.userId;

        const user = await User.findOne(userId).select("-password");
        if (!user){
            return res.status(404).json({message: "User Not Found"})
        }

        return res.status(200).json({ message: "User Profile Fetched Successfully", user });

    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch profile", error: error.message });
    }
}