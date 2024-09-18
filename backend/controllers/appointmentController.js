const captchAsyncError = require("../middlewares/captchAsyncError");
const Appointment = require("../models/appointmentModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

// To create new appointment
//POST=>http://localhost:3000/api/appointment/new
exports.newAppointment = captchAsyncError(async (req, res) => {
  req.body.user = req.user.id;
  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    success: true,
    appointment,
  });
});

// To get all appointments
//GET=>http://localhost:3000/api/appointments
exports.getAppointments = async (req, res, next) => {
  const apiFeatures = new APIFeatures(Appointment.find(), req.query)
    .search()
    .filter()
    .doctorSearch();
  const appointments = await apiFeatures.query;

  res.status(200).json({
    success: true,
    appointments,
  });
};

// To get single appointment
//GET=>http://localhost:3000/api/appointment/66b4e8719eb15bc6f6df8e7f
exports.getSingleAppointment = async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 400));
  }
  res.status(200).json({
    success: true,
    appointment,
  });
};
// To update appointment
//PUT=>http://localhost:3000/api/appointment/66b4e8719eb15bc6f6df8e7f
exports.updateAppointment = async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 400));
  }
  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    appointment,
  });
};
// To update appointment
//DELETE=>http://localhost:3000/api/appointment/66b4e8719eb15bc6f6df8e7f

exports.deleteAppointment = async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 400));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
};
