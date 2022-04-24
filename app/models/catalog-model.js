import mongoose from "mongoose"
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const catalogSchema = new Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean
    }
},
    { timestamps: true }
);

export default mongoose.model('Catalog', catalogSchema);