'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../SignUp_page/server/database/database');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     */
    await queryInterface.addColumn('expense_tables',"notes",{
      type:Sequelize.STRING,
      allowNull:true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('expense_tables','notes')
  }
};
