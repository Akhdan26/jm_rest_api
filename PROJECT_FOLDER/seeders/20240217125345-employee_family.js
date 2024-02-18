'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('employee_families', [
      {
        id: 1,
        employee_id: 1,
        name: 'Marni',
        identifier: '32100594109960002',
        job: 'Ibu Rumah Tangga',
        religion : 'Islam',
        is_life : true,
        is_divorced : false,
        place_of_birth: 'Denpasar',
        date_of_birth: '1995-10-17',
        relation_status: 'Istri',
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        employee_id: 1,
        name: 'Clara',
        identifier: '32100594109960004',
        job: 'Pelajar',
        religion : 'Islam',
        is_life : true,
        is_divorced : false,
        place_of_birth: 'Bangkalan',
        date_of_birth: '2008-10-17',
        relation_status: 'Anak',
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        employee_id: 1,
        name: 'Stephanie',
        identifier: '32150059410996000',
        job: 'Pelajar',
        religion : 'Islam',
        is_life : true,
        is_divorced : false,
        place_of_birth: 'Bangkalan',
        date_of_birth: '2008-10-17',
        relation_status: 'Anak',
        created_by: 'admin',
        updated_by: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employee_families', null, {});
  }
};
