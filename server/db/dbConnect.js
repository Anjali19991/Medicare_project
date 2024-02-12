const mongoose = require('mongoose');


const dbConnect = async()=>{
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Medicare');
    console.log("Connected to database");     
    } catch (error) {
        console.log(error);   
    }
}


module.exports = dbConnect;