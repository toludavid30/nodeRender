const transporter = require("./transporter")
const env = require("dotenv")

const sendUserMessage = async(name, phone, email, message) =>{
    const mailOptions = {
        from: process.env.App_Email,
        to: process.env.App_Email,
        subject: "User Message",
        html: `
        <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="color: #333333;">User Message</h1>
        </div>
        <div style="margin: 20px 0; line-height: 1.6;">
            <p><strong>${name}</strong>,</p>
            <p><strong>${phone}</strong>,</p>
            <p><strong>${email}</strong>.</p>
            <p><strong>${message}</strong>.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888888;">
            <p>&copy; 2025 Dolu. All rights reserved.</p>
        </div>
    </div> 
        `
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendUserMessage