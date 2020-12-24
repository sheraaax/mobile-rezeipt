const Sequelize = require('sequelize');
const db = require('../config/database');

const Redemption = db.define('redemption', {
    id : {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    storeId : {
        type: Sequelize.INTEGER,
        references: {         
            model: 'store',
            key: 'id'
          },
        allowNull: false
    },
    points : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discountAmount : {
        type : Sequelize.INTEGER,
        allowNull: false,
    },
    expirationDate : {
        type: Sequelize.DATE,
        allowNull: false
    },
    discountUnit : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    couponCode : {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    tableName: 'redemption',
    timestamps: false
});

module.exports = Redemption;