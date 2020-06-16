"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var config_1 = require("./config/config");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    'username': config_1.config.username,
    'password': config_1.config.password,
    'database': config_1.config.database,
    'host': config_1.config.host,
    'dialect': config_1.config.dialect,
    'storage': ':memory:'
});
