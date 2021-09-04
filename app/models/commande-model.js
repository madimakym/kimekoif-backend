const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  libelle: {
    type: String,
  },
  price: {
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
CommandeSchema.method("toJSON", function () {
  const {
    __v,
    _id,
    ...object
  } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Disponibilite", CommandeSchema);