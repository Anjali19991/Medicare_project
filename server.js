import { config } from "dotenv";
config();
import express from "express";
import connectDB from "./db/connectDB.js"
const app = express();

const port = process.env.port || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();