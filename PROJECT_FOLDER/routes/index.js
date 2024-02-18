const express = require("express");
const router = express.Router();

const employeeRoutes = require("../routes/employee");
const employeeProfileRoutes = require("../routes/employee_profile");
const employeeFamilyRoutes = require("../routes/employee_family");
const educationRoutes = require("../routes/education");

router.use("/employees", employeeRoutes);
router.use("/employee_profiles", employeeProfileRoutes);
router.use("/employee_families", employeeFamilyRoutes);
router.use("/educations", educationRoutes);

// Default route
router.get("/", (req, res) => {
  res.send("Welcome to the Jasa Marga API!");
});

module.exports = router;
