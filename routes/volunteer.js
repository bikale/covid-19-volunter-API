const express = require("express");
const router = express.Router();
const { authorize, protect } = require("../middleware/auth");

const {
  getVolunteers,
  changeVolunteerStatus,
} = require("../controller/volunteer");

router.get("/volunteers", protect, authorize("user"), getVolunteers);
router.post(
  "/changestatus",
  protect,
  authorize("volunteer"),
  changeVolunteerStatus
);

module.exports = router;
