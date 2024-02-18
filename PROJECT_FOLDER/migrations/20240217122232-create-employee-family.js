"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("employee_families", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      identifier: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      job: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      place_of_birth: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      religion: {
        type: Sequelize.ENUM(
          "Islam",
          "Katolik",
          "Buda",
          "Protestan",
          "Konghucu"
        ),
      },
      is_life: {
        type: Sequelize.BOOLEAN,
      },
      is_divorced: {
        type: Sequelize.BOOLEAN,
      },
      relation_status: {
        type: Sequelize.ENUM("Suami", "Istri", "Anak", "Anak Sambung"),
      },
      created_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("employee_families");
  },
};
