const transporter = require("./transporter")
const env = require("dotenv")

const sendSubscribtion = async (name, email)=>{
    const mailOptions = {
        from: process.env.App_Email,
        to: email,
        subject: "Activation of Subscribtion",
        html: `
        <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="color: #333333;">User Subscription</h1>
        </div>
        <div style="margin: 20px 0; line-height: 1.6;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for subscribing to our community for tips, resources, and updates sent straight to your inbox!</p>
            <p>If you did not subscribe for this account, kindly send us a mail for subcribtion cancellation.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888888;">
            <p>&copy; 2025 Creators Flow. All rights reserved.</p>
        </div>
    </div> 
        `
    }
    await transporter.sendMail(mailOptions)
 }
module.exports = sendSubscribtion