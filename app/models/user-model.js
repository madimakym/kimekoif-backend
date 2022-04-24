import mongoose from "mongoose"
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  ville: {
    type: String,
  },
  departement: {
    type: String,
  },
  adresse: {
    type: String,
  },
  quartier: {
    type: String,
  },
  siret: {
    type: String,
  },
  mobilite: {
    type: String,
  },
  profile: {
    type: String,
  },
  avatar: {
    type: String,
  },
  rand: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  service: [{
    type: ObjectId,
    ref: 'Service'
  }]
}, {
  timestamps: true
});
export default mongoose.model('User', userSchema);