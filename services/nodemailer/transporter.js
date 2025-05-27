const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

const transporter = nodemailer.createTransport({
    host: process.env.Email_Host,
    service: process.env.Email_Service,
    port: process.env.Email_Port,
    secure: process.env.Email_Secure,
    auth:{
        user: process.env.App_Email,
        pass:process.env.App_Password
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to send emails ...");
    }
})

module.exports = transporter