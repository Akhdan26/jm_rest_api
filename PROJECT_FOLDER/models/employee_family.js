"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee_family extends Model {
    static associate(models) {
      // define association here
    }
  }
  employee_family.init(
    {
      employee_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
      job: DataTypes.STRING,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      religion: {
        type: DataTypes.ENUM(
          "Islam",
          "Katolik",
          "Buda",
          "Protestan",
          "Konghucu"
        ),
        allowNull: true,
      },
      is_life: DataTypes.BOOLEAN,
      is_divorced: DataTypes.BOOLEAN,
      relation_status: {
        type: DataTypes.ENUM("Suami", "Istri", "Anak", "Anak Sambung"),
        allowNull: true,
      },
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employee_family",
      tableName: "employee_families",
      underscored: true,
    }
  );
  return employee_family;
};
