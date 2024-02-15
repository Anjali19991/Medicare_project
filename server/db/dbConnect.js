const mongoose = require('mongoose');

const dbConnect = (url) => {
    console.log("Connecting to MongoDB:", url); 
    return mongoose.connect(url)
}

module.exports = dbConnect;
