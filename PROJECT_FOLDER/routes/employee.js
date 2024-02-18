const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");

router.post("/", employeeController.create);
router.post("/create", employeeController.createAll);
router.get("/", employeeController.getAll);
router.get("/report", employeeController.getAllReport);
router.get("/:id", employeeController.getById);
router.put("/:id", employeeController.update);
router.put("/update/:id", employeeController.updateAll);
router.delete("/:id", employeeController.delete);

module.exports = router;
