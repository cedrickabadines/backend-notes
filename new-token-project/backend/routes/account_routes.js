const express = require("express");
const router = express.Router();

const {
  addAccount,
  getAccount,
  deleteAccountById,
  updateAccount,
  getAccountById,
} = require("../controllers/account_controller");

router.post("/create-account", addAccount);
router.get("/get-all-account", getAccount);
router.delete("/delete-account/:account_id", deleteAccountById);
router.put("/update-account/:account_id", updateAccount);
router.get("/get-account/:account_id", getAccountById);
module.exports = router;
