const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const CommentaireSchema = new mongoose.Schema({
  message: {
    type: String,
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },

  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
}, {
  timestamps: true,
});
CommentaireSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model("Commentaire", CommentaireSchema);