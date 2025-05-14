const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const redis= require('redis');

const client= redis.createClient();

client.on('connect', ()=>{
    console.log(`Redis is connected`);
});

client.on('err', (err)=>{
    console.log(err);
});

client.connect();

const register = async (req, res) => {
    try {
        const { name, email, password, age, gender, role } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(401).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", newUser});
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


const login= async(req, res)=>{
    try {
        const {email, password}= req.body;
        const userExist= await User.findOne({email});

        if(!userExist){
           return res.status(401).json({message: "Invalid credentials"});
        }

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials(password)"});
        }

        const token= jwt.sign({id: userExist._id, role: userExist.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: "User logged in successfully", token});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

const getAllUsers= async(req, res)=>{
    try {

        const cacheKey= 'users';

        const cachedData= await client.get(cacheKey);
        if(cachedData){
            return res.status(200).json({message: 'Users fetched successfully (cached)', users:JSON.parse(cachedData)});
        }

        const users= await User.find({}, '-password');  

        await client.set(cacheKey, JSON.stringify(users), { EX: 3600 })
        res.status(200).json({message: "Users retrieved successfully", users});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params; // Extract the user ID from the route parameters
        const { name, email, age, gender } = req.body;

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, age, gender }, // Fields to update
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error('Profile Update Error:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


module.exports = {register, login, getAllUsers, updateProfile};
