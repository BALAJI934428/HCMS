const ErrorHandler = require("../utils/errorHandler");
const captchAsyncError = require("./captchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Hospital = require("../models/hospitalModel");
const Doctor = require("../models/doctorModel");
exports.isAuthenticatedUser = (role) => {
  return captchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Login first to handle this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (role == "Doctor") {
      req.user = await Doctor.findById(decoded.id);
    }
    if (role == "Hospital") {
      req.user = await Hospital.findById(decoded.id);
    } else {
      req.user = await User.findById(decoded.id);
    }

    next();
  });
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role ${req.user.role} is not allowed`, 401)
      );
    }
    next();
  };
};
