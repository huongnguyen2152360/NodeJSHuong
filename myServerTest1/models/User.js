import Sequelize from 'sequelize';
import {sequelize} from '../databases/database';
import Todolist from '../models/Todolist';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
     },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    profileurl: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.DATE
    }
  }, {
    timestamps: false
});

//Relations
User.hasMany(Todolist, {foreignKey: 'userid', sourceKey: 'id'});
Todolist.belongsTo(User, {foreignKey: 'userid', targetKey: 'id'});

export default User;