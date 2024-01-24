const express = require("express");
const router = express.Router();

const {
  addPerson,
  getPerson,
  deletePersonById,
  updatePerson,
  getPersonById,
} = require("../controllers/person_controllers");

router.post("/create-person", addPerson);
router.get("/get-all-person", getPerson);
router.delete("/delete-person/:person_id", deletePersonById);
router.put("/update-person/:person_id", updatePerson);
router.get("/get-person/:person_id", getPersonById);

module.exports = router;
