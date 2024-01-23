const express = require("express");
const router = express.Router();

const {
  addUser,
  getUser,
  deleteUserById,
  updateUser,
  getUserById,
} = require("../controllers/user_controllers");

router.post("/create-user", addUser);
router.get("/get-all-user", getUser);
router.delete("/delete-user/:user_id", deleteUserById);
router.put("/update-user/:user_id", updateUser);
router.get("/get-user/:user_id", getUserById);

module.exports = router;
