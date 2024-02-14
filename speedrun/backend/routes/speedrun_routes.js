const express = require("express");
const router = express.Router();
const {
  addSpeedrun,
  getSpeedrun,
  deleteSpeedrunById,
  updateSpeedrun,
  getSpeedrunById,
} = require("../controllers/speedrun_controller");
router.post("/create-speedrun", addSpeedrun);
router.get("/get-all-speedrun", getSpeedrun);
router.delete("/delete-speedrun/:speedrun_id", deleteSpeedrunById);
router.put("/update-speedrun/:speedrun_id", updateSpeedrun);
router.get("/get-speedrun/:speedrun_id", getSpeedrunById);
module.exports = router;
