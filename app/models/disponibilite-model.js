const mongoose = require("mongoose");

const DisponibiliteSchema = new mongoose.Schema(
  {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    status: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);
DisponibiliteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Disponibilite", DisponibiliteSchema);
