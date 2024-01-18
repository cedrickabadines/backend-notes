const express = require("express");
const router = express.Router();
const {
  addStudent,
  getStudent,
  deleteStudentById,
  updateStudent,
  getStudentById,
} = require("../controllers/student_controller");

router.post("/create-student", addStudent);
router.get("/get-all-student", getStudent);
router.delete("/delete-student/:student_id", deleteStudentById);
router.put("/update-student/:student_id", updateStudent);
router.get("/get-student/:student_id", getStudentById);
module.exports = router;
