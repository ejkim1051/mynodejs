'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      email:'a@gamil.com',
      password:'test1234',
      name:'a_admin',
      address:'seoul',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email:'b@gamil.com',
      password:'test1234',
      name:'b_admin',
      address:'busan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email:'c@gamil.com',
      password:'test1234',
      name:'c_admin',
      address:'oneju',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email:'d@gamil.com',
      password:'test1234',
      name:'d_admin',
      address:'ilsan',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
