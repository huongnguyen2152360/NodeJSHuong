import Sequelize from 'sequelize';
import {sequelize} from '../databases/database';
// const {sequelize} = require('../databases/database');

const Tasklist = sequelize.define('tasklist', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    todoid: {
      type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    isfinished: {
        type: Sequelize.BOOLEAN
    }
  },
  {
      timestamps: false
  }
);

export default Tasklist;

