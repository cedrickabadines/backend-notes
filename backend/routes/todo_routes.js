const express = require("express");
const router = express.Router();
const {
  addTask,
  getTask,
  deleteTask,
  updateTask,
  getTaskById,
} = require("../controllers/todo_controller");

router.post("/create", addTask);
router.get("/get", getTask);
router.delete("/delete/:todo_id", deleteTask);
router.put("/update/:todo_id", updateTask);
router.get("/getById/:todo_id", getTaskById);

module.exports = router;
