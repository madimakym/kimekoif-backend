const mongoose = require("mongoose");

const AdresseSchema = new mongoose.Schema({
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "Users"
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    ville: {
        type: String,
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