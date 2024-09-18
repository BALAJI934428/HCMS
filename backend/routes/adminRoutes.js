const express = require("express");
const {
  getAllUsers,
  registerDoctor,
  getAllHospitals,
  registerHospital,
} = require("../controllers/authController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const router = express.Router();

//admin
router.route("/allUser").get(isAuthenticatedUser("Doctor"), getAllUsers);
router
  .route("/hospital/register")
  .post(isAuthenticatedUser("Doctor"), registerHospital);

router
  .route("/allHospital")
  .get(isAuthenticatedUser("Doctor"), getAllHospitals);

//Hospital admin
router
  .route("/doctor/register")
  .post(
    isAuthenticatedUser("Doctor"),
    authorizeRoles("Doctor"),
    registerDoctor
  );

module.exports = router;
