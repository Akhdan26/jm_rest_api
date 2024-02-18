'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('educations', [
      {
        id: 1,
        employee_id: 1,
        name: 'SMKN 7 Jakarta',
        level: 'Sma',
        description: 'Sekolah Menengah Atas',
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        employee_id: 2,
        name: 'Universitas Negeri Jakarta',
        level: 'Strata 1',
        description: 'Sarjana',
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Educations', null, {});
  }
};
