const express = require("express");
const router = express.Router();

const { login, logout, getToken } = require("../controllers/auth_controllers");

router.post("/login", login);
router.post("/logout", logout);
router.post("/get-token", getToken);

module.exports = router;
