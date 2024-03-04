const express = require("express");
const router = express.Router();
const {
  addDance,
  getDance,
  deleteDance,
  updateDance,
  getDanceById,
} = require("../controllers/dance_controller");
router.post("/create-dance", addDance);
router.get("/get-all", getDance);
router.delete("/delete-dance/:dance_id", deleteDance);
router.put("/update-dance/:dance_id", updateDance);
router.get("/get/:dance_id", getDanceById);
module.exports = router;
