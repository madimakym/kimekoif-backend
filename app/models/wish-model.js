const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema({
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
    avatar: {
        type: String,
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true
});
WishSchema.method("toJSON", function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Adresse", WishSchema);