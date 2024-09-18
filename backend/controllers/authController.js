const catchAsyncError = require("../middlewares/captchAsyncError");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");
const sendToken = require("../utils/jwt");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const APIFeatures = require("../utils/apiFeatures");
// Register user
//POST=>http://localhost:3000/api/user/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    console.log(avatar);
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  sendToken(user, 201, res);
});

//Login user
//POST=>http://localhost:3000/api/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  let user;
  //finding the user from database
  if (role == "Doctor") {
    user = await Doctor.findOne({ email }).select("+password");
  }
  if (role == "Hospital") {
    user = await Hospital.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ email }).select("+password");
  }
  if (!user) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});
//LOGOUT user
//POST=>http://localhost:3000/api/logout
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .status(200)
    .json({ success: true, message: "LoggedOut" });
};
//Forgot password
//POST=>http://localhost:3000/api/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email, role } = req.body;
  let user;
  if (role == "Doctor") {
    //finding the user from database
    user = await Doctor.findOne({ email }).select("+password");
  }
  if (role == "Hospital") {
    user = await Hospital.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ email }).select("+password");
  }

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  const resetToken = user.getResetToken();

  await user.save({ validateBeforeSave: false });

  let BASE_URL = "http://localhost:3000";
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  //Create reset url
  const resetUrl = `${BASE_URL}/api/password/reset/${resetToken}`;
  const message = `Your password reset url is as follows \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it`;
  try {
    sendEmail({
      email: user.email,
      subject: "HCMS password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message), 500);
  }
});
//Reset password
////POST=>http://localhost:3000/api/password/reset
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resetPasswordToken);
  let user;
  if (role == "Doctor") {
    //finding the user from database
    user = await Doctor.findOne({ email }).select("+password");
  }
  if (role == "Hospital") {
    user = await Hospital.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ email }).select("+password");
  }

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or expired ", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match ", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 201, res);
});
//Get Profile
////GET=>http://localhost:3000/api/getProfile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler(`Login to access all Features `));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//Change password
////PUT=>http://localhost:3000/api/changePassword
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  let user;
  if (role == "Doctor") {
    user = await Doctor.findById(req.user.id).select("+password");
  } else {
    user = await User.findById(req.user.id).select("+password");
  }

  //check old password
  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  //assigning new password
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed Successfull",
  });
});
//Update Profile
////PUT=>http://localhost:3000/api/updateProfile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log(req.body);
  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    newUserData = { ...newUserData, avatar };
  }
  const role = req.user.role;
  let user;
  if (role == "Doctor") {
    user = await Doctor.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  }
});

//ADMIN
//show all user and search with name and email
////GET=>http://localhost:3000/api/admin/allUsers
exports.getAllUsers = async (req, res, next) => {
  const apiFeatures = new APIFeatures(User.find(), req.query).search();

  const appointments = await apiFeatures.query;
  res.status(200).json({
    success: true,
    appointments,
  });
};
// Register Hospital
//POST=>http://localhost:3000/api/hospital/register
exports.registerHospital = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    console.log(avatar);
  }
  console.log(req.body);
  const user = await Hospital.create({
    name,
    email,
    password,
    avatar,
    phone,
  });
  sendToken(user, 201, res);
});

//show all HOSPITAL and search with name and email
////GET=>http://localhost:3000/api/admin/allHospital
exports.getAllHospitals = async (req, res, next) => {
  const apiFeatures = new APIFeatures(Hospital.find(), req.query).search();

  const hospitals = await apiFeatures.query;
  res.status(200).json({
    success: true,
    hospitals,
  });
};

//HADMIN
// Register doctor
//POST=>http://localhost:3000/api/doctor/register
exports.registerDoctor = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone, timeSlots } = req.body;
  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    console.log(avatar);
  }
  console.log(req.body);
  const user = await Doctor.create({
    name,
    email,
    password,
    avatar,
    phone,
    timeSlots,
  });
  sendToken(user, 201, res);
});
