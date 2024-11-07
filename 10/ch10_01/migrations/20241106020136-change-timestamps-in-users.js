'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('users', 'createdAt', {
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:sequelize.NOW
    });
    await queryInterface.changeColumn('users', 'updatedAt', {
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:sequelize.NOW
    });
    await queryInterface.changeColumn('posts', 'createdAt', {
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:sequelize.NOW
    });
    await queryInterface.changeColumn('posts', 'updatedAt', {
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:sequelize.NOW
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
