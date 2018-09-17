const Sequelize = require('sequelize');
const sequelize = new Sequelize (
    'postgres', // database's name
    'postgres', // username
    '1234567890', // password
    {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5, //so lan truy cap max cua database dong thoi la bao nhieu
            min: 0,
            acquire: 30000, //time co gang truy cap la 30s
            idle: 10000
        }
    }
);
const Op = sequelize.Op;
module.exports = {
    sequelize,
    Op
}