const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectID;

// @desc    SignUp User
// @route   Post /api/v1/login
// @access  Public
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password, location } = req.body;

  User.findOne({ email: email }) // search database for any already existing email addresses
    .then(async (user) => {
      if (user) {
        res.json({ success: false, data: "Email is already in use!" });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          location,
        });

        //hash the user's password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        // respond letting the front end know of the successful new account creation!
        res.json({ success: true, data: "Account created succesfully!" });
      }
    });
};

// @desc    Login User
// @route   Post /api/v1/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    res.status(400).json({
      success: false,
      errMessage: "Please provide an email and password",
    });
    return;
  }

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    res
      .status(400)
      .json({ success: false, errMessage: "Invalid Username and Password" });
    return;
  }

  //Match user entered password to hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res
      .status(400)
      .json({ success: false, errMessage: "Invalid Username and Password" });
    return;
  }

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  //send response with the created token
  res.status(200).json({ success: true, token: token, role: user.roles });
};

// @desc    Logout User
// @route   Post /api/v1/logout
// @access  Public
exports.logout = async (req, res, next) => {
  const { email, password } = req.body;
};
