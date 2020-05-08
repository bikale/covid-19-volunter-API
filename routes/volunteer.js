const express = require("express");
const router = express.Router();

const {
  getVolunteers,
  changeVolunteerStatus,
} = require("../controller/volunteer");

router.get("/volunteers", getVolunteers);
router.get("/changestatus", changeVolunteerStatus);

module.exports = router;
