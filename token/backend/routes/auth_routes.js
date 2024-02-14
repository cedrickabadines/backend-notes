const express = require("express");
const router = express.Router();

const {
  userLogin,
  logout,
  getToken,
} = require("../controllers/auth_controllers");

router.post("/login", userLogin);
router.post("/logout", logout);
router.post("/check-token", getToken);

module.exports = router;
