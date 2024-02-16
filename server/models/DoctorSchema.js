const mongoose = require('mongoose');


const DoctorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'doctor'
    },
    //After registration should fill these details
    phone: {
        type: String
    },
    photo: { 
        data: Buffer,
        contentType: String,
    },
    tokenPrice: {
        type: Number
    },
    specialization: {
        type: String
    },
    qualification: {
        type: String,
    },
    bio: {
        type: String,
        maxLength: 50
    },
    timeSlots: { type: Array },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
      },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
})


DoctorSchema.virtual('avgRating').get(function(){
    let length = this.reviews.length;
    if(length == 0) return 0;
    let Rating = 0;
    for(let i=0;i<length;i++){
        Rating = Rating + this.reviews[i];
    }
    return Rating/length;
})


const DoctorModel = mongoose.model("DoctorModel",DoctorSchema);

module.exports = DoctorModel