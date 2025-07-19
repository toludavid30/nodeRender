const UserModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const _jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const sendVerificationEmail = require('../services/nodemailer/sendVerificationEmail')
const generateRandomString = require('../utilities/RandomNumberGeneration')
const sendUserMessage = require('../services/nodemailer/senUserMessage')

const signUp = async (req, res) => {
    const 
    verificationToken = generateRandomString(32)
    verificationExp = Date.now() + 3 * 24 * 60 * 60 * 1000
    try {
     const {Password} = req.body
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(Password, salt)
        const user = await UserModel.create({
            ...req.body,
            Password: hashedPassword,
            verificationToken,
            verificationExp
        })
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not created"
            })
        }
        else{
            const token = _jwt.sign({
                id: user._id
            }, process.env.secret_key, {
                expiresIn: process.env.key_expires_in
            })
            sendVerificationEmail(user.Email, verificationToken, user.name);

            const userObject = user.toObject();

            return res.status(200).json({
                status: 200,
                message: "User created",
                user: userObject
        })
        }
        
    } catch (error) {
       console.log(error);
    }
}

const signIn = async (req, res) => {
    const {Email, Password} = req.body
    try {
        const user = await UserModel.findOne({Email: Email})
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found"
            })
        }
        else{
            const comparePassword = await bcrypt.compare(Password, user.Password)
            if(!comparePassword){
                return res.status(400).json({
                    status: 400,
                    message: "Invalid password"
                })
            }
            else{
                const token = _jwt.sign({
                    id: user._id,
                    isVerified: user.isVerified
                }, process.env.secret_key, {
                    expiresIn: process.env.key_expires_in
                }) 
                res.status(200).json({
                    status: 200,
                    message: 'user logged in successfully', 
                    user,
                    token
                })
            }
        }

    }
    catch(error){
        console.log(error);   
    }
}

const getAllUsers = async(req, res) =>{
    try{
        let users = await UserModel.find()
        if(!users){
            res.status(400).json({
                status: 'error',
                message: 'users not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'users found',
            users
        })
    }
    catch(error){
        console.log(error);
    }
}

const getSingleUser = async(req, res) =>{
    try{
        const {userId} = req.params
        let users = await userModel.findById(userId)
        if(!users){
            res.status(400).json({
                status: 'error',
                message: 'users not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'users found',
            users
        })
    }
    catch(error){
        console.log(error);
        
    }
}

const verifyEmail = async (req, res) => {
    const {token} = req.body
    try {
        const user = await UserModel.findOne({verificationToken: token})
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid token"
            })
        }
        else{
            if (user.isVerified === true) {
                return res.status(400).json({
                    status: 400,
                    message: "Email already verified"
                })
            }
            else{
                if (Date.now() > user.verificationExp) {
                    return res.status(400).json({
                        status: 400,
                        message: "Token expired"
                    })
                }
                else{
                    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
                            isVerified: true,
                            verificationToken: "",
                            verificationExp: ""
                        })
                    return res.status(200).json({
                        status: 200,
                        message: "User verified successfully"
                    })
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

const deleteSingleUser = async(req, res) =>{
    try{
        const {userId} = req.params
        let users = await userModel.findByIdAndDelete(userId)
        if(!users){
            res.status(400).json({
                status: 'error',
                message: 'users not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'users found',
            users
        })
    }
    catch(error){
        console.log(error);
    }
}

const sendMessage = async(req,res) =>{
    try {
        const{name, phone, email, message} = req.body
        sendUserMessage(name, phone, email, message)
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    signUp,
    signIn,
    verifyEmail,
    getAllUsers, 
    getSingleUser,
    deleteSingleUser,
    sendMessage
}