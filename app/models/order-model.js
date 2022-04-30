import mongoose from "mongoose"
const { Schema } = mongoose

const OrderSchema = new Schema({
  orderNumber: {
    type: String,
  },
  libelle: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
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
OrderSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
export default mongoose.model('Order', OrderSchema);