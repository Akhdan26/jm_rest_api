"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      this.hasOne(models.Employee_profile, {
        foreignKey: "employee_id",
        as: "employee_profile",
      });
      this.hasMany(models.Employee_family, {
        foreignKey: "employee_id",
        as: "employee_family",
      });
      this.hasMany(models.Education, {
        foreignKey: "employee_id",
        as: "education",
      });
    }
  }
  Employee.init(
    {
      nik: DataTypes.STRING,
      name: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employee",
      underscored: true,
    }
  );
  return Employee;
};
