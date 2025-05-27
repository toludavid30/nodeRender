const express = require('express')
const { signUp, signIn, verifyEmail } = require('../Controllers/Auth')
const userRouter = express.Router()

userRouter.route('/signup').post(signUp)
userRouter.route('/signin').post(signIn)
userRouter.route('/verify').post(verifyEmail)

module.exports = userRouter