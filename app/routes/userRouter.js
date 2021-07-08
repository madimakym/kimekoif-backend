const router = require("express").Router();
const userCtrl = require("../controllers/userController");
// const auth = require("../middleware/auth");

// Register User
router.get("/validate", userCtrl.validateEmail);

router.post("/update", userCtrl.updateUser);
router.post("/readeone", userCtrl.findOne);

// verify Token
router.get("/verify", userCtrl.verifiedToken);

module.exports = router;
