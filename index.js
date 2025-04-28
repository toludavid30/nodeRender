const express = require('express')
const app = express();
const connectMongoDB = require('./config/connectDB.js')
connectMongoDB()
const cors = require('cors')

app.use(express.json());
app.use(cors())

const PORT = 5005;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "welcome to reactRender"
    })
})