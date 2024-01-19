const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  deleteEmployeeById,
  updateEmployee,
  getEmployeeById,
} = require("../controllers/employment_controller");

router.post("/create-employee", addEmployee);
router.get("/get-all-employee", getEmployee);
router.delete("/delete-employee/:employee_id", deleteEmployeeById);
router.put("/update-employee/:employee_id", updateEmployee);
router.get("/get-employee/:employee_id", getEmployeeById);

module.exports = router;
