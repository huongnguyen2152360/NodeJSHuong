const Sequelize = require("sequelize");
import { DBNAME, USERNAME, PASSWORD, DBPORT, HOST } from "../configs/config";
export const sequelize = new Sequelize(DBNAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  //  This setting activates SSL for Postgres connections. It is very useful when you connect to an instance on Heroku or Amazon WS
  dialectOptions: {
    ssl: true //SSL is a cryptographic protocol that provides end-to-end encryption and integrity for all web requests
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected successfully. PORT: ${DBPORT}`);
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
export const Op = Sequelize.Op;
