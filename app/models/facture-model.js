import mongoose from "mongoose"
const { Schema } = mongoose

const FactureSchema = new Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
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
        type: Boolean
    }
},
    { timestamps: true }
);
FactureSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
export default mongoose.model('Facture', FactureSchema);