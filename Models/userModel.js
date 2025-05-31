const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Name is required"],
    },
    Email:{
        type: String,
        required : [true, "Email is required"],
        unique : true
    },
    Password:{
        type: String,
        required : [true, "Password is required"],
    },
    ProfilePicture :{
        type: String  
    },
    cartItems:{
        type: Array,
        default : []
    },
    isVerified : {
        type: Boolean,
        default : false
    },
    verificationToken :{
        type: String
    },
    verificationExp : {
        type: String
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel