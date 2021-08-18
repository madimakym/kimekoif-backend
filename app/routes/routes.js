module.exports = (app) => {
  const auth = require("../controllers/authController");
  const user = require("../controllers/userController");
  const upload = require("../controllers/uploadfileController");
  const album = require("../controllers/albumController");
  const service = require("../controllers/serviceController");
  const disponibilite = require("../controllers/disponibiliteController");
  const checkout = require("../controllers/checkoutController");
  const rdv = require("../controllers/rdvController");
  const facture = require("../controllers/factureController");
  const adresse = require("../controllers/adresseController");
  const product = require("../controllers/product-controller");
  var router = require("express").Router();

  // router.post("/auth/resetpassword", auth.resetPassword);
  router.post("/auth/login", auth.login);
  router.post("/auth/register", auth.register);
  router.post("/auth/changepassword", auth.changePassword);
  // router.post("/auth/forgetpassword", auth.forgetPassword);
  // router.get("/auth/registerconfirm", auth.registerConfirm);

  router.get("/user", user.findAll);
  router.get("/user/:id", user.findOne);
  router.put("/user/:id", user.update);

  router.post("/service", service.create);
  router.post("/user/service/", service.findByUser);
  router.get("/service/:id", service.findOne);
  router.delete("/service/:id", service.delete);
  router.post("/service/search", service.search);


  router.post("/disponibilite", disponibilite.create);
  router.post("/user/disponibilite/", disponibilite.findByUser);
  router.get("/disponibilite/:id", disponibilite.findOne);
  router.delete("/disponibilite/:id", disponibilite.delete);

  router.post("/album", album.create);
  router.post("/user/album/", album.findByUser);
  router.get("/album/:id", album.findOne);
  router.put("/album/:id", album.update);
  router.delete("/album/:id", album.delete);

  router.post("/rdv", rdv.create);
  router.post("/pro/rdv/", rdv.findByUser);
  router.post("/customer/rdv/", rdv.findByCustomer);

  router.post("/facture", facture.create);
  router.post("/pro/facture/", facture.findByUser);
  router.post("/customer/facture/", facture.findByCustomer);

  router.post("/adresse/create/", adresse.create);
  router.post("/user/adresse/", adresse.findByUser);
  router.get("/adresse/:id", adresse.findOne);
  router.post("/adresse/delete/", adresse.delete);

  router.post("/product", product.create);
  router.get("/product", product.findAll);
  router.get("/product/:id", product.findOne);
  router.put("/product/:id", product.update);
  router.delete("/product/:id", product.delete);

  router.post("/stripe/charge/", checkout.payment);

  router.post("/upload", upload.upload);
  app.use("/api/", router);
};