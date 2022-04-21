import mongoose from "mongoose"
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const catalogSchema = new Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    user: {
        type: ObjectId,
        ref: "Users"
    },
    image: {
        data: Buffer,
        contentType: String
    },
    status: {
        type: Boolean
    }
},
    { timestamps: true }
);

export default mongoose.model('Catalog', catalogSchema);