const User = require("../models/User");
const ObjectId = require("mongodb").ObjectID;

// @desc    Get All voulunteers available
// @route   Post /api/v1/volunteers
// @access  Private
exports.getVolunteers = async (req, res, next) => {
  User.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [-91.9627755, 41.0085809] },
        $maxDistance: 5000,
      },
    },
  }).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
};

// @desc    Update user Volunteering status
// @route   Post /api/v1/changestatus
// @access  Private
exports.changeVolunteerStatus = async (req, res, next) => {};
