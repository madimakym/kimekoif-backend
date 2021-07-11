module.exports = (app) => {
  const auth = require("../controllers/authController");
  const user = require("../controllers/userController");
  const upload = require("../controllers/uploadfileController");
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

  router.post("/upload", upload.upload);
  app.use("/api/", router);
};
