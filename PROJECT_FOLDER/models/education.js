"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Employee, { foreignKey: "id" });
    }
  }

  Education.init(
    {
      employee_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      level: {
        type: DataTypes.ENUM(
          "Tk",
          "Sd",
          "Smp",
          "Sma",
          "Strata 1",
          "Strata 2",
          "Doktor",
          "Professor"
        ),
        allowNull: true,
      },
      description: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Education",
      tableName: "educations",
      underscored: true,
    }
  );

  return Education;
};
