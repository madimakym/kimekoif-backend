import mongoose from "mongoose"
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const catalogSchema = new Schema({
    libelle: {
        type: String,
        required: "Libelle is required"
    },
    content: {
        type: String,
        required: "Content is required",
        maxlength: 10000,
    },
    postedBy: {
        type: ObjectId,
        ref: "Users"
    },
    image: {
        data: Buffer,
        contentType: String
    }
},
    { timestamps: true }
);

export default mongoose.model('Catalog', catalogSchema);