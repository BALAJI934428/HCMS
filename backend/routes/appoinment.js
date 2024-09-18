const express = require("express");
const {
  newAppointment,
  getAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const router = express.Router();

router.route("/appointments").get(getAppointments);
router
  .route("/appointment/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newAppointment);
router
  .route("/appointment/:id")
  .get(getSingleAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
