const Doctor = require('../models/DoctorSchema')


exports.getDoctorDetails = async(req,res)=>{
    const {id} = req.params;
    try {
        const doctor = await Doctor.findById({_id:id}).select("-password")
        if(!doctor){
            return res.status(400).json({success:false,message:"Doctor not found"})
        }
        return res.status(200).json({doctor});
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.updateDoctor = async(req,res)=>{
    const {id} = req.params;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"Updated Successfully",data:updatedDoctor});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Failed to Update"});
    }
}