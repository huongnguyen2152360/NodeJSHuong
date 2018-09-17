// Goi sequelize
const Sequelize = require("sequelize");
// Goi sequelize va Op cua database
const sequelize = require("../databases/database").sequelize;
const Op = require("../databases/database").Op;

//Goi model Task
const Task = require("./Task");

// Define class tuong ung vs 1 model
const Todo = sequelize.define(
  "todo",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    priority: {
      type: Sequelize.TINYINT
    },
    description: {
      type: Sequelize.TEXT
    },
    duedate: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false //k tao 2 timestamp attribute la createdAt va updatedAt
  }
);

// Join 2 model bang id
Todo.hasMany(Task, {
  foreignKey: "listid",
  sourceKey: "id"
});
Task.belongsTo(Todo, {
  foreignKey: "listid",
  targetKey: "id"
});

module.exports = Todo;
