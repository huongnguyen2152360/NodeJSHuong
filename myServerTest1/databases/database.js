// Import sequelize
import Sequelize from 'sequelize';

// Khoi tao sequelize
export const sequelize = new Sequelize(
    'postgres', // database name
    'postgres', // username
    '12345678', // pass
{
    dialect: 'postgres',
    host: 'localhost',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        iddle: 10000,
    }
});

// Op
export const Op = Sequelize.Op;

//Test connection
export const Test = sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
