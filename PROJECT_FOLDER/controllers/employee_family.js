const { Employee_family, sequelize } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const employeeFamily = await Employee_family.create(req.body);
      return res.status(201).json(employeeFamily);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const employeeFamily = await Employee_family.findAll();
      return res.status(201).json(employeeFamily);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const employeeFamily = await Employee_family.findByPk(id);
      if (!employeeFamily) {
        return res.status(404).json({ message: "Employee family not found" });
      }
      return res.json(employeeFamily);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      let employeeFamily = await Employee_family.findByPk(id);
      if (!employeeFamily) {
        return res.status(404).json({ message: "Employee family not found" });
      }
      employeeFamily = await employeeFamily.update(req.body);
      return res.json(employeeFamily);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const employeeFamily = await Employee_family.findByPk(id);
      if (!employeeFamily) {
        return res.status(404).json({ message: "Employee family not found" });
      }
      await employeeFamily.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
