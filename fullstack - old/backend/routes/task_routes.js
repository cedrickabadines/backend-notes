const express = require("express");
const router = express.Router();

const {
  addTask,
  getTask,
  deleteTaskById,
  updateTask,
  getTaskById,
} = require("../controllers/task_controllers");

router.post("/create-task", addTask);
router.get("/get-all-task", getTask);
router.delete("/delete-task/:task_id", deleteTaskById);
router.put("/update-task/:task_id", updateTask);
router.get("/get-task/:task_id", getTaskById);

module.exports = router;
