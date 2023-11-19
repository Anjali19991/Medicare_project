import { config } from "dotenv";
config();
import connectDB from "./db/connectDB.js"
import app from "./app.js"
import cors from "cors"
import bodyParser from "body-parser"


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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