const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    ville: {
      type: String,
    },
    departement: {
      type: String,
    },
    adresse: {
      type: String,
    },
    siret: {
      type: String,
    },
    mobilite: {
      type: String,
    },
    profil: {
      type: String,
    },
    avatar: {
      type: String,
    },
    rand: {
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
UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Users", UserSchema);
