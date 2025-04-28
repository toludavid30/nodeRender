const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const mongodbUri = process.env.mongodb_uri

const connectMongoDB = async() => {
    console.log('connecting to db')
    try {
        const connected = await mongoose.connect(mongodbUri)
        if (connected){
            console.log('Mongodb connected');   
        }
    } catch (error) {
        console.log(error)
    }
} 

module.exports = connectMongoDB