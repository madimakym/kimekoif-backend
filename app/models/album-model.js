const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    libelle: {
      type: String,
    },
    visual: {
      type: String,
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    services: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    status: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);
AlbumSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Album", AlbumSchema);
