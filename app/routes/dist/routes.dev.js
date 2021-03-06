"use strict";

module.exports = function (app) {
  var adresse = require("../controllers/adresseController");

  var album = require("../controllers/albumController");

  var auth = require("../controllers/authController");

  var commande = require("../controllers/commande-controller");

  var commentaire = require("../controllers/commentaire-controller");

  var checkout = require("../controllers/checkoutController");

  var disponibilite = require("../controllers/disponibiliteController");

  var facture = require("../controllers/factureController");

  var product = require("../controllers/product-controller");

  var rdv = require("../controllers/rdvController");

  var service = require("../controllers/serviceController");

  var user = require("../controllers/userController");

  var upload = require("../controllers/uploadfileController");

  var wish = require("../controllers/wish-controller");

  var stripe = require("../controllers/stripe-controller");

  var router = require("express").Router();

  router.post("/adresse/", adresse.create);
  router.get("/adresse/:id", adresse.find);
  router.post("/adresse/delete/", adresse["delete"]);
  router.post("/album", album.create);
  router.put("/album/:id", album.update);
  router.get("/album/:id", album.findOne);
  router.post("/album/delete/", album["delete"]);
  router.post("/user/album/", album.findByUser);
  router.post("/auth/login", auth.login);
  router.post("/auth/register", auth.register);
  router.post("/commande", commande.create);
  router.get("/commandes", commande.findAll);
  router.get("/commande/:id", commande.findOne);
  router["delete"]("/commande/:id", commande["delete"]);
  router.post("/user/commande/", commande.findByUser);
  router.put("/commande/:id", commande.update);
  router.post("/disponibilite", disponibilite.create);
  router.get("/disponibilite/:id", disponibilite.findOne);
  router.post("/disponibilite/delete/", disponibilite["delete"]);
  router.post("/user/disponibilite/", disponibilite.findByUser);
  router.post("/facture", facture.create);
  router.post("/pro/facture/", facture.findByUser);
  router.post("/customer/facture/", facture.findByCustomer);
  router.post("/commentaire", commentaire.create);
  router.post("/commentaires", commentaire.findAll);
  router["delete"]("/commentaire/:id", commentaire["delete"]);
  router.post("/product", product.create);
  router.get("/product", product.findAll);
  router.put("/product/:id", product.update);
  router.get("/product/:id", product.findOne);
  router["delete"]("/product/:id", product["delete"]);
  router.post("/rdv", rdv.create);
  router.post("/pro/rdv/", rdv.findByUser);
  router.post("/customer/rdv/", rdv.findByCustomer);
  router.post("/service", service.create);
  router.get("/service/:id", service.findOne);
  router.post("/service/delete/", service["delete"]);
  router.post("/service/search", service.search);
  router.post("/user/service/", service.findByUser);
  router.post("/stripe/charge/", checkout.payment);
  router.get("/user", user.findAll);
  router.post("/user", user.findbyProfil);
  router.post("/user/search", user.search);
  router.get("/user/:id", user.findOne);
  router.put("/user/:id", user.update);
  router.post("/upload", upload.upload);
  router.post("/wish", wish.create);
  router.get("/wish/:id", wish.find);
  router.post("/wish/delete/", wish["delete"]); // STRIPE

  router.get("/stripe/payment", stripe.paymentintent); // router.get("/stripe/authorize", stripe.authorizeAccount);

  router.post("/stripe/onboard-user", stripe.onboardUser);
  router.post("/stripe/get-account-status", stripe.getAccountStatus);
  router.post("/stripe/get-account-balance", stripe.getAccountBalance);
  router.post("/stripe/payout-setting", stripe.payoutSetting);
  router.post("/stripe/session-id", stripe.sessionId); // router.post("/stripe/onboard-user/refresh", stripe.onboardUserRefresh);

  app.use("/api/", router);
};