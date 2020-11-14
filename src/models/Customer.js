const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const Customer = db.define('customer', {
    id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email : {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password : {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt : {
      type: Sequelize.NOW
    },
    updatedAt : {
      type: Sequelize.NOW
    }
  }, {
    hooks: {
      afterValidate: (customer) => {
        customer.password = bcrypt.hashSync(customer.password, 10);
      }
    }
  });

module.exports = Customer;
