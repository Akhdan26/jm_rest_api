const express = require("express");
const router = express.Router();
const employeeProfileController = require("../controllers/employee_profile");

router.post("/", employeeProfileController.create);
router.get("/", employeeProfileController.getAll);
router.get("/:id", employeeProfileController.getById);
router.put("/:id", employeeProfileController.update);
router.delete("/:id", employeeProfileController.delete);

module.exports = router;
