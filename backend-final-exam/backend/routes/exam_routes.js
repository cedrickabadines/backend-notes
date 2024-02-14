const express = require("express");
const router = express.Router();

const {
  addExam,
  getExam,
  deleteExamById,
  updateExam,
  getExamById,
} = require("../controllers/exam_controller");

router.post("/create-exam", addExam);
router.get("/get-all-exam", getExam);
router.delete("/delete-exam/:exam_id", deleteExamById);
router.put("/update-exam/:exam_id", updateExam);
router.get("/get-exam/:exam_id", getExamById);

module.exports = router;
