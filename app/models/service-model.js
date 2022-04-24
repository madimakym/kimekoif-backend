const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    libelle: {
      type: String,
    },
    price: {
      type: String,
    },
    user: {
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
ServiceSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Service", ServiceSchema);
