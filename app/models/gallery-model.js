const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  libelle: {
    type: String
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
}, {
  timestamps: true
});
GallerySchema.method("toJSON", function () {
  const {
    __v,
    _id,
    ...object
  } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Gallery", GallerySchema);