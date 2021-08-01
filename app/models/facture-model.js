const mongoose = require("mongoose");

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

  service: {
    type: String,
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
FactureSchema.method("toJSON", function () {
  const {
    __v,
    _id,
    ...object
  } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Facture", FactureSchema);