const mongoose = require("mongoose");

const AdresseSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true
});
AdresseSchema.method("toJSON", function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Adresse", AdresseSchema);