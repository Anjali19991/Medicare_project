const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    isPaid: {
        type: Boolean,
        default: true,
      },
    },
    {timestamps: true },
)

const AppointmentModel = mongoose.Model('AppointmentModel',AppointmentSchema)