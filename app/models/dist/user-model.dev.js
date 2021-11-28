"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  ville: {
    type: String
  },
  departement: {
    type: String
  },
  adresse: {
    type: String
  },
  siret: {
    type: String
  },
  mobilite: {
    type: String
  },
  profil: {
    type: String
  },
  avatar: {
    type: String
  },
  rand: {
    type: String
  },
  description: {
    type: String
  },
  stripe_account_id: {
    type: String
  },
  stripe_seller: {},
  stripe_session: {},
  status: {
    type: Boolean
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
    ref: 'Users'
  }],
  commandes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande'
  }],
  wishs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  commentaires: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commentaire'
  }]
}, {
  timestamps: true
});
UserSchema.method("toJSON", function () {
  var _this$toObject = this.toObject(),
      __v = _this$toObject.__v,
      _id = _this$toObject._id,
      object = _objectWithoutProperties(_this$toObject, ["__v", "_id"]);

  object.id = _id;
  return object;
});
module.exports = mongoose.model("Users", UserSchema);