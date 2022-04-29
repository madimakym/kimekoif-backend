import mongoose from "mongoose"
const { Schema } = mongoose

const appointmentSchema = new Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    date: {
        type: String,
    },
    status: {
        type: Boolean
    }
},
    { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);