const express = require('express');
const app = express();
const dbConnect = require('./db/dbConnect.js');
const cors = require('cors')
const authRouter = require('./routes/authRoutes.js');
const otpRouter = require('./routes/otpRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const doctorRouter = require('./routes/doctorRoutes.js')
const bodyParser = require('body-parser');
const { configDotenv } = require('dotenv');

configDotenv();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dbConnect();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOptions));


//routes 
app.use('/auth', authRouter);
app.use('/otp', otpRouter);
app.use('/user',userRouter)
app.use('/doctor',doctorRouter)


app.listen(3000, () => {
    console.log("App is running at 3000")
})