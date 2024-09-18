const express = require("express");
const app = express();
const path = require("path");
const appointment = require("./routes/appoinment");
const auth = require("./routes/auth");
const errorMidleware = require("./middlewares/error");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/", appointment);
app.use("/api/", auth);
app.use("/api/", adminRoutes);
app.use(errorMidleware);
module.exports = app;
//suriy
