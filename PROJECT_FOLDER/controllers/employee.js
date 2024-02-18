const {
  Employee,
  Employee_profile,
  Employee_family,
  Education,
  sequelize,
} = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const employee = await Employee.create(req.body);
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createAll(req, res) {
    const { employeeData, profileData, familyData, educationData } = req.body;
    try {
      const transaction = await sequelize.transaction();
      try {
        const employee = await Employee.create(employeeData, { transaction });
        const profile = await Employee_profile.create(
          { ...profileData, employee_id: employee.id },
          { transaction }
        );

        const familyMembers = await Promise.all(
          familyData.map((family) =>
            Employee_family.create(
              { ...family, employee_id: employee.id },
              { transaction }
            )
          )
        );

        const educations = await Promise.all(
          educationData.map((education) =>
            Education.create(
              { ...education, employee_id: employee.id },
              { transaction }
            )
          )
        );

        await transaction.commit();

        return res.status(201).json({
          employee,
          profile,
          familyMembers,
          educations,
        });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [
          { model: Employee_profile, as: "employee_profile" },
          { model: Employee_family, as: "employee_family" },
          { model: Education, as: "education" },
        ],
      });
      return res.status(201).json(employees);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const employee = await Employee.findByPk(id, {
        include: [
          { model: Employee_profile, as: "employee_profile" },
          { model: Employee_family, as: "employee_family" },
          { model: Education, as: "education" },
        ],
      });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.json(employee);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      let employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      employee = await employee.update(req.body);
      return res.json(employee);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateAll(req, res) {
    const { id } = req.params;
    const { employeeData, profileData, familyData, educationData } = req.body;
    try {
      let employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      const transaction = await sequelize.transaction();
      try {
        // Update employee
        await employee.update(employeeData, { transaction });

        // Update profile
        await Employee_profile.update(
          profileData,
          { where: { employee_id: id } },
          { transaction }
        );

        // Fetch updated profile
        const profile = await Employee_profile.findOne({
          where: { employee_id: id },
        });

        // Update family members
        await Promise.all(
          familyData.map((family) =>
            Employee_family.update(
              family,
              { where: { employee_id: id, identifier: family.identifier } },
              { transaction }
            )
          )
        );

        // Update educations
        await Promise.all(
          educationData.map((education) =>
            Education.update(
              education,
              { where: { employee_id: id, name: education.name } },
              { transaction }
            )
          )
        );

        await transaction.commit();

        return res.status(201).json({
          employee,
          profile,
          familyData,
          educationData,
        });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      await employee.destroy();
      return res.json({ message: "Delete data is success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getAllReport(req, res) {
    try {
      const report = await Employee.findAll({
        attributes: [
          "id",
          "nik",
          "name",
          "is_active",
          [sequelize.col("employee_profile.gender"), "gender"],
          [
            sequelize.literal(
              "CONCAT(DATE_PART('year', AGE(employee_profile.date_of_birth)), ' years old')"
            ),
            "age",
          ],
          [sequelize.col("education.name"), "school_name"],
          [sequelize.col("education.level"), "level"],
        ],
        include: [
          {
            model: Employee_profile,
            as: "employee_profile",
            attributes: [],
          },
          {
            model: Education,
            as: "education",
            attributes: [],
          },
        ],
        raw: true,
        nest: true,
      });

      // Fetch additional data using raw SQL query
      const additionalDataQuery = `
                SELECT
                    employee_id,
                    STRING_AGG(
                        CONCAT(total_family_members, ' ', relation_status),
                        ' & '
                    ) AS ef_counts
                FROM (
                    SELECT
                        employee_id,
                        relation_status,
                        COUNT(*) AS total_family_members
                    FROM
                        employee_families
                    GROUP BY
                        employee_id, relation_status
                ) AS subquery
                GROUP BY
                    employee_id
            `;
      const additionalData = await sequelize.query(additionalDataQuery, {
        type: sequelize.QueryTypes.SELECT,
      });

      // Combine additional data with the main report
      const reportWithAdditionalData = report.map((emp) => {
        const additionalInfo = additionalData.find(
          (data) => data.employee_id === emp.id
        );
        return {
          ...emp,
          ef: additionalInfo ? additionalInfo.ef_counts : "", // Attach family data
        };
      });

      return res.status(200).json(reportWithAdditionalData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
