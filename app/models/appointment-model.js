import mongoose from "mongoose"
const { Schema } = mongoose

const AppointmentSchema = new Schema({
    libelle: {
        type: String,
    },
    price: {
        type: String,
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: String,
    },
    status: {
        type: String
    }
},
    { timestamps: true }
);
AppointmentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
export default mongoose.model('Appointment', AppointmentSchema);