const express = require("express");
const router = express.Router();
const { authorize, protect } = require("../middleware/auth");

const {
  getVolunteers,
  changeVolunteerStatus,
} = require("../controller/volunteer");

router.get("/volunteers", getVolunteers);
router.post("/changestatus", protect, authorize(), changeVolunteerStatus);

module.exports = router;
