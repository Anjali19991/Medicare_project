const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect.js");
const cors = require("cors");
const hospitalRouter = require("./routes/hospitalRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const otpRouter = require("./routes/otpRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const doctorRouter = require("./routes/doctorRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const bodyParser = require("body-parser");
require("dotenv").config();
const morgan = require('morgan');

app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//routes
app.use("/auth", authRouter);
app.use("/otp", otpRouter);
app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);
app.use("/hospital", hospitalRouter);

const start = async () => {
  try {
    await dbConnect(process.env.MONGODB_URI);
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
