// Goi sequelize
const Sequelize = require("sequelize");
// Goi sequelize va Op trong database
const sequelize = require("../databases/database").sequelize;
const Op = require("../databases/database").Op;

// Define class tuong ung voi 1 model
const Task = sequelize.define("task",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    listid: {
      type: Sequelize.INTEGER
    },
    isfinished: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false // k tao 2 timestamp attribute la updatedAt va createdAt
  }
);
module.exports = Task;
