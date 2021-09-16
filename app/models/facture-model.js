const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const FactureSchema = new mongoose.Schema({
  libelle: {
    type: String,
  },

  date: {
    type: String,
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },

  total: {
    type: String,
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
FactureSchema.plugin(AutoIncrement, { inc_field: 'factureNum' });
module.exports = mongoose.model("Facture", FactureSchema);