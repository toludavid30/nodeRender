const UserModel = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const _jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const sendVerificationEmail = require('../services/nodemailer/sendVerificationEmail')
const generateRandomString = require('../utilities/RandomNumberGeneration')

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
                id: user._id,
                isVerified: user.isVerified
            }, process.env.secret_key, {
                expiresIn: process.env.key_expires_in
            })
            sendVerificationEmail(user.Email, verificationToken, user.Name)

            return res.status(200).json({
                status: 200,
                message: "User created",
                user
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
                    token
                })
            }
        }

    }
    catch(error){
        console.log(error);   
    }
}

const verifyEmail = async (req, res) => {
    const {token} = req.params
    try {
        const user = await UserModel.findOne({verificationToken: token})
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid token"
            })
        }
        else{
            if (user.isVerified) {
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
                    const updateUser = await UserModel.findOneAndUpdate(
                        {Email: user.Email},
                        {
                            isVerified: true,
                            verificationToken: null,
                            verificationExp: null
                        },

                    )
                    // user.isVerified = true
                    // user.verificationToken = null
                    // user.verificationExp = null
                    // await user.save()
                    return res.status(200).json({
                        status: 200,
                        message: "Email verified successfully"
                    })
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports = {
    signUp,
    signIn,
    verifyEmail
}