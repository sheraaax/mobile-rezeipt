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
    description : {
        type: Sequelize.STRING
    },
    points : {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    tableName: 'redemption',
    timestamps: false
});

module.exports = Redemption;