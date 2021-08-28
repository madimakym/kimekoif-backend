const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
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
  description: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  disponibilites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disponibilite'
  }],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  albums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }],
  rdv: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rdv'
  }],
  facture: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facture'
  }],
  adresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adresse'
  }],
}, {
  timestamps: true,
});
UserSchema.method("toJSON", function () {
  const {
    __v,
    _id,
    ...object
  } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Users", UserSchema);