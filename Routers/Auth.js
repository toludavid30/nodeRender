const express = require('express')
const { signUp, signIn, verifyEmail, getAllUsers, sendMessage, getSingleUser, updateSingleUser, sendFlowSubMail } = require('../Controllers/Auth')
const userRouter = express.Router()

userRouter.route('/signup').post(signUp)
userRouter.route('/signin').post(signIn)
userRouter.route('/verify').post(verifyEmail)
userRouter.route('/getUsers').get(getAllUsers)
userRouter.route('/singleUser').post(getSingleUser)
userRouter.route('/updateCart').post(updateSingleUser)
userRouter.route('/sendMessage').post(sendMessage)
userRouter.route('/sendFlowSub').post(sendFlowSubMail)

module.exports = userRouter