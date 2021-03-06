const jwt = require("jsonwebtoken");
const User = require("../models/User");

//protect routes

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Make sure token exist
  if (!token) {
    return res
      .status(400)
      .json({ success: false, data: "Not authorized to access this route" });
  }

  try {
    // verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //process.env.JWT_SECRET_KEY get the secret key

    req.user = await User.findById(decoded.id);
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, data: "Not authorized to access this route" });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res.status(400).json({
        success: false,
        data: "User role is not authorized to access this route",
      });
    }
    next();
  };
};
