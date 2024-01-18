const express = require("express");
const router = express.Router();
const {
  addInventory,
  getInventory,
  deleteInventoryById,
  updateInventory,
  getInventoryById,
} = require("../controllers/inventory_controllers");

router.post("/create-inventory", addInventory);
router.get("/get-all-inventory", getInventory);
router.delete("/delete-inventory/:inventory_id", deleteInventoryById);
router.put("/update-inventory/:inventory_id", updateInventory);
router.get("/get-inventory/:inventory_id", getInventoryById);

module.exports = router;
