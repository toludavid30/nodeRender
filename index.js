const express = require('express')
const app = express();
const connectMongoDB = require('./config/connectDB.js')
connectMongoDB()
const cors = require('cors');
const userRouter = require('./Routers/Auth.js');
const transporter = require('./services/nodemailer/transporter.js')

app.use(express.json());

const allowedOrigins = ['https://dolu-s-brand.vercel.app'];
app.use(cors(
    {
    origin: function(origin, callback){
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
))

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
