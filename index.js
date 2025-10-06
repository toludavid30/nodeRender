const express = require('express')
const app = express();
const connectMongoDB = require('./config/connectDB.js')
connectMongoDB()
const cors = require('cors');
const userRouter = require('./Routers/Auth.js');
const transporter = require('./services/nodemailer/transporter.js');
const productRouter = require('./Routers/Products.js');
const errorHandler = require('./middlewares/errorHandler.js');



app.use(cors({
    origin: ['https://dolu-s-brand.vercel.app', 'http://localhost:5173', 'http://localhost:5175', 'https://creator-flow-iota.vercel.app/'],
    credentials: true
}));

app.use(express.json());


const PORT = 5005;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

app.use("/auth", userRouter)
app.use("/product", productRouter)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is alive" });
})
// app.use(*, (req,res) => {

// })
app.all("*", (req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})

app.use("*", errorHandler)
