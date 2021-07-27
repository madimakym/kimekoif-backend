const mongoose = require("mongoose");

const RdvSchema = new mongoose.Schema({
    libelle: {
        type: String,
    },

    customerName: {
        type: String,
    },

    customerId: {
        type: String,
    },

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
}, {
    timestamps: true,
});
RdvSchema.method("toJSON", function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Rdv", RdvSchema);