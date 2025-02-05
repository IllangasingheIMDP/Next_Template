require("dotenv").config();
const UserModel = require("../model/UserModel");

const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require('../utils/hash');
const AuthController = {
    loginUser: async (req, res) => {
        try {
            const user = await UserModel.findByEmail(req.body.email);
            
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: "Email not found" });
            }
            ;

            const isMatch = await comparePassword(req.body.password, user.password);
            
            if (!isMatch) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid Email or Password" });
            }

            // Generate Access Token (short-lived)
            const accessToken = jwt.sign(
                { username: user.username, email: req.body.email, userType: user.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "12h" } // Expires in 12h
            );

            // Generate Refresh Token (long-lived)
            const refreshToken = jwt.sign(
                { username: user.username, email: req.body.email, userType: user.role },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" } // Expires in 7 days
            );

            // Store Refresh Token in HttpOnly cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 12 * 60 * 60 * 1000, // 7 days
                sameSite: "strict",
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 2 * 60 * 60 * 1000, // 7 days
                sameSite: "strict",
            });
            // Send Access Token to client
            res.status(200).json({
                message: "Student Login successful",
                success: true,
                accessTokenExpiresIn: 12 * 60 * 60,
                user:{
                    username:user.username,
                    email:user.email,
                    role:user.role
                }
            });
        } catch (error) {
            res.status(500).send({ message: `Error in login: ${error}` });
        }
    },
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // Check if user already exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) return res.status(400).json({ error: 'Username already taken' });

            // Hash the password
            const hashedPassword = await hashPassword(password);

            // Save user to DB
            await UserModel.createUser(username, email, hashedPassword,'User');

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }
    },
    getCookieDetail:async(req,res)=>{
        try {
            const token = req.cookies.accessToken; 
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({
                user: {
                    username: decoded.username,
                    email: decoded.email,
                    role: decoded.userType //decoded.userType, // Assuming role is stored as userType
                },
            });
        } catch (error) {
            
        }

    }
};
module.exports = AuthController;