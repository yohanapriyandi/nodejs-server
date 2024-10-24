const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'C1ntaSunn4h234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;