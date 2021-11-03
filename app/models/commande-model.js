const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommandeSchema = new mongoose.Schema({
  price: {
    type: String,
  },
  products: {
    type: String
  },
  paiement_method: {
    type: String
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  hairdresser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  payment_status: {
    type: String,
  },
  status: {
    type: String,
  },

}, {
  timestamps: true,
});
CommandeSchema.plugin(AutoIncrement, {
  inc_field: 'commandeId'
});
module.exports = mongoose.model("Commande", CommandeSchema);