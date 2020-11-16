const DataTypes = require("sequelize").DataTypes;
const _Customer = require("./Customer");


function initModels(sequelize) {
  const Customer = _Customer(sequelize, DataTypes);

  return {
    Customer,
  };
}
module.exports = { initModels };
