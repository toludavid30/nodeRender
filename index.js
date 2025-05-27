const express = require('express')
const app = express();
const connectMongoDB = require('./config/connectDB.js')
connectMongoDB()
const cors = require('cors');
const userRouter = require('./Routers/Auth.js');
const transporter = require('./services/nodemailer/transporter.js')

app.use(express.json());
app.use(cors())

const PORT = 5005;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

app.use("/auth", userRouter)

// app.use(*, (req,res) => {

// })
app.all("*", (req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})
