const express = require("express");
const router = express.Router();

const {
  addPeople,
  getPeople,
  deletePeopleById,
  updatePeople,
  getPeopleById,
} = require("../controllers/people_controllers");

router.post("/create-people", addPeople);
router.get("/get-all-people", getPeople);
router.delete("/delete-people/:people_id", deletePeopleById);
router.put("/update-people/:people_id", updatePeople);
router.get("/get-people/:people_id", getPeopleById);

module.exports = router;
