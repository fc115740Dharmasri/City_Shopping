const { Sequelize } = require('sequelize');

// Read MySQL connection info from env vars. Example env vars:
// MYSQL_HOST=localhost
// MYSQL_USER=root
// MYSQL_PASSWORD=secret
// MYSQL_DB=shopping_spree
const sequelize = new Sequelize(process.env.MYSQL_DB || 'shopping_spree', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || '', {
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
