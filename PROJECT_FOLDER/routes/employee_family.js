const express = require("express");
const router = express.Router();
const employeeFamilyController = require("../controllers/employee_family");

router.post("/", employeeFamilyController.create);
router.get("/", employeeFamilyController.getAll);
router.get("/:id", employeeFamilyController.getById);
router.put("/:id", employeeFamilyController.update);
router.delete("/:id", employeeFamilyController.delete);

module.exports = router;
