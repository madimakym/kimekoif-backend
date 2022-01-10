const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  hairdresser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  payment_id: {
    type: String,
  },
  payment_status: {
    type: String,
  },
  status: {
    type: Boolean,
  }
}, {
  timestamps: true
});
OrderSchema.plugin(AutoIncrement, {
  inc_field: 'orderId'
});
module.exports = mongoose.model("Order", OrderSchema);