const Sequelize = require ('sequelize');
const db = require('../config/database');

const CustomerRedemption = db.define('customer_redemption', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    redemptionId : {
        type: Sequelize.INTEGER,
        references: {         
            model: 'redemption',
            key: 'id'
          }
    },

    customerId : {
        type: Sequelize.INTEGER,
        references: {        
            model: 'customer',
            key: 'id'
          }
    }}, {
        tableName: 'customer_redemption',
        timestamps: false,
    });

    module.exports = CustomerRedemption;
