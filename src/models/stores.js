/* jshint indent: 2 */

const db = require('../config/database');
const Sequelize = require('sequelize');
const Stores = db.define('stores',{


    id: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    phone_num: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'stores',
    timestamps: false
    });

    module.exports = Stores;
