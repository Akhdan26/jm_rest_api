const { Employee_profile, sequelize } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const employeeProfile = await Employee_profile.create(req.body);
      return res.status(201).json(employeeProfile);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const employeeProfiles = await Employee_profile.findAll();
      return res.status(201).json(employeeProfiles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const employeeProfile = await Employee_profile.findByPk(id);
      if (!employeeProfile) {
        return res.status(404).json({ message: "Employee profile not found" });
      }
      return res.json(employeeProfile);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      let employeeProfile = await Employee_profile.findByPk(id);
      if (!employeeProfile) {
        return res.status(404).json({ message: "Employee profile not found" });
      }
      employeeProfile = await employeeProfile.update(req.body);
      return res.json(employeeProfile);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const employeeProfile = await Employee_profile.findByPk(id);
      if (!employeeProfile) {
        return res.status(404).json({ message: "Employee profile not found" });
      }
      await employeeProfile.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
