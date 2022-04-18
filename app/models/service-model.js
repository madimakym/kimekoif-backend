const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
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
    catalog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
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
