const Doctor = require('../models/DoctorSchema');
const User = require('../models/UserSchema')


exports.getUserDetails = async(req,res)=>{
    console.log(req.user)
    const {id} = req.user;
    try {
        const user = await User.findById({_id:id}).select("-password")
        console.log(user)
        if(user){
            return res.status(200).json({user});
        }
        const doctor = await Doctor.findById({_id:id}).select("-password")
        console.log(doctor);
        if(doctor){
            return res.status(200).json({doctor});
        }
        if(!user && !doctor){
            return res.status(400).json({success:false,message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.updateUser = async(req,res)=>{
    const {id} = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"Updated Successfully",data:updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Failed to Update"});
    }
}