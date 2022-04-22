import mongoose from "mongoose"
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const disponibiliteSchema = new Schema({
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: "Users"
  },
  status: {
    type: Boolean
  }
},
  { timestamps: true }
);

export default mongoose.model('Disponibilite', disponibiliteSchema);