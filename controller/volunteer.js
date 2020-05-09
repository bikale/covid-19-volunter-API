const User = require("../models/User");
const ObjectId = require("mongodb").ObjectID;

// @desc    Get All voulunteers available
// @route   Post /api/v1/volunteers
// @access  Private
exports.getVolunteers = async (req, res, next) => {
  User.find({
    location: {
      $near: {
        // find the near location that is matched with the user location with in maxdistance
        $geometry: { type: "Point", coordinates: [-91.9627755, 41.0085809] }, // this is the user current location
        $maxDistance: 10000, // in meter
      },
    },
    status: "online",
  }).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
};

// @desc    Update user Volunteering status
// @route   Post /api/v1/changestatus
// @access  Private
exports.changeVolunteerStatus = async (req, res, next) => {
  const { status } = req.body; // req.user
  try {
    await User.updateOne({ _id: req.user._id }, { $set: { status: status } });
    res.json({ success: true, status: status });
  } catch (e) {
    res.json({ success: false, errMessage: e.acknowledged }); // if no match found return e =>  "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
  }
};
