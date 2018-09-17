import Sequelize from 'sequelize';
import {sequelize} from '../databases/database';
import Tasklist from './Tasklist';

const Todolist = sequelize.define("todolist", {
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
    type: Sequelize.STRING
  },
  duedate: {
    type: Sequelize.DATE
  }
}, {
    timestamps: false
}
);

Todolist.hasMany(Tasklist, { foreignKey: "todoid", sourceKey: "id" });
Tasklist.belongsTo(Todolist, { foreignKey: "todoid", targetKey: "id" });

export default Todolist;
