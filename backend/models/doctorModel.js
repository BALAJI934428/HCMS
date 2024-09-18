const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxLength: [30, "Name cannot exceed 100 character"],
  },

  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    maxlength: [15, "Password cannot exceed 15 characters"],
    select: false,
  },
  phone: {
    type: Number,
    required: [true, "Please enter Phone Number"],
    maxlength: [12, "Phone Number cannot exceed 12 characters"],
  },
  appointments: [{ type: mongoose.Schema.ObjectId }],
  timeSlots: [{ type: String }],
  leaveDate: [{ type: String }],
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "Doctor",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
doctorSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
doctorSchema.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
doctorSchema.methods.getResetToken = function () {
  //Generate Token
  const token = crypto.randomBytes(20).toString("hex");
  //Generate hash set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //Set token expire tume
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

let schema = mongoose.model("Doctor", doctorSchema);
module.exports = schema;
