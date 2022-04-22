import formidable from "express-formidable";
import { requireSignin } from "../middlewares";

module.exports = (app) => {
  const adresse = require("../controllers/adresseController");
  const album = require("../controllers/albumController");
  const auth = require("../controllers/auth-controller");
  const commande = require("../controllers/commande-controller");
  const catalog = require("../controllers/catalog-controller");
  const commentaire = require("../controllers/commentaire-controller");
  const checkout = require("../controllers/checkoutController");
  const disponibilite = require("../controllers/disponibilite-controller");
  const facture = require("../controllers/factureController");
  const product = require("../controllers/product-controller");
  const rdv = require("../controllers/rdvController");
  const service = require("../controllers/service-controller");
  const user = require("../controllers/user-controller");
  const upload = require("../controllers/uploadfileController");
  const wish = require("../controllers/wish-controller");
  const stripe = require("../controllers/stripe-controller");
  const mailchimp = require("../controllers/mailchimp-controller");
  const order = require("../controllers/order-controller");
  const mail = require("../controllers/send-mail-controller");

  var router = require("express").Router();


  router.post("/adresse/", adresse.create);
  router.get("/adresse/:id", adresse.find);
  router.post("/adresse/delete/", adresse.delete);

  router.post("/album", album.create);
  router.put("/album/:id", album.update);
  router.get("/album/:id", album.findOne);
  router.post("/album/delete/", album.delete);
  router.post("/user/album/", album.findByUser);

  router.post("/auth/login", auth.login);
  router.post("/auth/register", auth.register);
  router.post("/auth/forget-password", auth.forgetPassword);
  router.post("/auth/reset-password", auth.resetPassword);

  router.post("/commande", commande.create);
  router.get("/commandes", commande.findAll);
  router.get("/commande/:id", commande.findOne);
  router.delete("/commande/:id", commande.delete);
  router.post("/user/commande/", commande.findByUser);
  router.put("/commande/:id", commande.update);

  router.get("/orders", order.findAll);
  router.get("/order/:id", order.findOne);
  router.delete("/order/:id", order.delete);
  router.post("/user/order/", order.findByUser);
  router.put("/order/:id", order.update);

  router.post("/disponibilite/create/", requireSignin, disponibilite.create);
  router.post("/disponibilite/delete/", requireSignin, disponibilite.remove);
  router.post("/user/disponibilite/", requireSignin, disponibilite.findByUser);

  router.post("/facture", facture.create);
  router.post("/pro/facture/", facture.findByUser);
  router.post("/customer/facture/", facture.findByCustomer);

  router.post("/commentaire", commentaire.create);
  router.post("/commentaires", commentaire.findAll);
  router.delete("/commentaire/:id", commentaire.delete);


  router.post("/product", product.create);
  router.get("/product", product.findAll);
  router.put("/product/:id", product.update);
  router.get("/product/:id", product.findOne);
  router.delete("/product/:id", product.delete);

  router.post("/rdv", rdv.create);
  router.post("/pro/rdv/", rdv.findByUser);
  router.post("/customer/rdv/", rdv.findByCustomer);

  router.post("/service/create", requireSignin, service.create);
  router.post("/service/delete", requireSignin, service.remove);
  router.post("/user/service", requireSignin, service.findByUser);

  router.post("/catalog/create", requireSignin, formidable(), catalog.create);
  router.post("/catalog/delete", requireSignin, catalog.remove);
  router.post("/user/catalog", requireSignin, catalog.findByUser);
  router.get("/catalog/image/:catalogId", catalog.image);

  router.get("/user/:id", requireSignin, user.findOne);
  router.put("/user/:id", requireSignin, user.update);

  // router.post("/user", user.findbyProfil);
  // router.post("/user/search", user.search);
  // router.post("/user/uid", user.searchByUid);
  // router.get("/user/:id", user.findOne);


  router.post("/upload", upload.upload);

  router.post("/wish", wish.create);
  router.get("/wish/:id", wish.find);
  router.post("/wish/delete/", wish.delete);

  // STRIPE
  router.get("/stripe/payment", stripe.paymentintent);
  // router.get("/stripe/authorize", stripe.authorizeAccount);
  router.post("/stripe/onboard-user", stripe.onboardUser);
  router.post("/stripe/get-account-status", stripe.getAccountStatus);
  router.post("/stripe/get-account-balance", stripe.getAccountBalance);
  router.post("/stripe/payout-setting", stripe.payoutSetting);
  router.post("/stripe/session-id", stripe.sessionId);
  router.get("/stripe/order/success/:session_id", stripe.orderSuccess);
  router.post("/stripe/refund", stripe.stripeRefund);


  // Order
  router.post("/stripe/stripe-request-success", stripe.stripeRequestSuccess);

  // router.post("/stripe/payout-list", stripe.payoutList);
  // router.post("/stripe/onboard-user/refresh", stripe.onboardUserRefresh);

  // Order
  // router.post("/stripe/stripe-success-request", stripe.sessionId);



  // MAILCHIMP
  router.post("/mailchimp/check", mailchimp.check);
  router.post("/mailchimp/subscribe-contact", mailchimp.subscribeContact);
  router.post("/mailchimp/unsubscribe-contact", mailchimp.check);
  router.post("/mailchimp/check-contact", mailchimp.check);


  // SEND MAIL
  router.post("/mail/send", mail.sendEmail);



  app.use("/api/", router);
};