const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommandeSchema = new mongoose.Schema({
  price: {
    type: String,
  },
  products: {
    type: String
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  status: {
    type: Boolean,
  }
}, {
  timestamps: true,
});
CommandeSchema.plugin(AutoIncrement, { inc_field: 'libelle' });
module.exports = mongoose.model("Commande", CommandeSchema);