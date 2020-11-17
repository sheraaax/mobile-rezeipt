/* jshint indent: 2 */

const Sequelize = require('sequelize');
const db = require('../config/database');


  const Sales = db.define('sales', {
    id: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    cart: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER(11),
    }
  }, {
    // sequelize,
    tableName: 'sales',
    timestamps: false,
    
    });

    module.exports = Sales;


    

