module.exports = (app) => {

  const adresse = require("../controllers/adresseController");
  const album = require("../controllers/albumController");
  const auth = require("../controllers/authController");
  const commande = require("../controllers/commande-controller");
  const checkout = require("../controllers/checkoutController");
  const disponibilite = require("../controllers/disponibiliteController");
  const facture = require("../controllers/factureController");
  const product = require("../controllers/product-controller");
  const rdv = require("../controllers/rdvController");
  const service = require("../controllers/serviceController");
  const user = require("../controllers/userController");
  const upload = require("../controllers/uploadfileController");

  var router = require("express").Router();


  router.get("/adresse/:id", adresse.findOne);
  router.post("/adresse/delete/", adresse.delete);
  router.post("/adresse/create/", adresse.create);
  router.post("/user/adresse/", adresse.findByUser);

  router.post("/album", album.create);
  router.put("/album/:id", album.update);
  router.get("/album/:id", album.findOne);
  router.delete("/album/:id", album.delete);
  router.post("/user/album/", album.findByUser);

  router.post("/auth/login", auth.login);
  router.post("/auth/register", auth.register);

  router.post("/commande", commande.create);
  router.get("/commande/:id", commande.findOne);
  router.delete("/commande/:id", commande.delete);
  router.post("/user/commande/", commande.findByUser);

  router.post("/disponibilite", disponibilite.create);
  router.get("/disponibilite/:id", disponibilite.findOne);
  router.delete("/disponibilite/:id", disponibilite.delete);
  router.post("/user/disponibilite/", disponibilite.findByUser);

  router.post("/facture", facture.create);
  router.post("/pro/facture/", facture.findByUser);
  router.post("/customer/facture/", facture.findByCustomer);

  router.post("/product", product.create);
  router.get("/product", product.findAll);
  router.put("/product/:id", product.update);
  router.get("/product/:id", product.findOne);
  router.delete("/product/:id", product.delete);

  router.post("/rdv", rdv.create);
  router.post("/pro/rdv/", rdv.findByUser);
  router.post("/customer/rdv/", rdv.findByCustomer);

  router.post("/service", service.create);
  router.get("/service/:id", service.findOne);
  router.delete("/service/:id", service.delete);
  router.post("/service/search", service.search);
  router.post("/user/service/", service.findByUser);

  router.post("/stripe/charge/", checkout.payment);

  router.get("/user", user.findAll);
  router.get("/user/:id", user.findOne);
  router.put("/user/:id", user.update);

  router.post("/upload", upload.upload);
  app.use("/api/", router);
};