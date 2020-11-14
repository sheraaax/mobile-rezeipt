var DataTypes = require("sequelize").DataTypes;
var _migrations = require("./migrations");
var _categories = require("./categories");
var _products = require("./products");
var _failed_jobs = require("./failed_jobs");
var _profiles = require("./profiles");
var _users = require("./users");
var _sales = require("./sales");
var _stores = require("./stores");
var _password_resets = require("./password_resets");

function initModels(sequelize) {
  var migrations = _migrations(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var failed_jobs = _failed_jobs(sequelize, DataTypes);
  var profiles = _profiles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var sales = _sales(sequelize, DataTypes);
  var stores = _stores(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);

  return {
    migrations,
    categories,
    products,
    failed_jobs,
    profiles,
    users,
    sales,
    stores,
    password_resets,
  };
}
module.exports = { initModels };
