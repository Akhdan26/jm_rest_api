"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee_profile extends Model {
    static associate(models) {
      // define association here
    }
  }
  Employee_profile.init(
    {
      employee_id: DataTypes.INTEGER,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      gender: {
        type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
        allowNull: true,
      },
      is_married: DataTypes.BOOLEAN,
      prof_pic: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "Employee_profile",
      tableName: "employee_profiles",
      underscored: true,
    }
  );
  return Employee_profile;
};
