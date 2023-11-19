import express from "express"
const app = express();
import Hospital from "./models/Hospital.js";
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle hospital registration form submission
app.post("/hospital-registration", async function (req, res) {
    const hospital = new Hospital({
        hospitalName: req.body.hospitalName,
        location: req.body.location,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        noOfDoctors: req.body.numDoctors,
    });

    try {
        await hospital.save();
        console.log("Successssss")
    } catch (error) {
        console.log(error);
    }
});

export default app;

