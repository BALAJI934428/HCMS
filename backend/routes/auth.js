const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router
  .route("/password/reset/:token")
  .post(isAuthenticatedUser("User"), resetPassword);
router.route("/getProfile").get(isAuthenticatedUser("User"), getUserProfile);
router
  .route("/changePassword")
  .put(isAuthenticatedUser("User"), changePassword);
router
  .route("/updateProfile")
  .put(isAuthenticatedUser("User"), upload.single("avatar"), updateProfile);
module.exports = router;
