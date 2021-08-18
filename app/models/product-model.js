const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        libelle: {
            type: String,
        },
        description: {
            type: String
        },
        price: {
            type: String,
        },
        visual: {
            type: String,
        },
        status: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);
ProductSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Product", ProductSchema);
