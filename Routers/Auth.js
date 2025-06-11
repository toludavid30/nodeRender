const express = require('express')
const { signUp, signIn, verifyEmail, getAllUsers } = require('../Controllers/Auth')
const userRouter = express.Router()

userRouter.route('/signup').post(signUp)
userRouter.route('/signin').post(signIn)
userRouter.route('/verify').post(verifyEmail)
userRouter.route('/getUsers').get(getAllUsers)

module.exports = userRouter