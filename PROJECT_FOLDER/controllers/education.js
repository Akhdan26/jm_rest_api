const { Education, sequelize } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const education = await Education.create(req.body);
      return res.status(201).json(education);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const education = await Education.findAll();
      return res.status(201).json(education);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const education = await Education.findByPk(id, {});
      if (!education) {
        return res.status(404).json({ message: "Education not found" });
      }
      return res.json(education);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      let education = await Education.findByPk(id);
      if (!education) {
        return res.status(404).json({ message: "Education not found" });
      }
      education = await education.update(req.body);
      return res.json(education);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const education = await Education.findByPk(id);
      if (!education) {
        return res.status(404).json({ message: "Education not found" });
      }
      await education.destroy();
      return res.json({ message: "Delete data is success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
