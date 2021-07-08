module.exports = (app) => {
  const auth = require("../controllers/authController");
  const upload = require("../controllers/uploadfileController");
  var router = require("express").Router();

  // router.post("/auth/resetpassword", auth.resetPassword);
  router.post("/auth/login", auth.login);
  router.post("/auth/register", auth.register);
  // router.post("/auth/forgetpassword", auth.forgetPassword);
  // router.get("/auth/registerconfirm", auth.registerConfirm);

  router.post("/upload", upload.upload);
  app.use("/api/", router);
};
