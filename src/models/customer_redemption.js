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
          },
        allowNull: false
    },

    customerId : {
        type: Sequelize.INTEGER,
        references: {        
            model: 'customer',
            key: 'id'
          },
        allowNull: false
    }}, 
    
    {
        tableName: 'customer_redemption',
        timestamps: false,
    });

    module.exports = CustomerRedemption;
