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
    },

    //add status to customer redemption: A - available, R - redeemeed, E - expired and not used
    status : {
        type: Sequelize.CHAR,
        defaultValue: "A",
    },

    //createdAt == date customer redeemed from application
    createdAt : {
        type: Sequelize.NOW
      },

      //updatedAt == date customer redeemed from the store
    updatedAt : {
        type: 'TIMESTAMP',
        defaultValue: null
      }
    
}, 
    
    {
        tableName: 'customer_redemption',
    });

    module.exports = CustomerRedemption;