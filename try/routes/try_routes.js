const express = require("express");
const router = express.Router();
const {
  addTry,
  getTry,
  deleteTryById,
  updateTry,
  getTryById,
} = require("../controllers/try_controller");
router.post("/create-try", addTry);
// router.get("/get-all-try", getTry);
// router.delete("/delete-try/:try_id", deleteTryById);
// router.put("/update-try/:try_id", updateTry);
// router.get("/get-try/:try_id", getTryById);
module.exports = router;
