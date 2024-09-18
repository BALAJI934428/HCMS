const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxLength: [30, "Name cannot exceed 100 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
  },
  date: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  existingTreatementId: { type: mongoose.Schema.ObjectId },
  treatmentName: {
    type: String,
  },
  description: {
    type: String,
  },
  medicine: [{ type: String }],
  medicineTakingDays: {
    type: String,
  },

  status: {
    type: String,
    default: "Active",
  },
  images: [
    {
      image: {
        type: String,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
});
let schema = mongoose.model("Appointment", appointmentSchema);
module.exports = schema;
